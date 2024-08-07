from django.urls import include, path

urlpatterns = [
    path("auth/", include("api.auth.urls")),
    path("user/", include("api.user.urls")),
    path("playlist/", include("api.playlist.urls")),
    path("video/", include("api.video.urls")),
    path("comment/", include("api.comment.urls")),
    path("draft/", include("api.draft.urls")),
]
