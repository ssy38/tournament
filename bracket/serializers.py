from rest_framework import serializers
from .models import *
from django.contrib.auth.models import User, Group



class TournamentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tournament
        fields = ["name", "format", "startDate", "endDate"]


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['url', 'username', 'email', 'groups']


class GroupSerializer(serializers.ModelSerializer):
    class Meta:
        model = Group
        fields = ['url', 'name']

class BracketSerializer(serializers.ModelSerializer):
    class Meta:
        fields = ['tournament', 'matches']

    def update(self, instance, validated_data):
        pass