"use client";

import { useState } from "react";
import { useRef } from "react";

export default function Title(props) {
    const [open, setOpen] = useState(false);
    const nameInput = useRef();

    async function updateName() {
        const newName = nameInput.current.value;
        if (newName.length <= 0 || newName.length > 50) {
            return;
        }
        const res = await fetch(
            `http://127.0.0.1:8000/api/tournaments/${props.id}/`,
            {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    name: newName,
                }),
            }
        );
        if (!res.ok) console.log("Error updating name");
    }

    return (
        <>
            <div className="relative bg-gray-900 shadow-md shadow-slate-950">
                <div className="flex justify-center py-1 items-center">
                    <input
                        disabled={!open}
                        ref={nameInput}
                        defaultValue={props.name}
                        onKeyDown={(e) => e.key === "Enter" && updateName()}
                        onBlur={updateName}
                        maxLength={50}
                        minLength={1}
                        className={`${
                            open &&
                            "border-2 border-gray-700 transition ease-in-out hover:border-gray-600 focus:scale-[102%] duration-500"
                        } md:text-xl lg:text-2xl text-center rounded-xl my-2 w-1/2 max-w-2xl bg-transparent text-white`}
                    ></input>
                    <div className={`${open ? "" : "hidden"} mx-3`}>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke=""
                            className="w-6 h-6 stroke-gray-300"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                            />
                        </svg>
                    </div>
                </div>
                <div className="absolute flex flex-row right-0 top-2">
                    <div
                        onClick={() => setOpen(!open)}
                        className="mr-7 w-10 p-1.5 cursor-pointer transition ease-in-out duration-300 hover:bg-gray-800 rounded-full"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="w-fit h-fit"
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
                        open ? "max-h-12 py-3" : "max-h-0 invisible p-0"
                    } bg-slate-950 flex flex-row justify-center items-center  overflow-hidden transition-all ease-in-out duration-300`}
                >
                    <div
                        onClick={""}
                        className="p-2 mx-5 cursor-pointer bg-slate-700 rounded-xl hover:bg-slate-800 active:scale-[97%] transition ease-in-out duration-300"
                    >
                        Modify number of teams
                    </div>
                    <div className="p-2 mx-5 cursor-pointer bg-slate-700 rounded-xl hover:bg-slate-800 active:scale-[97%] transition ease-in-out duration-300">
                        Change team names
                    </div>
                </div>
            </div>
        </>
    );
}
