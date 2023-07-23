'use client'
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";


export function NavLink({ href, label, active }) {
  const isActive = active === href
    return <>
    <Link id={label} href={href} className={`group block relative rounded-lg p-2 ${isActive && "text-sky-400"} hover:text-sky-400`}>
      <span className={`hidden ${isActive && "md:block"} absolute bottom-1 inset-x-1 bg-sky-400 h-0.5 rounded-full`}></span>
      <div className=''>{label}</div>
      
    </Link></>
}

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const active = usePathname()
  return <>
    <nav className="bg-slate-900">
      <div className="flex flex-wrap justify-between items-center p-4">
        <Link href="/" className="flex items-center">
            <img src='/logo.svg' className="mr-4 h-10"></img>
            <span className="text-2xl font-">Bracket Maker</span>
        </Link>
        <button onClick={() => setOpen(a => !a)} className="flex items-center md:hidden px-3 h-10 rounded-lg focus:ring-2 focus:ring-slate-700 focus:ring-inset focus:bg-slate-800 hover:bg-slate-800">V</button>
        <div className={`${!open && "hidden"} w-full mt-4 md:m-0 md:block md:w-auto`}>
            <ul className="flex p-3 flex-col w-full rounded-lg text-m mr-5 bg-slate-800 space-y-2 md:p-0 md:flex-row md:space-x-8 md:space-y-0 md:bg-slate-900">
                <li>
                    <NavLink href="/" label="Home" active={active}></NavLink>
                </li>
                <li>
                    <NavLink href="/tournaments" label="Create" active={active}></NavLink>
                </li>
                <li>
                    <NavLink href="/API" label="API" active={active}></NavLink>
                </li>
            </ul>
        </div>
      </div>
    </nav>
  </>
}