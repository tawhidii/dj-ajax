from django.shortcuts import render
from django.http import JsonResponse
from .models import Posts
from .froms import PostForm
from profiles.models import Profile


def post_list_and_create(request):
    form = PostForm(request.POST or None)
    if request.is_ajax():
        if form.is_valid():
            author = Profile.objects.get(user=request.user)
            instance = form.save(commit=False)
            instance.author = author
            instance.save()
            return JsonResponse({
                'id': instance.id,
                'title': instance.title,
                'body': instance.body,
                'author': instance.author.user.username
            })
    context = {
        'form': form
    }
    return render(request, 'posts/post.html', context)


def load_posts(request, num_posts):
    if request.is_ajax():
        visible_data = 3
        upper = num_posts
        lower = num_posts - visible_data
        size = Posts.objects.all().count()
        qs = Posts.objects.all()
        data = []
        for q in qs:
            item = {
                'id': q.id,
                'title': '' if q.title is None else q.title,
                'author': q.author.user.username,
                'liked': True if request.user in q.liked.all() else False,
                'count': q.count_like,
                'body': q.body
            }
            data.append(item)
        return JsonResponse({'data': data[lower:upper], 'size': size})


def like_unlike_post(request):
    if request.is_ajax():
        pk = request.POST.get('pk')
        obj = Posts.objects.get(pk=pk)
        if request.user in obj.liked.all():
            liked = False
            obj.liked.remove(request.user)
        else:
            liked = True
            obj.liked.add(request.user)
        return JsonResponse({'liked': liked, 'count': obj.count_like})


def first_ajax_hello_world(request):
    return JsonResponse({'hello': 'hello world !!'})


def post_details(request, pk):
    obj = Posts.objects.get(pk=pk)
    form = PostForm()

    context = {
        'obj': obj,
        'form': form

    }
    return render(request, 'posts/details.html', context)


def post_details_data_view(request, pk):
    obj = Posts.objects.get(pk=pk)
    data = {
        'id': obj.id,
        'title': obj.title,
        'body': obj.body,
        'author': obj.author.user.username,
        'logged_in': request.user.username
    }
    return JsonResponse({'data': data})


def update_post_view(request, pk):
    obj = Posts.objects.get(pk=pk)
    if request.is_ajax():
        new_title = request.POST.get('title')
        new_body = request.POST.get('body')
        obj.title = new_title
        obj.body = new_body
        obj.save()

        return JsonResponse({
            'title': new_title,
            'body': new_body
        })


def delete_post_view(request, pk):
    obj = Posts.objects.get(pk=pk)
    if request.is_ajax():
        obj.delete()
        return JsonResponse({})
