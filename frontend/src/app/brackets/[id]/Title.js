"use client";

import { useState } from "react";
import { useRef } from "react";

export default function Title(props) {
  const [open, setOpen] = useState(false);
  const [teamsOpen, setTeamsOpen] = useState(false);
  const [teamNamesOpen, setTeamNamesOpen] = useState(false);
  const nameInput = useRef();

  const toggleTeamsOpen = () => setTeamsOpen(!teamsOpen);
  const toggleTeamNamesOpen = () => setTeamNamesOpen(!teamNamesOpen);

  async function updateName() {
    const newName = nameInput.current.value;
    if (newName.length <= 0 || newName.length > 50) {
      return;
    }
    const res = await fetch(
      `https://bracket-maker-django.onrender.com/api/tournaments/${props.id}/`,
      {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: newName,
        }),
      },
    );
    if (!res.ok) console.log("Error updating name");
  }

  return (
    <>
      <div className="relative bg-gray-900 shadow-md">
        <div className="flex h-16 items-center justify-center py-1">
          <input
            disabled={!open}
            ref={nameInput}
            defaultValue={props.name}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.target.blur();
              }
            }}
            onBlur={updateName}
            maxLength={70}
            minLength={1}
            className={`${
              open
                ? "border-2 border-gray-700 transition duration-500 ease-in-out hover:border-gray-600 focus:scale-[102%]"
                : "font-bold text-blue-300"
            } my-2 w-4/5 max-w-5xl rounded-xl bg-transparent text-center text-2xl tracking-tight md:text-3xl`}
          ></input>
          <div className={`${open ? "" : "hidden"} mx-2`}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke=""
              className="h-6 w-6 stroke-gray-300"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
              />
            </svg>
          </div>
        </div>
        <div className="absolute right-0 top-3 flex flex-row">
          <div
            onClick={() => setOpen(!open)}
            className="mr-7 w-10 cursor-pointer rounded-full p-1.5 transition duration-300 ease-in-out hover:bg-gray-800"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="h-fit w-fit"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
          </div>
        </div>
        <div
          className={`${
            open ? "h-12 py-3" : "invisible h-0 p-0"
          } flex flex-row items-center justify-center overflow-hidden  bg-slate-950 transition-all duration-300 ease-in-out`}
        >
          <div
            onClick={toggleTeamsOpen}
            className="mx-5 cursor-pointer rounded-xl bg-slate-700 p-2 transition duration-300 ease-in-out hover:bg-slate-800 active:scale-[97%]"
          >
            Edit number of teams
          </div>
          <div
            onClick={toggleTeamNamesOpen}
            className="mx-5 cursor-pointer rounded-xl bg-slate-700 p-2 transition duration-300 ease-in-out hover:bg-slate-800 active:scale-[97%]"
          >
            Edit team names
          </div>
        </div>
      </div>

      {teamsOpen && (
        <TeamsModalForm
          teams={props.teams}
          onClick={toggleTeamsOpen}
          id={props.id}
        />
      )}

      {teamNamesOpen && (
        <TeamNamesModalForm
          teams={props.teams}
          onClick={toggleTeamNamesOpen}
          id={props.id}
        />
      )}
    </>
  );
}

function TeamsModalForm({ teams, onClick, id }) {
  const teamOrdered = teams.sort((a, b) => a.seed - b.seed);
  const teamNames = teamOrdered.map((team) => team.name).join("\n");

  async function generate(event) {
    event.preventDefault();
    const numTeams = event.target.teams.value;
    const data = {
      teams: numTeams,
    };
    if (!(numTeams >= 2 && numTeams <= 32)) {
      return;
    }
    try {
      const res = await fetch(
        `https://bracket-maker-django.onrender.com/api/tournaments/${id}/generate/`,
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
      window.location.reload(true);
      onClick();
    } catch (error) {
      console.log(error.message);
    }
  }

  async function generateTeams(event) {
    event.preventDefault();
    const teamsText = event.target.teamsList.value;
    const teamNames = teamsText.split(/\r|\n/);
    if (teamNames.length < 2 || teamNames.length > 32) {
      return;
    }

    const data = {
      teams: teamNames,
    };
    try {
      const res = await fetch(
        `https://bracket-maker-django.onrender.com/api/tournaments/${id}/generate-teams/`,
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
      window.location.reload(true);
      onClick();
    } catch (error) {
      console.log(error.message);
    }
  }

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center bg-gray-900 bg-opacity-60">
      <div className="relative flex w-[80vw] max-w-fit flex-col rounded-md bg-slate-800 pt-4 shadow-md">
        <button
          onClick={onClick}
          className="absolute right-0 top-0 m-2 stroke-slate-400 transition ease-in-out hover:stroke-slate-500"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            className="h-6 w-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
        <div className="text-center text-lg">Edit Teams</div>
        <form onSubmit={generate} className="flex flex-col justify-center p-4">
          <div className="flex justify-center">
            <label>Number of teams:</label>
            <input
              type="number"
              id="teams"
              name="teams"
              required={true}
              min={2}
              max={32}
              className="mx-2 rounded-lg bg-slate-900 text-right"
            ></input>
          </div>
          <button className="mt-3 w-fit self-center rounded-lg bg-slate-300 px-3 py-1 text-sm text-slate-950 transition-colors hover:bg-slate-400">
            Submit
          </button>
        </form>
        <hr className="mx-7 border-gray-500" />
        <form
          onSubmit={generateTeams}
          className="flex flex-col justify-center p-4 "
        >
          <label className="text-center">
            Or provide a list of teams separated by new lines:
          </label>
          <textarea
            type="text"
            id="teamsList"
            name="teamsList"
            required={true}
            defaultValue={teamNames}
            rows={10}
            cols={50}
            className="mx-2 mt-4 rounded-lg bg-slate-900 py-2 pl-2"
          ></textarea>
          <button className="mt-3 w-fit self-center rounded-lg bg-slate-300 px-3 py-1 text-sm text-slate-950 transition-colors hover:bg-slate-400">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

function TeamNamesModalForm({ teams, onClick, id }) {
  const [error, setError] = useState();
  const numTeams = teams.length;
  const teamOrdered = teams.sort((a, b) => a.seed - b.seed);
  const teamNames = teamOrdered.map((team) => team.name).join("\n");

  async function updateNames(event) {
    event.preventDefault();
    const teamsText = event.target.teamsNames.value;
    const teamNames = teamsText.split(/\r|\n/);
    if (teamNames.length !== numTeams) {
      setError("Number of teams must stay the same");
      return;
    }
    setError(false);

    const data = {
      names: teamNames,
    };
    try {
      const res = await fetch(
        `https://bracket-maker-django.onrender.com/api/tournaments/${id}/update-names/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        },
      );
      if (!res.ok) {
        setError(res.statusText);
        throw new Error("Status: " + res.status);
      }
      window.location.reload(true);
      onClick();
    } catch (error) {
      console.log(error.message);
    }
  }

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center bg-gray-900 bg-opacity-60">
      <div className="relative flex w-[80vw] max-w-lg flex-col rounded-md bg-slate-800 pt-4 shadow-md">
        <button
          onClick={onClick}
          className="absolute right-0 top-0 m-2 stroke-slate-400 transition ease-in-out hover:stroke-slate-500"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            className="h-6 w-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
        <div className="text-center text-lg">Change Team Names</div>
        <form
          onSubmit={updateNames}
          className="flex max-w-fit flex-col justify-center p-4 "
        >
          <label className="text-center">Edit team names:</label>
          <textarea
            type="text"
            id="teamsNames"
            name="teamsNames"
            defaultValue={teamNames}
            rows={10}
            cols={50}
            className="mx-2 mt-4 resize-none rounded-lg bg-slate-900 py-2 pl-2"
          ></textarea>
          {error !== false && (
            <span className="ml-1 mt-1 flex items-center text-xs font-medium tracking-wide text-red-500">
              {error}
            </span>
          )}
          <button className="mt-3 w-fit self-center rounded-xl bg-sky-600 px-2 py-1 text-sm">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}
