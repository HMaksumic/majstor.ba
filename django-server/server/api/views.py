from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken, AccessToken
from base.models import Item, User, UserAd, AddImage
from .serializers import ItemSerializer, UserSerializer, UserAdSerializer
from rest_framework import status
from django.contrib.auth.hashers import make_password, check_password
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.decorators import api_view, permission_classes
from django.contrib.auth import get_user_model

@api_view(['GET'])
@permission_classes([AllowAny])
def getData(request):
    items = Item.objects.all()
    serializer = ItemSerializer(items, many=True)

    return Response(serializer.data)

@api_view(['POST'])
@permission_classes([AllowAny])
def addItem(request):
    serializer = ItemSerializer(data=request.data)
    
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
@permission_classes([AllowAny])
def register(request):
    name = request.data.get('name')
    email = request.data.get('email')
    password = request.data.get('password')
    
    if not name or not email or not password:
        return Response({'error': 'Please provide name, email, and password.'}, status=status.HTTP_400_BAD_REQUEST)
    
    if User.objects.filter(email=email).exists():
        return Response({'error': 'A user with this email already exists.'}, status=status.HTTP_400_BAD_REQUEST)
    
    hashed_password = make_password(password)
    user = User(name=name, email=email, password=hashed_password)
    user.save()
    
    serializer = UserSerializer(user)
    
    return Response(serializer.data, status=status.HTTP_201_CREATED)


@api_view(['POST'])
@permission_classes([AllowAny])
def login(request):
    email = request.data.get('email')
    password = request.data.get('password')
    
    if not email or not password:
        return Response({'error': 'Please provide both email and password.'}, status=status.HTTP_400_BAD_REQUEST)
    
    user = User.objects.filter(email=email).first()
    
    if not user or not check_password(password, user.password):
        return Response({'error': 'Invalid credentials.'}, status=status.HTTP_400_BAD_REQUEST)
    
    serializer = UserSerializer(user)
    
    # Generate JWT token
    refresh = RefreshToken.for_user(user)
    access_token = str(refresh.access_token)
    
    return Response({
        'user': serializer.data,
        'access_token': access_token,
        'refresh_token': str(refresh)
    })

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def protected_view(request):
    return Response({'message': 'This is a protected view!'}, status=status.HTTP_200_OK)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def create_ad(request):
    user = request.user
    print(f"Authenticated user: {user} (ID: {user.id})")

    data = request.data

    print("Received data:", data)
    print("Files:", request.FILES)

    try:
        # Create the ad linked to the authenticated user
        ad = UserAd(
            publisher=user,
            title=data.get('title'),
            description=data.get('description'),
            category=data.get('category'),
            price=data.get('price'),
            city=data.get('city'),
            date_published=data.get('date_published')
        )
        ad.save()

        # Process the images
        images = request.FILES.getlist('images')
        for image in images:
            AddImage.objects.create(ad=ad, image=image)

        # Serialize the created ad and return a response
        serializer = UserAdSerializer(ad)
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    
    except Exception as e:
        print("Error creating ad:", str(e))
        return Response({'detail': str(e)}, status=status.HTTP_400_BAD_REQUEST)
    
    
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_published_ads(request):
    user = request.user
    ads = UserAd.objects.filter(publisher=user)
    serializer = UserAdSerializer(ads, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)