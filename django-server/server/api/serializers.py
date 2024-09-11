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


class UserAdSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserAd
        fields = ['id', 'publisher', 'title', 'description', 'category', 'price', 'city', 'date_published']
        read_only_fields = ['id', 'publisher']

class AddImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = AddImage
        fields = '__all__'
