export default function TeamsModalForm(props) {
    const teams = props.teams;
    const teamOrdered = teams.sort((a, b) => a.seed - b.seed);
    const teamNames = teamOrdered.map((team) => team.name).join("\n");
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-60 z-40">
            <div className="relative flex flex-col bg-slate-800 w-[80vw] max-w-fit pt-4 rounded-md shadow-md shadow-slate-900">
                <button
                onClick={() }
                className="absolute top-0 right-0 m-2 stroke-slate-400 hover:stroke-slate-500 transition ease-in-out">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        className="w-6 h-6"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M6 18L18 6M6 6l12 12"
                        />
                    </svg>
                </button>
                <div className="text-center text-lg">Modify Teams</div>
                <form className="flex flex-col justify-center p-4">
                    <div className="flex justify-center">
                        <label>Number of teams:</label>
                        <input
                            type="number"
                            min={2}
                            max={32}
                            className="bg-slate-900 rounded-lg mx-2 text-right"
                        ></input>
                    </div>
                    <button className="text-sm px-2 py-1 mt-3 rounded-xl w-fit self-center bg-sky-600 shrink-0">
                        Submit
                    </button>
                </form>
                <hr className="border-gray-500 mx-5" />
                <form className="flex flex-col p-4 justify-center ">
                    <label className="text-center">
                        Or provide a list of teams separated by new lines:
                    </label>
                    <textarea
                        type="text"
                        defaultValue={teamNames}
                        rows={10}
                        cols={50}
                        className="mt-4 pl-2 py-2 bg-slate-900 rounded-lg mx-2"
                    ></textarea>
                    <button className="text-sm px-2 py-1 mt-3 rounded-xl w-fit self-center bg-sky-600">
                        Submit
                    </button>
                </form>
            </div>
        </div>
    );
}
