from django.urls import path, include
from rest_framework import routers
from . import views


router = routers.DefaultRouter()
router.register(r'tournaments', views.TournamentViewSet, basename='tournament')
router.register(r'users', views.UserViewSet)
router.register(r'groups', views.GroupViewSet)
router.register(r'matches', views.MatchViewSet, basename='match')
router.register(r'teams', views.TeamViewSet)

urlpatterns = [
    path(r'api/', include(router.urls))
]