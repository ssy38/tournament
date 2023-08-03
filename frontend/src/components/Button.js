export default function Button(props) {
    return (
        <button className="flex items-center justify-center bg-slate-300 text-slate-950 rounded-xl py-4 px-12 text-sm w-fit transition ease-in-out hover:bg-slate-400 hover:scale-105 duration-500">
            {props.text}
        </button>
    );
}
