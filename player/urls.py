from django.urls import path
from .views import video_qualities

urlpatterns = [
    path('api/video/', video_qualities),
]
