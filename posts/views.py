from django.shortcuts import render
from django.http import JsonResponse
from django.core import serializers
from .models import Posts


def post_list_and_create(request):
    qs = Posts.objects.all()
    context = {
        'qs': qs
    }
    return render(request, 'posts/post.html', context)


def load_posts(request):
    qs = Posts.objects.all()
    data = []
    for q in qs:
        item = {
            'id':q.id,
            'title': q.title,
            'author': q.author.user.username
        }
        data.append(item)
    return JsonResponse({'data':data})


def first_ajax_hello_world(request):
    return JsonResponse({'hello': 'hello world !!'})
