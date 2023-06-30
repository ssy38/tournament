from django.shortcuts import render
from .forms import TournamentForm

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