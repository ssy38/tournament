

import { notFound } from "next/navigation"
import BracketView from "./BracketView"

async function getData(id) {
    const res = await fetch(`http://127.0.0.1:8000/api/tournaments/${id}/`, { cache: 'no-store' })
    if (!res.ok) {
      return undefined
    }
    return res.json()
  }

export default async function Page({params}) {
  const data = await getData(params.id)
  if (!data) {
    notFound()
  }
  return <>
    <div classname="block">
    <div>
      Name: {data.name}
    </div>
    Teams:
    <ul>
      {data.teams.map(team => <li key={team.id}>{team.name === '' ? 'Team ' + team.id : team.name}</li>)}
    </ul>
    Matches:
    <div>
      {JSON.stringify(data.matches)}
    </div>
    <div>
    <label htmlFor="teamsField">Number of teams:</label>
      <input type="number" id="teamsField"></input>
      {/*<button type="submit" onClick={() => generate(data.id, document.getElementById('teamsField').value)}>Generate Bracket</button>*/}
    </div>
    Raw:
    {JSON.stringify(data)}</div>
    <BracketView bracket={data}/>
    <div className="flex w-16 max-w-16 flex-wrap bg-black">
      <div>asdf</div>
      <div>asdf</div>
    </div>
    </>
}

// Sends post request to generate bracket
export async function generate(id, teams) {
  const res = await fetch(`http://127.0.0.1:8000/api/tournaments/${id}/generate/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      teams: teams
    })
  })
}