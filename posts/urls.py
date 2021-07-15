from django.urls import path
from .views import (
    post_list_and_create,
    first_ajax_hello_world,
    load_posts,
    like_unlike_post
)

app_name = 'posts'

urlpatterns = [
    path('', post_list_and_create, name='post-main'),
    path('hello-ajax/', first_ajax_hello_world, name='hello-world'),
    path('post-data/<int:num_posts>/',load_posts,name='post-data'),
    path('like-unlike/',like_unlike_post,name='like-unlike')
]
