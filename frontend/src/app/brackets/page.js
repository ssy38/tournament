import Link from "next/link"

async function getData() {
    const res = await fetch('http://127.0.0.1:8000/api/tournaments/', { cache: 'no-store' })
    const tournaments = await res.json()
    return tournaments
}

export default async function Home() {
    const data = await getData()

    return <div>
      <ul>
      {data.map((tournament) =>
        <li key="tournament.id"><Link href={`/brackets/${tournament.id}`}>{tournament.name}</Link></li>
      )}
    </ul>
    </div>
    

}

