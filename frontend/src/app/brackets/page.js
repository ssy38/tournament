import BracketList from "./BracketList";

export const metadata = {
  title: "Brackets - Bracket Maker"
}

async function getData() {
  const res = await fetch("https://bracket-maker-django.onrender.com/api/tournaments/", {
    cache: "no-store",
  });
  if (res.ok) {
    return res.json();
  } else {
    return [];
  }
}

export default async function Home() {
  const data = await getData();
  return (
    <div className="flex flex-col items-center pb-10">
      <h1 className="pb-3 pt-6 text-4xl font-bold">My brackets</h1>
      <BracketList tournaments={data} />
    </div>
  );
}
