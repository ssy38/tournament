export default function Button(props) {
    return (
        <button className="flex items-center justify-center bg-sky-600 rounded-xl py-4 px-12 text-sm font-medium w-fit transition ease-in-out hover:bg-sky-700 hover:scale-105 duration-500">
            {props.text}
        </button>
    );
}
