"use client";
import Link from "next/link";
import { useState, useEffect } from "react";

export default function BracketList(props) {
  const tournaments = props.tournaments;

  const [brackets, setBrackets] = useState(undefined);
  useEffect(() => {
    const bracketsList = JSON.parse(localStorage.getItem("brackets"));
    if (!Array.isArray(bracketsList)) {
      localStorage.removeItem("brackets");
      setBrackets(null);
    } else {
      setBrackets(bracketsList);
    }
  }, []);

  return brackets == null ? (
    <></>
  ) : (
    <div className="flex w-5/6 max-w-5xl flex-row flex-wrap">
      {brackets.map((bracket) => {
        const tournament = tournaments.find(
          (tournament) => tournament.id === bracket,
        );
        return (
          <div
            key={bracket}
            className="flex w-full px-3 py-4 sm:w-1/2 lg:w-1/3"
          >
            <Link
              href={`/brackets/${bracket}`}
              className="relative flex h-24 w-full flex-col items-center rounded-2xl bg-slate-900 text-center shadow-xl transition duration-200 ease-in-out hover:scale-[103%] active:scale-100"
            >
              <div className="mt-1 flex h-14 w-11/12 items-center justify-center px-1 pb-1 text-xl font-semibold leading-tight text-blue-300">
                <div className="line-clamp-2">{tournament.name}</div>
              </div>
              <div className="absolute bottom-2 flex w-full flex-row">
                <div className="flex w-1/2 flex-row justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="h-6 w-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z"
                    />
                  </svg>
                  <div className="ml-1">{tournament.teams.length}</div>
                </div>
                <div className="flex w-1/2 flex-row justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="h-6 w-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M16.5 18.75h-9m9 0a3 3 0 013 3h-15a3 3 0 013-3m9 0v-3.375c0-.621-.503-1.125-1.125-1.125h-.871M7.5 18.75v-3.375c0-.621.504-1.125 1.125-1.125h.872m5.007 0H9.497m5.007 0a7.454 7.454 0 01-.982-3.172M9.497 14.25a7.454 7.454 0 00.981-3.172M5.25 4.236c-.982.143-1.954.317-2.916.52A6.003 6.003 0 007.73 9.728M5.25 4.236V4.5c0 2.108.966 3.99 2.48 5.228M5.25 4.236V2.721C7.456 2.41 9.71 2.25 12 2.25c2.291 0 4.545.16 6.75.47v1.516M7.73 9.728a6.726 6.726 0 002.748 1.35m8.272-6.842V4.5c0 2.108-.966 3.99-2.48 5.228m2.48-5.492a46.32 46.32 0 012.916.52 6.003 6.003 0 01-5.395 4.972m0 0a6.726 6.726 0 01-2.749 1.35m0 0a6.772 6.772 0 01-3.044 0"
                    />
                  </svg>
                  <div className="ml-1">
                    {tournament.winner !== null ? "Decided" : "None"}
                  </div>
                </div>
              </div>
            </Link>
          </div>
        );
      })}
    </div>
  );
}
