
from django.shortcuts import get_object_or_404
from rest_framework import viewsets
from rest_framework.decorators import api_view, permission_classes


from base.models import Store
from .serializers import PostSerializer, CommSerializer
from .models import Post, Comm
from rest_framework.permissions import IsAuthenticated , IsAdminUser
from rest_framework import status
from rest_framework.response import Response




class PostViewSet(viewsets.ModelViewSet):
    queryset = Post.objects.all()
    serializer_class = PostSerializer

    # Add create method to handle POST request for creating new posts
    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)
    

@api_view(['GET'])
def getPost(request, pk):
    try:
        post = Post.objects.get(id=pk)
    except Post.DoesNotExist:
        post = None

    serializer = PostSerializer(post, many=False)

    return Response(serializer.data)


@api_view(['POST'])
@permission_classes([IsAdminUser])
def createPost(request):
    user = request.user
    data = request.data
    store = get_object_or_404(Store, user=user)
    post = Post.objects.create(
        store = store,
        title= data['title'],
        content = data['content'],
    )
    serializer = PostSerializer(post, many=False)

    return Response(serializer.data)


class CommentViewSet(viewsets.ModelViewSet):
    queryset = Comm.objects.all()
    serializer_class = CommSerializer


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def createComment(request, pk):
    user = request.user
    post = get_object_or_404(Post, id=pk)
    data = request.data
    comment = Comm.objects.create(
        post=post,
        user=user,
        content=data['content'],
    )
    serializer = CommSerializer(comment, many=False)
    return Response(serializer.data, status=status.HTTP_201_CREATED)


@api_view(['GET'])
def post_comments(request, pk):
    try:
        post = Post.objects.get(id=pk)
    except Post.DoesNotExist:
        return Response({'message': 'Post does not exist'}, status=status.HTTP_404_NOT_FOUND)

    comments = Comm.objects.filter(post=post)
    serializer = CommSerializer(comments, many=True)
    return Response(serializer.data)