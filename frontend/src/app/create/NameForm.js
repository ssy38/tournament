"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function NameForm() {
  const router = useRouter();
  const [next, setNext] = useState(false);
  const [teamSelect, setTeamSelect] = useState(0);
  const [error, setError] = useState(false);

  function addToLocalStorage(id) {
    // Add bracket to local storage if not in already
    const brackets = JSON.parse(localStorage.getItem("brackets"));
    if (brackets === null) {
      localStorage.setItem("brackets", JSON.stringify([id]));
    } else {
      brackets.push(id);
      localStorage.setItem("brackets", JSON.stringify(brackets));
    }
  }

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
        },
      );
      if (!res.ok) {
        throw new Error("Status: " + res.status);
      }
      const resData = await res.json();
      addToLocalStorage(resData.id);
      router.refresh();
      router.push(`brackets/${resData.id}/`);
    } catch (error) {
      console.log(error.message);
    }
  }

  // Display form to post
  return (
    <div className="w-3/4 max-w-xl ">
      <form onSubmit={goNext} className="flex flex-col justify-center ">
        <div className="flex flex-col rounded-lg bg-slate-900 p-4 shadow-md transition duration-200 hover:shadow-xl">
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
            className="peer mt-4 rounded-lg bg-slate-700 p-2"
          ></input>
          <button
            disabled={next}
            className="mt-3 w-fit self-center rounded-lg bg-slate-300 px-3 py-1 text-sm text-slate-950 transition-colors disabled:hidden peer-valid:hover:bg-slate-400 peer-invalid:cursor-default peer-invalid:bg-slate-600"
          >
            Next
          </button>
        </div>
        {next && (
          <div className="mt-3 flex flex-col shadow-md transition duration-200 hover:shadow-xl">
            <div className="flex w-full flex-row">
              <div
                onClick={() => setTeamSelect(0)}
                className={`${
                  teamSelect === 0
                    ? "bg-slate-900"
                    : "bg-slate-700 text-slate-500"
                } flex w-1/2 cursor-pointer flex-row justify-center rounded-t-lg px-3 py-2 transition duration-200 ease-in-out hover:bg-slate-900`}
              >
                Enter number of teams
              </div>
              <div
                onClick={() => setTeamSelect(1)}
                className={`${
                  teamSelect === 1
                    ? "bg-slate-900"
                    : "bg-slate-700 text-slate-500 "
                } flex w-1/2 cursor-pointer flex-row justify-center rounded-t-lg px-3 py-2 transition-all duration-200 ease-in-out hover:bg-slate-900`}
              >
                Enter team names manually
              </div>
            </div>
            <div className="flex flex-col justify-center rounded-lg rounded-t-none bg-slate-900">
              <div
                className={`${
                  teamSelect === 1 && "hidden"
                } flex flex-col justify-center p-4`}
              >
                <div className="flex justify-center">
                  <label htmlFor="teams">Number of teams:</label>
                  <input
                    type="number"
                    id="teams"
                    name="teams"
                    min={2}
                    max={32}
                    className="mx-2 rounded-lg bg-slate-700 text-right"
                  ></input>
                </div>
              </div>

              <div
                className={`${
                  teamSelect === 0 && "hidden"
                } flex flex-col justify-center p-4`}
              >
                <label htmlFor="teamList" className="text-center">
                  Enter list of teams separated by new lines:
                </label>
                <textarea
                  type="text"
                  id="teamList"
                  name="teamList"
                  placeholder={"Team 1\nTeam 2\nTeam 3\nTeam 4"}
                  rows={7}
                  className="mx-2 mt-4 rounded-lg bg-slate-700 py-2 pl-2"
                ></textarea>
                {error !== false && (
                  <span className="ml-1 mt-1 flex items-center text-xs font-medium tracking-wide text-red-500">
                    {error}
                  </span>
                )}
              </div>

              <button className="mb-4 w-fit self-center rounded-lg bg-slate-300 px-3 py-1 text-sm text-slate-950 transition-colors hover:bg-slate-400 peer-invalid:cursor-default peer-invalid:bg-slate-600">
                Create
              </button>
            </div>
          </div>
        )}
      </form>
    </div>
  );
}
