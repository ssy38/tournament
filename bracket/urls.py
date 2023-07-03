from django.urls import path, include
from rest_framework import routers
from . import views


router = routers.DefaultRouter()
router.register("api/tournaments", views.TournamentViewSet)
router.register("api/users", views.UserViewSet)
router.register("api/groups", views.GroupViewSet)

urlpatterns = [
    path("", views.index, name="index"),
    path("create/", views.create, name="create"),
    path("tournament/<int:id>/", views.bracket, name="bracket"),
    path("tournaments", views.tournament, name="tournament"),
    path("", include(router.urls))
]