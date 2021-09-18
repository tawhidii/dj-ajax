from django.urls import path
from .views import (
    post_list_and_create,
    load_posts,
    like_unlike_post,
    post_details,
    post_details_data_view,
    update_post_view,
    delete_post_view
)

app_name = 'posts'

urlpatterns = [
    path('', post_list_and_create, name='post-main'),
    path('post-data/<int:num_posts>/', load_posts, name='post-data'),
    path('like-unlike/', like_unlike_post, name='like-unlike'),
    path('<pk>/', post_details, name='post-detail'),
    path('<pk>/update/', update_post_view, name='update-post-view'),
    path('<pk>/delete/', delete_post_view, name='delete-post-view'),
    path('<pk>/data/', post_details_data_view, name='post-detail-data-view')
]
