from django.shortcuts import render
from django.http import JsonResponse

def video_qualities(request):
    return JsonResponse({
        "qualities": [
            {"quality": "144p", "url": "/media/videos/video_144.mp4"},
            {"quality": "360p", "url": "/media/videos/video_360.mp4"},
            {"quality": "720p", "url": "/media/videos/video_720.mp4"},
        ]
    })


# Create your views here.
