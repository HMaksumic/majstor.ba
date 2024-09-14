from rest_framework import serializers
from base.models import Item, User, UserAd, AddImage

class ItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = Item
        fields = '__all__'


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'

class AddImageSerializer(serializers.ModelSerializer):
    image_url = serializers.SerializerMethodField()

    class Meta:
        model = AddImage
        fields = ['id', 'image_url']

    def get_image_url(self, obj):
        request = self.context.get('request')
        if request is not None:
            return request.build_absolute_uri(obj.image.url)
        return obj.image.url

class UserAdSerializer(serializers.ModelSerializer):
    images = AddImageSerializer(many=True, read_only=True)

    class Meta:
        model = UserAd
        fields = ['id', 'publisher', 'title', 'description', 'category', 'price', 'city', 'date_published', 'images']
        read_only_fields = ['id', 'publisher']
