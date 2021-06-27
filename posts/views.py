from django.shortcuts import render
from django.http import JsonResponse
from .models import Posts


def post_list_and_create(request):
    qs = Posts.objects.all()
    context = {
        'qs': qs
    }
    return render(request, 'posts/post.html', context)


def load_posts(request, num_posts):
    visible_data = 3
    upper = num_posts
    lower = num_posts - visible_data
    size = Posts.objects.all().count()
    qs = Posts.objects.all()
    data = []
    for q in qs:
        item = {
            'id': q.id,
            'title': q.title,
            'author': q.author.user.username,
            'liked': True if request.user in q.liked.all() else False,
            'body': q.body
        }
        data.append(item)
    return JsonResponse({'data': data[lower:upper], 'size': size})


def first_ajax_hello_world(request):
    return JsonResponse({'hello': 'hello world !!'})
