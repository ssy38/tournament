# Forms
from .models import *
from django.forms import ModelForm

class TournamentForm(ModelForm):
    class Meta:
        model = Tournament
        fields = ["name", "startDate", "endDate"]