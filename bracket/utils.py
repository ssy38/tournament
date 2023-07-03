from .models import Tournament, Match, Team

def generateMatches():
    pass

# get match and update winner and call generateNewMatches as necessary
def updateWinner(match, team):
    if team in [match.team1, match.team2]:
        match.winner = team
        generateNewMatches(match)


def generateNewMatches(match):
    tournament = match.tournament
