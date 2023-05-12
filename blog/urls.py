from django.urls import path
from .views import PostViewSet, CommentViewSet,createPost, createComment, post_comments

post_list = PostViewSet.as_view({'get': 'list', 'post': 'create'})
post_detail = PostViewSet.as_view({'get': 'retrieve', 'put': 'update', 'patch': 'partial_update', 'delete': 'destroy'})


urlpatterns = [
    path('posts/', post_list, name='post-list'),
    path('create/',createPost, name='create-post'),
    path('posts/<int:pk>/', post_detail, name='post-detail'),

    path('posts/<int:pk>/comments/create/', createComment, name='create-comment'),
    path('posts/<int:pk>/comments/', post_comments, name='post-comments')
    # path('comments/<int:pk>/', comment_detail, name='comment-detail'),
    # path('comments/<int:pk>/update/', update_comment, name='update-comment'),
    # path('comments/<int:pk>/delete/', delete_comment, name='delete-comment'),


]