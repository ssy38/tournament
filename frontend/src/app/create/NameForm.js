"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function NameForm() {
    const { push } = useRouter();
    const [next, setNext] = useState(false);
    const [teamSelect, setTeamSelect] = useState(0);
    const [error, setError] = useState(false);

    // Switch to next on next click. If already next, submit form.
    const goNext = (event) => {
        event.target.name.blur();
        event.preventDefault();
        if (!next) {
            setNext(true);
        } else {
            const name = event.target.name.value;
            let teams;
            let url = "";
            if (teamSelect === 0) {
                teams = event.target.teams.value;
                if (teams < 2 || teams.length > 32) {
                    return;
                }
                url = "bracket";
            } else {
                teams = event.target.teamList.value.split(/\r|\n/);
                if (teams.length < 2 || teams.length > 32) {
                    setError("Number of teams must be between 2 and 32");
                    return;
                }
                url = "teams";
            }
            const data = { name: name, teams: teams };
            create(data, url);
        }
    };
    // Generate POST request for new tournament
    async function create(data, url) {
        try {
            const res = await fetch(
                `http://127.0.0.1:8000/api/tournaments/create-${url}/`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(data),
                }
            );
            if (!res.ok) {
                throw new Error("Status: " + res.status);
            }
            const resData = await res.json();
            push(`http://127.0.0.1:3000/brackets/${resData.id}/`);
        } catch (error) {
            console.log(error.message);
        }
    }

    // Display form to post
    return (
        <div className="w-3/4 max-w-xl ">
            <form onSubmit={goNext} className="flex flex-col justify-center ">
                <div className="flex flex-col p-4 rounded-lg bg-slate-900 shadow-md hover:shadow-xl transition duration-200">
                    <div htmlFor="name" className="text-center text-lg">
                        Name your tournament
                    </div>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        placeholder="My Tournament"
                        maxLength={70}
                        minLength={1}
                        required={true}
                        className="mt-4 p-2 bg-slate-700 rounded-lg peer"
                    ></input>
                    <button
                        disabled={next}
                        className="disabled:hidden text-sm px-3 py-1 mt-3 rounded-lg w-fit self-center bg-slate-300 text-slate-950 peer-invalid:bg-slate-600 peer-invalid:cursor-default peer-valid:hover:bg-slate-400 transition-colors"
                    >
                        Next
                    </button>
                </div>
                {next && (
                    <div className="flex flex-col mt-3 transition duration-200 shadow-md hover:shadow-xl">
                        <div className="flex flex-row w-full">
                            <div
                                onClick={() => setTeamSelect(0)}
                                className={`${
                                    teamSelect === 0
                                        ? "bg-slate-900"
                                        : "bg-slate-700 text-slate-500"
                                } flex flex-row justify-center px-3 py-2 w-1/2 rounded-t-lg cursor-pointer transition hover:bg-slate-900 duration-200 ease-in-out`}
                            >
                                Enter number of teams
                            </div>
                            <div
                                onClick={() => setTeamSelect(1)}
                                className={`${
                                    teamSelect === 1
                                        ? "bg-slate-900"
                                        : "bg-slate-700 text-slate-500 "
                                } flex flex-row justify-center px-3 py-2 w-1/2 rounded-t-lg cursor-pointer transition-all hover:bg-slate-900 duration-200 ease-in-out`}
                            >
                                Enter team names manually
                            </div>
                        </div>
                        <div className="flex flex-col bg-slate-900 rounded-lg rounded-t-none justify-center">
                            <div
                                className={`${
                                    teamSelect === 1 && "hidden"
                                } flex flex-col justify-center p-4`}
                            >
                                <div className="flex justify-center">
                                    <label htmlFor="teams">
                                        Number of teams:
                                    </label>
                                    <input
                                        type="number"
                                        id="teams"
                                        name="teams"
                                        min={2}
                                        max={32}
                                        className="bg-slate-700 rounded-lg mx-2 text-right"
                                    ></input>
                                </div>
                            </div>

                            <div
                                className={`${
                                    teamSelect === 0 && "hidden"
                                } flex flex-col justify-center p-4`}
                            >
                                <label
                                    htmlFor="teamList"
                                    className="text-center"
                                >
                                    Enter list of teams separated by new lines:
                                </label>
                                <textarea
                                    type="text"
                                    id="teamList"
                                    name="teamList"
                                    placeholder={
                                        "Team 1\nTeam 2\nTeam 3\nTeam 4"
                                    }
                                    rows={7}
                                    className="mt-4 pl-2 py-2 bg-slate-700 rounded-lg mx-2"
                                ></textarea>
                                {error !== false && (
                                    <span className="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1">
                                        {error}
                                    </span>
                                )}
                            </div>

                            <button className="text-sm px-3 py-1 mb-4 rounded-lg w-fit self-center bg-slate-300 text-slate-950 peer-invalid:bg-slate-600 peer-invalid:cursor-default hover:bg-slate-400 transition-colors">
                                Create
                            </button>
                        </div>
                    </div>
                )}
            </form>
        </div>
    );
}
