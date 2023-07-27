"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function NameForm() {
    const { push } = useRouter();
    const [id, setId] = useState(0);
    // Generate POST request for new tournament
    async function create(event) {
        event.preventDefault();
        const data = {
            name: event.target.name.value,
        };
        try {
            const res = await fetch(
                "http://127.0.0.1:8000/api/tournaments/create/",
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
            setId(resData.id);
        } catch (error) {
            console.log(error.message);
        }
    }

    async function generate(event) {
        event.preventDefault();
        const data = {
            teams: event.target.teams.value,
        };
        try {
            const res = await fetch(
                `http://127.0.0.1:8000/api/tournaments/${id}/generate/`,
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
            push(`/brackets/${id}`);
        } catch (error) {
            console.log(error.message);
        }
    }
    // Return form to post
    return (
        <>
            {id === 0 ? (
                <form onSubmit={create}>
                    <div>
                        <label htmlFor="name">Name:</label>
                        <input
                            id="name"
                            type="text"
                            name="name"
                            className="text-black"
                        ></input>
                    </div>
                    <button type="submit">Submit</button>
                </form>
            ) : (
                <div>
                    <form onSubmit={generate}>
                        <div>
                            <label htmlFor="teams">Number of teams:</label>
                            <input
                                id="teams"
                                type="text"
                                name="teams"
                                className="text-black"
                            ></input>
                        </div>
                        <button type="submit">Submit</button>
                    </form>
                </div>
            )}
        </>
    );
}
