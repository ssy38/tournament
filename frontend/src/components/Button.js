export default function Button(props) {
    return <button className="flex items-center justify-center bg-sky-600 rounded-xl py-4 px-12 text-sm font-medium w-fit">
        {props.text}
    </button>
}