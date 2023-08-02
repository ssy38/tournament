import Button from "./Button";
import Link from "next/link";

export default function Hero(props) {
    return (
        <div className="block m-auto max-w-3xl px-12">
            <h1 className="py-12 text-center text-6xl font-bold tracking-tight leading-tight text-transparent bg-clip-text bg-[conic-gradient(at_bottom_left,_var(--tw-gradient-stops))] from-fuchsia-300 via-green-400 to-rose-700">
                {props.title}
            </h1>
            <div className="flex flex-wrap justify-evenly p-3">
                <Link href="/create">
                    <Button text="Get started"></Button>
                </Link>

                <Button text="Docs"></Button>
            </div>
            <div></div>
        </div>
    );
}
