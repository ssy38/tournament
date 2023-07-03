from django.db import models
from django.contrib.auth.models import User

# Create your models here.

class Tournament(models.Model):
    class formats(models.TextChoices):
        SINGLE = "SINGLE", "Single Elimination"

    name = models.CharField(max_length=100)
    format = models.CharField(
        max_length=100,
        choices=formats.choices,
        default=formats.SINGLE
    )
    startDate = models.DateField()
    endDate = models.DateField()


class Team(models.Model):
    name = models.CharField(max_length=100)
    tournaments = models.ManyToManyField(Tournament, related_name="teams")

class Match(models.Model):
    tournament = models.ForeignKey(Tournament, related_name="matches", on_delete=models.CASCADE)
    round = models.IntegerField(default=1)
    order = models.IntegerField(default=1)
    team1 = models.ForeignKey(Team, related_name="team1Matches", on_delete=models.CASCADE)
    team2 = models.ForeignKey(Team, related_name="team2Matches", on_delete=models.CASCADE)
    winner = models.ForeignKey(Team, related_name="winnerMatches", on_delete=models.SET_NULL, null=True, blank=True)


class Player(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    teams = models.ManyToManyField(Team, blank = True, related_name="players")

class BracketType(models.Model):
    name = models.CharField(max_length=100)
    description = models.TextField()