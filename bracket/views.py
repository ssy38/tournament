from django.shortcuts import render
from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework.decorators import action
from .serializers import *
from rest_framework import permissions
from django.contrib.auth.models import User, Group
from .utils import generate_bracket, populate_teams, advance_team

# Create your views here.



class UserViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows users to be viewed or edited.
    """
    queryset = User.objects.all().order_by('-date_joined')
    serializer_class = UserSerializer
    permission_classes = [permissions.IsAuthenticated]


class GroupViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows groups to be viewed or edited.
    """
    queryset = Group.objects.all()
    serializer_class = GroupSerializer
    permission_classes = [permissions.IsAuthenticated]


class TeamViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows teams to be viewed or edited.
    """
    queryset = Team.objects.all().order_by('seed')
    serializer_class = TeamSerializer


class TournamentViewSet(viewsets.ModelViewSet):
    serializer_class = TournamentSerializer
    queryset = Tournament.objects.all()

    @action(detail=False, methods=['post'], url_path="create", url_name="create")
    def create_empty_bracket(self, request, pk=None):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)
    
    @action(detail=False, methods=['post'], url_path="create-bracket", url_name="create-bracket")
    def create_bracket(self, request, pk=None):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        
        try:
            num_teams = int(request.data.get('teams'))
            if num_teams < 2 or num_teams > 32:
                return Response({'error': 'Number of teams must be between 2 and 32'}, status=status.HTTP_400_BAD_REQUEST)
            object = serializer.save()
            generate_bracket(num_teams, object)
            headers = self.get_success_headers(serializer.data)
            return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)
        except:
            return Response({'error': 'Error creating bracket'}, status=status.HTTP_400_BAD_REQUEST)


    
    @action(detail=False, methods=['post'], url_path="create-teams", url_name="create-teams")
    def create_teams(self, request, pk=None):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        
        try:
            teams = request.data.get('teams')
            num_teams = len(teams)
            if num_teams < 2 or num_teams > 32:
                return Response({'error': 'Number of teams must be between 2 and 32'}, status=status.HTTP_400_BAD_REQUEST)
            object = serializer.save()
            generate_bracket(num_teams, object)
            populate_teams(teams, object)
            headers = self.get_success_headers(serializer.data)
            return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)
        except:
            return Response({'error': 'Error creating bracket'}, status=status.HTTP_400_BAD_REQUEST)

    @action(detail=True, methods=['post'])
    def generate(self, request, pk=None):
        tournament = self.get_object()
        tournament.matches.all().delete()
        tournament.teams.all().delete()
        num_teams = int(request.data.get('teams'))
        if num_teams < 2 or num_teams > 32:
            return Response({'error': 'Number of teams must be between 2 and 32'}, status=status.HTTP_BAD_REQUEST)
        generate_bracket(num_teams, tournament)
        return Response({'message': 'Bracket generated successfully'})
    
    @action(detail=True, methods=['post'], url_path="generate-teams", url_name="generate-teams")
    def generate_teams(self, request, pk=None):
        tournament = self.get_object()
        tournament.matches.all().delete()
        tournament.teams.all().delete()
        teams = request.data.get('teams')
        num_teams = len(teams)
        if num_teams < 2 or num_teams > 32:
            return Response({'error': 'Number of teams must be between 2 and 32'}, status=status.HTTP_BAD_REQUEST)
        generate_bracket(num_teams, tournament)
        populate_teams(teams, tournament)
        return Response({'message': 'Bracket generated successfully'})
    
    @action(detail=True, methods=['post'], url_path="update-names", url_name="update-names")
    def update_names(self, request, pk=None):
        '''Update names of tournament teams given list of names'''
        tournament = self.get_object()
        names = request.data.get('names')
        if len(names) != tournament.teams.count():
            return Response({'error': 'Number of names must equal to the number of teams'}, status=status.HTTP_400_BAD_REQUEST)
        populate_teams(names, tournament)
        return Response({'message': 'Names updated successfully'})


class MatchViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows matches to be viewed or edited.
    """
    queryset = Match.objects.all()
    serializer_class = MatchSerializer

    # Update winner on patch call
    def partial_update(self, request, *args, **kwargs):
        match = self.get_object()
        serializer = self.get_serializer(match, data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)

        # Check if the winner is either team1 or team2
        winner = serializer.validated_data.get('winner')
        if winner not in [match.team1, match.team2]:
            return Response({"error": "Winner must be either team1 or team2"}, status=status.HTTP_400_BAD_REQUEST)
        self.perform_update(serializer)
        advance_team(match)
        return Response(serializer.data)