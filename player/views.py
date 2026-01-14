from django.shortcuts import render
from django.http import JsonResponse

def index(request):
    return render(request, 'player/index.html')

def video_qualities(request):
    return JsonResponse({
        "qualities": [
            {"quality": 144, "url": "/media/videos/video_144.mp4"},
            {"quality": 360, "url": "/media/videos/video_360.mp4"},
            {"quality": 720, "url": "/media/videos/video_720.mp4"},
        ]
    })