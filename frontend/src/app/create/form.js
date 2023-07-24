'use client'
import { useRouter } from "next/navigation"

export default function Form() {
    const { push } = useRouter();
    // Generate POST request for new tournament
    async function generate(event) {
        event.preventDefault()
        const data = {
            name: event.target.name.value,
            startDate: event.target.startDate.value,
            endDate: event.target.endDate.value,
        }
        try {
            const res = await fetch('http://127.0.0.1:8000/api/tournaments/', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify(data)
              })
              if (!res.ok) {
                throw new Error("Status: " + res.status)
              }
              const resData = await res.json()
              push(`/tournaments/${resData.id}`)
        } catch (error) {
            console.log(error.message)
        }
      }

    // Return form to post
    return <form onSubmit={ generate }>
        <div>
            <label htmlFor="name">Name:</label>
            <input id="name" type="text" name="name" className="text-black"></input>
        </div>
        <div>
            <label htmlFor="startDate">Start Date:</label>
            <input id="startDate" type="date" name="startDate" className="text-black"></input>
        </div>
        <div>
            <label htmlFor="endDate">End Date:</label>
            <input id="endDate" type="date" name="endDate" className="text-black"></input>
        </div>
        <button type="submit">Submit</button>
    </form>
}