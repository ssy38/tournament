# from .models import Match, Tournament
from math import log2, floor


# n=1

class match:
    def __init__(self, team1, team2, round):
        self.team1 = team1
        self.team2 = team2
        self.round = round

matches = []

def generate_bracket(n, *args, **kwargs):
    # n = 8, higher_seed = 1, current_round = 3, num_rounds = 3
    # if args is empty, then the function is being called for the first time.
    # then, initialize args for recursion
    if not args:
        num_rounds = floor(log2(n))
        # args = [higher_seed, current round, total number of rounds]
        args = [1, num_rounds, num_rounds]

    higher_seed = args[0]
    current_round = args[1]
    num_rounds = args[2]

    seed_sum = 2 ** (num_rounds - current_round + 1) + 1

    lower_seed = seed_sum - higher_seed

    matches.append(match(higher_seed, lower_seed, current_round))
    
    # Base case
    if current_round == 1:
        # Check if extra matches past 2^num_rounds are needed
        base_matches = 2 ** num_rounds
        extra_matches = n - base_matches
        if lower_seed == 16:
             pass
        if extra_matches > 0 and lower_seed in range(base_matches - extra_matches + 1, base_matches + 1):
                matches.append(match(lower_seed, 2 * n - lower_seed + 1, 0))
        return

    # Recursion
    generate_bracket(n, higher_seed, current_round - 1, num_rounds)
    generate_bracket(n, lower_seed, current_round - 1, num_rounds)


generate_bracket(33+10)
print(len(matches))