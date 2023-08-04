from rest_framework import serializers
from .models import *
from django.contrib.auth.models import User, Group




class MatchSerializer(serializers.ModelSerializer):
    class Meta:
        model = Match
        fields = "__all__"
        read_only_fields = ('round', 'next_team', 'expected_seed', 'tournament', 'next')

class TeamSerializer(serializers.ModelSerializer):
    class Meta:
        model = Team
        fields = "__all__"
        read_only_fields = ['tournament', 'seed']

class TournamentSerializer(serializers.ModelSerializer):
    matches = MatchSerializer(many=True, read_only=True)
    teams = TeamSerializer(many=True, read_only=True)

    def update(self, instance, validated_data):
        matches_data = self.context['request'].data.get('matches', None)
        validated_data.pop('matches', None)
        
        instance = super().update(instance, validated_data)

        if matches_data is not None:
            for match_data in matches_data:
                match_id = match_data.get('id')
                if match_id:
                    # If match_id exists, update the existing match
                    match_instance = Match.objects.get(id=match_id)
                    match_serializer = MatchSerializer(instance=match_instance, data=match_data, partial=True)
                    if match_serializer.is_valid():
                        match_serializer.save()
        
        return instance


    class Meta:
        model = Tournament
        fields = "__all__"





class CreateEmptyTournamentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tournament
        fields = ['name']

class CreateTournamentSerializer(serializers.ModelSerializer):
    teams = serializers.IntegerField(min_value=2, max_value=32)
    class Meta:
        model = Tournament
        fields = ["name", "teams"]

class GenerateSerializer(serializers.ModelSerializer):
    teams = serializers.IntegerField(min_value=2, max_value=32)
    class Meta:
        model = Tournament
        fields = ['teams']

class CreateTeamsSerializer(serializers.ModelSerializer):
    teams = serializers.ListField(child=serializers.CharField(max_length=100), min_length=2, max_length=32)
    class Meta:
        model = Tournament
        fields = ["name", "teams"]

class UpdateNamesSerializer(serializers.ModelSerializer):
    teams = serializers.ListField(child=serializers.CharField(max_length=100), min_length=2, max_length=32)
    class Meta:
        model = Tournament
        fields=['teams']