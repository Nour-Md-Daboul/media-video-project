from django.shortcuts import render

def index(request):
    qualities = [
        {"label": "144p", "url": "/media/video/video_144.mp4"},
        {"label": "360p", "url": "/media/video/video_360.mp4"},
        {"label": "720p", "url": "/media/video/video_720.mp4"},
    ]
    return render(request, "index.html", {"qualities": qualities})