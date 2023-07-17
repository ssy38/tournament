async function getData(id) {
    const res = await fetch(`http://127.0.0.1:8000/api/tournaments/${id}/`, { cache: 'no-store' })
    if (!res.ok) {
      throw new Error('Failed to fetch data')
    }
   
    return res.json()
  }

export default async function Page({params}) {
  const data = await getData(params.id)
  return <div>
    <div>
      Name: {data.name}
    </div>
    Teams:
    <ul>
      {data.teams.map(team => <li>{team.name}</li>)}
    </ul>
    Matches:
    <div>
      {JSON.stringify(data.matches)}
    </div>
    <br></br>
    Raw:
    {JSON.stringify(data)}</div>
}