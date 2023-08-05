"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

export function NavLink({ href, label, active }) {
  const isActive = active === href;
  return (
    <>
      <Link
        id={label}
        href={href}
        className={`group relative block rounded-lg p-2 ${
          isActive && "text-sky-400"
        } transition duration-500 ease-in-out hover:scale-[103%] hover:text-sky-400 active:scale-100`}
      >
        <span
          className={`hidden ${
            isActive && "md:block"
          } absolute inset-x-1 bottom-1 h-0.5 rounded-full bg-sky-400`}
        ></span>
        <div className="">{label}</div>
      </Link>
    </>
  );
}

export function NavButton({ label }) {
  return (
    <button className="flex w-fit items-center justify-center rounded-xl bg-sky-600 px-5 py-2 text-sm font-medium transition duration-500 ease-in-out hover:scale-105 hover:bg-sky-700 active:scale-100">
      {label}
    </button>
  );
}

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const active = usePathname();
  return (
    <>
      <nav className="sticky top-0 z-50 w-full bg-slate-900 shadow-lg">
        <div className="flex flex-wrap items-center justify-between p-4">
          <div className="flex">
            <Link href="/" className="mr-5 flex items-center">
              <img src="/logo.svg" className="mr-4 h-10"></img>
              <span className="bg-gradient-to-r from-blue-50 to-blue-400 bg-clip-text text-2xl font-bold tracking-tight text-transparent">
                Bracket Maker
              </span>
            </Link>
            <Link href="/create" className="flex items-center">
              <NavButton label="Create"></NavButton>
            </Link>
          </div>
          <button
            onClick={() => setOpen((a) => !a)}
            className="flex items-center rounded-lg p-1 hover:bg-slate-800 focus:bg-slate-800 focus:ring-2 focus:ring-inset focus:ring-slate-700 md:hidden"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="h-6 w-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
              />
            </svg>
          </button>
          <div
            className={`${
              !open && "hidden"
            } mt-4 w-full md:m-0 md:block md:w-auto`}
          >
            <ul className="text-m mr-5 flex w-full flex-col space-y-2 rounded-lg bg-slate-800 p-3 md:flex-row md:space-x-8 md:space-y-0 md:bg-slate-900 md:p-0">
              <li>
                <NavLink href="/" label="Home" active={active}></NavLink>
              </li>
              <li>
                <NavLink
                  href="/brackets"
                  label="Brackets"
                  active={active}
                ></NavLink>
              </li>
              <li>
                <a target="_blank" rel="noreferrer" href="https://bracket-maker-django.onrender.com/api/schema/swagger-ui/" className="group relative block rounded-lg p-2 transition duration-500 ease-in-out hover:scale-[103%] hover:text-sky-400 active:scale-100">Docs</a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}
