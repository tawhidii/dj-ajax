from django.shortcuts import render
from .models import Posts


def post_list_and_create(request):
    qs = Posts.objects.all()
    context = {
        'qs': qs
    }
    return render(request, 'posts/post.html', context)
