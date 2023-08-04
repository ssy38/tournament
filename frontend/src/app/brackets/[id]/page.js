import { notFound } from "next/navigation";
import BracketView from "./BracketView";
import Title from "./Title";

export async function generateMetadata({ params, searchParams }) {
    // read route params
    const id = params.id
   
    // fetch data
    const tournament = await fetch(`http://127.0.0.1:8000/api/tournaments/${id}/`).then((res) => res.json())
   
    // optionally access and extend (rather than replace) parent metadata
   
    return {
      title: tournament.name + " - Bracket Maker",
    }
  }

async function getData(id) {
    const res = await fetch(`http://127.0.0.1:8000/api/tournaments/${id}/`, {
        cache: "no-store",
    });
    if (!res.ok) {
        return undefined;
    }
    return res.json();
}

export default async function Page({ params }) {
    const data = await getData(params.id);
    if (!data) {
        notFound();
    }
    return (
        <>
            <div className="">
                <div className="bg-slate-950">
                    <Title name={data.name} id={data.id} teams={data.teams} />
                    <BracketView bracket={data} />
                </div>
            </div>
        </>
    );
}

/*                <div className="flex flex-col bg-slate-700">
                    <div className="">Name: {data.name}</div>
                    Teams:
                    <ul>
                        {data.teams.map((team) => (
                            <li key={team.id}>
                                {team.name === ""
                                    ? "Team " + team.id
                                    : team.name}
                            </li>
                        ))}
                    </ul>
                    Matches:
                    <div>{JSON.stringify(data.matches)}</div>
                    <div>
                        <label htmlFor="teamsField">Number of teams:</label>
                        <input type="number" id="teamsField"></input>
                    </div>
                    Raw:
                    {JSON.stringify(data)}
                </div> */
