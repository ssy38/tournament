import "./globals.css";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
    title: "Bracket Maker",
    description: "Create interactive brackets",
};

export default function RootLayout({ children }) {
    return (
        <html lang="en" className="bg-slate-800">
            <body
                className={
                    "min-h-screen bg-slate-800 text-slate-200 font-medium tracking-tight " +
                    inter.className
                }
            >
                {children}
            </body>
        </html>
    );
}
