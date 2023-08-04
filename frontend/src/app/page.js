import Hero from "@/components/Hero";

async function status() {
    const res = await fetch("https://bracket-maker-django.onrender.com/");
    if (res.status === 200) {
        return true;
    }
    else return true;
}

export default async function Page() {
    const online = await status()
    return (
        <>
            <main>
                <Hero title="Generate interactive brackets" />
            </main>
            <div className="flex mt-10 justify-center">
                <a href="https://bracket-maker-django.onrender.com/" target="_blank" rel="noreferrer">
                    <div className="flex text-center align-middle justify-between min-w-fit px-3 py-2 bg-slate-900 rounded-full">
                        {online ? <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg> :
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
                        </svg>
                        }
                        <div className="flex-grow px-5">
                            {online ? "Server is online" : "Server error"}
                        </div>
                    </div>
                </a>
            </div>
        </>
    );
}
