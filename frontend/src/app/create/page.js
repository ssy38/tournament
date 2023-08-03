import NameForm from "./NameForm";

export default async function Home() {
    return (
        <div>
            <h1 className="text-center p-6 text-4xl font-bold">
                Create a tournament
            </h1>
            <div className="flex justify-center w-full">
                <NameForm />
            </div>
        </div>
    );
}
