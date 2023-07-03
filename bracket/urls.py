from django.urls import path, include
from rest_framework import routers
from . import views


router = routers.DefaultRouter()
router.register(r'tournaments', views.TournamentViewSet, basename='tournament')
router.register(r'users', views.UserViewSet)
router.register(r'groups', views.GroupViewSet)
router.register(r'matches', views.MatchViewSet, basename='match')

urlpatterns = [
    path("", views.index, name="index"),
    path("create/", views.create, name="create"),
    path("tournament/<int:id>/", views.bracket, name="bracket"),
    path("", include(router.urls))
]