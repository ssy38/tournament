import NameForm from "./NameForm";

export default function Home() {
  return (
    <div>
      <h1 className="p-6 text-center text-4xl font-bold">
        Create a tournament
      </h1>
      <div className="flex w-full justify-center">
        <NameForm />
      </div>
    </div>
  );
}
