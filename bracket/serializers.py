from rest_framework import serializers
from .models import *
from django.contrib.auth.models import User, Group




class MatchSerializer(serializers.ModelSerializer):
    class Meta:
        model = Match
        fields = "__all__"
        read_only_fields = ['tournament', 'round', 'team1', 'team2', 'next']

class TeamSerializer(serializers.ModelSerializer):
    class Meta:
        model = Team
        fields = "__all__"

class TournamentSerializer(serializers.ModelSerializer):
    winner = serializers.SerializerMethodField()
    matches = MatchSerializer(many=True, read_only=True)
    teams = TeamSerializer(many=True, read_only=True)

    def get_winner(self, obj):
        try:
            winner = obj.winner
        except:
            return None
        winner = obj.winner
        if winner:
            return TeamSerializer(winner).data

    class Meta:
        model = Tournament
        fields = "__all__"

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = "__all__"


class GroupSerializer(serializers.ModelSerializer):
    class Meta:
        model = Group
        fields = ['url', 'name']

class BracketSerializer(serializers.ModelSerializer):
    class Meta:
        fields = ['tournament', 'matches']