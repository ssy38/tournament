"use client";

import { useState } from "react";

const seedOrder = {
    2: [[1, 2]],
    4: [
        [1, 4],
        [2, 3],
    ],
    8: [
        [1, 8],
        [4, 5],
        [2, 7],
        [3, 6],
    ],
    16: [
        [1, 16],
        [8, 9],
        [4, 13],
        [5, 12],
        [2, 15],
        [7, 10],
        [3, 14],
        [6, 11],
    ],
    32: [
        [1, 32],
        [16, 17],
        [8, 25],
        [9, 24],
        [4, 29],
        [13, 20],
        [5, 28],
        [12, 21],
        [2, 31],
        [15, 18],
        [7, 26],
        [10, 23],
        [3, 30],
        [14, 19],
        [6, 27],
        [11, 22],
    ],
    64: [],
};

export default function BracketView(props) {
    const bracket = props.bracket;
    const matches = bracket.matches;
    const teams = bracket.teams;
    const numTeams = teams.length;
    const numRounds = Math.ceil(Math.log2(numTeams));
    const height = 2500;
    const width = 1000;

    const [winners, setWinners] = useState(matches);

    // Returns array of columns
    function createBracket() {
        const bracketArray = new Array(numRounds);
        const extraMatches = matches.filter((match) => match.round == 0);
        let rounds = 2 ** numRounds;
        if (extraMatches.length > 0) {
            bracketArray.push(
                <ColumnGroup
                    key={0}
                    round={rounds}
                    teams={teams}
                    matches={winners}
                    extraMatches={extraMatches}
                />
            );
            rounds /= 2;
        }
        let currentRound = 1;
        for (; rounds >= 2; rounds /= 2) {
            const currentMatches = winners.filter(
                (match) => match.round == currentRound
            );
            bracketArray.push(
                <ColumnGroup
                    key={currentRound}
                    round={rounds}
                    matches={currentMatches}
                    teams={teams}
                />
            );
            currentRound++;
        }
        return bracketArray;
    }

    return (
        <div className="flex-col px-12 py-10 flex-shrink h-[80vh] w-screen overflow-scroll">
            <div
                style={{ height: height + "px", width: width + "px" }}
                className={`flex pr-8 border-2 rounded-lg flex-row`}
            >
                {createBracket()}
            </div>
        </div>
    );

    function ColumnGroup({ round, teams, matches, extraMatches = 0 }) {
        const numMatches = round / 2;
        return (
            <div className="inline-flex flex-col justify-around align-middle w-full">
                {[...Array(numMatches)].map((_, i) => (
                    <MatchBlock
                        key={i}
                        round={round}
                        labels={teams ? seedOrder[round][i] : ["-", "-"]}
                        teams={teams}
                        match={
                            extraMatches !== 0
                                ? extraMatches.find((match) =>
                                      seedOrder[round][i].includes(
                                          match.expected_seed
                                      )
                                  )
                                : matches.find((match) =>
                                      seedOrder[round][i].includes(
                                          match.expected_seed
                                      )
                                  )
                        }
                    ></MatchBlock>
                ))}
            </div>
        );
    }

    function MatchBlock({ round, teams, match }) {
        if (match !== undefined) {
            var team1 = teams.find((team) => match.team1 == team.id);
            var team2 = teams.find((team) => match.team2 == team.id);
            if (team1 !== undefined) {
                var team1Name = team1.name;
            }
            if (team2 !== undefined) {
                var team2Name = team2.name;
            }
        }
        const currentRound = match === undefined ? 0 : match.round;
        function setWinner(team) {
            if (team === undefined || team === null) return;
            const winner = team.id;
            const winnersCopy = [...winners];
            const winnerMatch = winnersCopy.find(
                (match) =>
                    [match.team1, match.team2].includes(winner) &&
                    match.round === currentRound
            );
            if (winnerMatch.team1 === null || winnerMatch.team2 === null)
                return;
            winnerMatch.winner = winner;
            const nextTeam = winnerMatch.next_team;
            if (nextTeam === null) {
                console.log("WINNER: " + winner);
                bracket.winner = winner;
            } else {
                bracket.winner = null;
                const nextMatch = winnersCopy.find(
                    (match) => match.id === winnerMatch.next
                );
                if (nextMatch.team1 !== null || nextMatch.team2 !== null) {
                    nextMatch.winner = null;
                    let ptr = nextMatch.next;
                    let prevNT = nextMatch.next_team;
                    while (ptr !== null) {
                        ptr = winnersCopy.find((match) => match.id === ptr);
                        ptr.winner = null;
                        ptr[prevNT] = null;
                        prevNT = ptr.next_team;
                        ptr = ptr.next;
                    }
                }
                nextMatch[nextTeam] = winner;
            }
            setWinners(winnersCopy);
        }
        return (
            <div
                style={{ height: 100 / round + "%" }}
                className={`${
                    match == undefined && "invisible"
                } flex flex-col relative items-center border-white border-r-2 border-y-2 bg-transparent b-0`}
            >
                <div
                    onClick={() => setWinner(team1)}
                    className={`absolute flex cursor-pointer top-0 items-center ${
                        team1 == undefined
                            ? "bg-slate-900"
                            : team1.id == match.winner
                            ? "bg-blue-500"
                            : "bg-blue-950"
                    } rounded-xl border-2 w-[80%] h-16 text-lg transform -translate-y-1/2`}
                >
                    {team1 !== undefined && (
                        <div className="flex flex-shrink-0 h-full items-center min-w-max w-[15%] text-slate-400 justify-center border-r-2">
                            {team1.seed}
                        </div>
                    )}
                    <div className="line-clamp-2 px-2">{team1Name}</div>
                </div>

                <div
                    onClick={() => setWinner(team2)}
                    className={`absolute flex bottom-0 cursor-pointer items-center ${
                        team2 == undefined
                            ? "bg-slate-900"
                            : team2.id == match.winner
                            ? "bg-blue-500"
                            : "bg-blue-950"
                    } rounded-xl border-2 w-[80%] h-16 text-lg transform translate-y-1/2`}
                >
                    {team2 !== undefined && (
                        <div className="flex flex-shrink-0 h-full items-center min-w-max w-[15%] text-slate-400 justify-center border-r-2">
                            {team2.seed}
                        </div>
                    )}
                    <div className="line-clamp-2 px-2">{team2Name}</div>
                </div>
            </div>
        );
    }
}
