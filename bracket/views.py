from django.shortcuts import render
from .forms import TournamentForm
from rest_framework import viewsets
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
    def generate_bracket(self, tournament):
        tournament = self.get_object()
        teams = tournament.teams.all()
        num_teams = teams.count()
        num_rounds = num_teams / 2

        for i in range(num_rounds):
            Match.objects.create(
                tournament = tournament,
                order = i,
                team1 = teams[i - 1],
                team2 = teams[num_teams - i],
            )

    def update_bracket(self, tournament):
        pass