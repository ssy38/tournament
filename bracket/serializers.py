from rest_framework import serializers
from .models import *
from django.contrib.auth.models import User, Group




class MatchSerializer(serializers.ModelSerializer):
    class Meta:
        model = Match
        fields = ["tournament", "round", "order", "team1", "team2", "winner"]

class TournamentSerializer(serializers.ModelSerializer):
    matches = MatchSerializer(many=True, read_only=True)
    class Meta:
        model = Tournament
        fields = "__all__"


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