from rest_framework import serializers
from base.serializers import StoreSerializer

from base.models import Store
from .models import Post, Comm

class CommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comm
        fields = '__all__'

class PostSerializer(serializers.ModelSerializer):
    comments = CommentSerializer(many=True, read_only=True)
    store = serializers.SlugRelatedField(
        slug_field='name',
        queryset=Store.objects.all()
    )
    store_id = serializers.PrimaryKeyRelatedField(source='store', read_only=True)

    class Meta:
        model = Post
        fields = '__all__'

    def get_store(self, obj):
        store = obj.store
        if store is not None:
            serializer = StoreSerializer(store)
            return serializer.data
        return None
    

class CommSerializer(serializers.ModelSerializer):
    user = serializers.StringRelatedField(read_only=True)

    class Meta:
        model = Comm
        fields = ('id', 'post', 'user', 'content', 'created_at')
        read_only_fields = ('id', 'post', 'created_at')