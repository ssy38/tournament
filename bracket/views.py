from django.shortcuts import render
from .forms import TournamentForm
from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework.decorators import action
from .serializers import *
from rest_framework import permissions
from django.contrib.auth.models import User, Group
from .utils import generate_bracket, populate_teams

# Create your views here.


def index(request):
    return render(request, "bracket/index.html")

def create(request):
    if request.method == "POST":
        form = TournamentForm(request.POST)
        if form.is_valid():
            pass
    else:
        return render(request, "bracket/create.html", {
            "form": TournamentForm(),
        })

def tournament(request):
    return render(request, "bracket/tournaments.html")

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
    queryset = Team.objects.all()
    serializer_class = TeamSerializer

    #@action(detail=True, methods=['post'])



class TournamentViewSet(viewsets.ModelViewSet):
    serializer_class = TournamentSerializer
    queryset = Tournament.objects.all()

    @action(detail=True, methods=['post'])
    def generate(self, request, pk=None):
        tournament = self.get_object()
        tournament.matches.all().delete()
        tournament.teams.all().delete()
        num_teams = int(request.data.get('num'))
        generate_bracket(num_teams, tournament)
        return Response({'message': 'Bracket generated successfully'})
    
    @action(detail=True, methods=['post'], url_path="update-names", url_name="update-names")
    def update_names(self, request, pk=None):
        '''Update names of tournament teams given list of names'''
        tournament = self.get_object()
        names = request.data.get('names')
        if len(names) > tournament.teams.count():
            return Response({'error': 'Number of names must be less than number of teams'}, status=status.HTTP_400_BAD_REQUEST)
        populate_teams(names, tournament)
        tournament.matches.first().name = "asdf"
        print(tournament.teams.first().name)
        return Response({'message': 'Names updated successfully'})

class MatchViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows matches to be viewed or edited.
    """
    queryset = Match.objects.all()
    serializer_class = MatchSerializer
    http_method_names = ['get', 'patch']

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
        return Response(serializer.data)