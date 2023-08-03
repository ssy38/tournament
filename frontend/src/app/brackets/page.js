import BracketList from "./BracketList";

export const revalidate = 0;
export const dynamic = "force-dynamic";

async function getData() {
  const res = await fetch("http://127.0.0.1:8000/api/tournaments/", {
    cache: "no-store",
  });
  if (res.ok) {
    console.log("fetching");
    return res.json();
  } else {
    console.log("not fetching");
    return [];
  }
}

export default async function Home() {
  const data = await getData();
  console.log("rerendering");
  return (
    <div className="flex flex-col items-center pb-10">
      <h1 className="pb-3 pt-6 text-4xl font-bold">My brackets</h1>
      <BracketList tournaments={data} />
    </div>
  );
}
