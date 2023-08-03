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

const heightVals = {
    2: 500,
    4: 500,
    8: 800,
    16: 1500,
    32: 2800,
};

export default function BracketView(props) {
    const widthVals = {
        2: "w-[40rem]",
        4: "w-[60rem]",
        8: "w-[80rem]",
        16: "w-[100rem]",
        32: "w-[120rem]",
    };
    const bracket = props.bracket;
    const id = bracket.id;
    const matches = bracket.matches;
    const teams = bracket.teams;
    const numTeams = teams.length;
    const numRounds = Math.ceil(Math.log2(numTeams));
    const height = heightVals[2 ** numRounds];
    const width = widthVals[2 ** numRounds];

    let winner_id = bracket.winner;
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

    async function save() {
        const res = await fetch(
            `http://127.0.0.1:8000/api/tournaments/${id}/`,
            {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    matches: winners,
                    winner: winner_id,
                }),
            }
        );
        return res.json();
    }
    return (
        <>
            <div
                className={`${
                    2 ** numRounds <= 8 && "xl:flex xl:justify-center"
                } px-12 py-10 flex-shrink h-[calc(100vh-140px)] w-screen overflow-scroll`}
            >
                <div
                    style={{ height: height + "px" }}
                    className={`flex pr-8 rounded-lg flex-row ${width} ${
                        2 ** numRounds <= 8 && "xl:w-screen"
                    }`}
                >
                    {createBracket()}
                    <div className="inline-flex flex-col justify-around align-middle w-full">
                        <div
                            className={`flex flex-col relative items-center border-white border-t-2 bg-transparent b-0`}
                        >
                            <div
                                className={`${
                                    winner_id ? "bg-blue-700" : "bg-slate-900"
                                } absolute flex right-0 items-center 
                     rounded-xl border-2 w-[80%] h-24 text-lg transform -translate-y-1/2`}
                            >
                                {teams.find((team) => team.id === winner_id) !==
                                    undefined && (
                                    <div className="flex flex-shrink-0 h-full items-center min-w-max w-[20%] text-slate-400 justify-center border-r-2">
                                        {
                                            teams.find(
                                                (team) => team.id === winner_id
                                            ).seed
                                        }
                                    </div>
                                )}
                                <div className="line-clamp-3 px-2">
                                    {teams.find(
                                        (team) => team.id === winner_id
                                    ) !== undefined &&
                                        teams.find(
                                            (team) => team.id === winner_id
                                        ).name}
                                </div>
                                <div className="absolute line-clamp-2 px-2 top-0 transform -translate-y-[140%]">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth={1.5}
                                        className="w-8 h-8 stroke-yellow-500"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M16.5 18.75h-9m9 0a3 3 0 013 3h-15a3 3 0 013-3m9 0v-3.375c0-.621-.503-1.125-1.125-1.125h-.871M7.5 18.75v-3.375c0-.621.504-1.125 1.125-1.125h.872m5.007 0H9.497m5.007 0a7.454 7.454 0 01-.982-3.172M9.497 14.25a7.454 7.454 0 00.981-3.172M5.25 4.236c-.982.143-1.954.317-2.916.52A6.003 6.003 0 007.73 9.728M5.25 4.236V4.5c0 2.108.966 3.99 2.48 5.228M5.25 4.236V2.721C7.456 2.41 9.71 2.25 12 2.25c2.291 0 4.545.16 6.75.47v1.516M7.73 9.728a6.726 6.726 0 002.748 1.35m8.272-6.842V4.5c0 2.108-.966 3.99-2.48 5.228m2.48-5.492a46.32 46.32 0 012.916.52 6.003 6.003 0 01-5.395 4.972m0 0a6.726 6.726 0 01-2.749 1.35m0 0a6.772 6.772 0 01-3.044 0"
                                        />
                                    </svg>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
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
            const nextTeam = winnerMatch.next_team;
            if (nextTeam === null) {
                if (winnerMatch.winner === winner) {
                    winnerMatch.winner = null;
                    winner_id = null;
                    bracket.winner = null;
                } else {
                    winnerMatch.winner = winner;
                    winner_id = winner;
                    bracket.winner = winner_id;
                }
            } else {
                winner_id = null;
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
                if (winnerMatch.winner === winner) {
                    winnerMatch.winner = null;
                    nextMatch[nextTeam] = null;
                } else {
                    winnerMatch.winner = winner;
                    nextMatch[nextTeam] = winner;
                }
            }
            save();
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
                    className={`absolute flex top-0 items-center ${
                        team1 == undefined
                            ? "bg-slate-900"
                            : (team1.id == match.winner
                                  ? "bg-blue-500 hover:bg-gray-700"
                                  : "bg-blue-950 hover:bg-blue-600") +
                              " hover:scale-[102%] active:scale-100 cursor-pointer"
                    } rounded-xl border-2 w-[80%] h-20 text-lg transform -translate-y-1/2 transition-all`}
                >
                    {team1 !== undefined && (
                        <div className="flex flex-shrink-0 text-sm h-full items-center min-w-max w-[15%] text-slate-400 justify-center border-r-2">
                            {team1.seed}
                        </div>
                    )}
                    <div className="text-md line-clamp-3 px-2 leading-snug">
                        {team1Name}
                    </div>
                </div>

                <div
                    onClick={() => setWinner(team2)}
                    className={`absolute flex bottom-0 items-center ${
                        team2 == undefined
                            ? "bg-slate-900"
                            : (team2.id == match.winner
                                  ? "bg-blue-500 hover:bg-gray-700"
                                  : "bg-blue-950 hover:bg-blue-600") +
                              " hover:scale-[102%] active:scale-100 cursor-pointer"
                    } rounded-xl border-2 w-[80%] h-20 text-lg transform translate-y-1/2 transition-all`}
                >
                    {team2 !== undefined && (
                        <div className="flex flex-shrink-0 text-sm h-full items-center min-w-max w-[15%] text-slate-400 justify-center border-r-2">
                            {team2.seed}
                        </div>
                    )}
                    <div className="text-md line-clamp-3 px-2 leading-snug">
                        {team2Name}
                    </div>
                </div>
            </div>
        );
    }
}
