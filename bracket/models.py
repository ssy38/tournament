from django.db import models
from django.contrib.auth.models import User

# Create your models here.
class Tournament(models.Model):
    name = models.CharField(max_length=100)
    startDate = models.DateField()
    endDate = models.DateField()

class Team(models.Model):
    name = models.CharField(max_length=100)
    tournament = models.ManyToManyField(Tournament, related_name="tournaments")

class Match(models.Model):
    tournament = models.ForeignKey(Tournament, on_delete=models.CASCADE)
    team1 = models.ForeignKey(Team, related_name="team1Matches", on_delete=models.CASCADE)
    team2 = models.ForeignKey(Team, related_name="team2Matches", on_delete=models.CASCADE)
    winner = models.ForeignKey(Team, related_name="winnerMatches", on_delete=models.SET_NULL, null=True, blank=True)

class Player(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    teams = models.ManyToManyField(Team, blank = True, related_name="players")