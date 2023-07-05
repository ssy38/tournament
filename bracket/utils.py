from .models import Match, Tournament, Team
from math import log2, floor

def generate_bracket(n, tournament, *args, **kwargs):
    '''Generates bracket for tournament of size n.'''

    # If args is empty, then the function is being called for the first time.
    # Then, initialize args for recursion.
    if not args:
        num_rounds = floor(log2(n))
        higher_seed = 1
        current_round = num_rounds
        next_match = None
        higher_team = Team.objects.create(seed=1, tournament=tournament)
    else:
        higher_seed = args[0]
        current_round = args[1]
        num_rounds = args[2]
        next_match = kwargs.get("next_match")
        higher_team = kwargs.get("higher_team")

    # Calculate lower seed in current match
    seed_sum = 2 ** (num_rounds - current_round + 1) + 1
    lower_seed = seed_sum - higher_seed

    # Create lower seeded team
    lower_team = Team.objects.create(seed=lower_seed, tournament=tournament)
    
    # Check if current match is a starting match
    if current_round == 1:
        base_matches = 2 ** num_rounds
        extra_matches = n - base_matches
        # If current match has a bye team, then create current match, then create extra match
        if extra_matches > 0 and lower_seed in range(base_matches - extra_matches + 1, base_matches + 1):
            match = Match.objects.create(tournament=tournament, team1=higher_team, round=current_round, next=next_match)
            extra_team = Team.objects.create(seed=2*n-lower_seed+1, tournament=tournament)
            Match.objects.create(tournament=tournament, team1=lower_team, team2=extra_team, round=0, next=match)
            return
        # Otherwise, create current match with starting teams
        match = Match.objects.create(tournament=tournament, team1=higher_team, team2=lower_team, round=current_round, next=next_match)
        return
    
    # If not starting match, then create placeholder match without teams in them
    match = Match.objects.create(tournament=tournament, round=current_round, next=next_match)

    # Recursion
    generate_bracket(n, tournament, higher_seed, current_round - 1, num_rounds, next_match=match, higher_team=higher_team)
    generate_bracket(n, tournament, lower_seed, current_round - 1, num_rounds, next_match=match, higher_team=lower_team)

def populate_teams(names, tournament):
    '''Sets names of teams from lowest to highest seed given list of strings.'''
    teams = tournament.teams.order_by('seed')
    for team, name in zip(teams, names):
        team.name = name
        team.save()