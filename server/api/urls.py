from django.urls import include, path, re_path
from django.views.generic import TemplateView

urlpatterns = [
    path("user/", include("api.user.urls")),
    path("playlist/", include("api.playlist.urls")),
    path("video/", include("api.video.urls")),
    path("comment/", include("api.comment.urls")),
    path("draft/", include("api.draft.urls")),
]
