from django.shortcuts import render
from .forms import TournamentForm
from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework.decorators import action
from .serializers import *
from rest_framework import permissions
from django.contrib.auth.models import User, Group

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

def bracket(request, id):
    pass


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


class TournamentViewSet(viewsets.ModelViewSet):
    serializer_class = TournamentSerializer
    queryset = Tournament.objects.all()

    @action(detail=True, methods=['post'])
    def generate(self, request, pk=None):
        tournament = self.get_object()
        teams = tournament.teams.all()
        num_teams = teams.count()
        num_rounds = num_teams // 2

        for i in range(num_rounds):
            Match.objects.create(
                tournament = tournament,
                order = i,
                team1 = teams[i],
                team2 = teams[num_teams - i - 1],
            )
        return Response({'message': 'Bracket generated successfully'})

    def update_bracket(self, request):
        pass

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
        return Response(serializer.data)