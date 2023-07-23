export default function Button(props) {
    return <button className="bg-sky-600 rounded-md py-3 px-10 min-w-fit">
        {props.text}
    </button>
}