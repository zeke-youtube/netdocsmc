import Link from "next/link";
import { ThemeToggle } from "./theme-toggle";
export function Header() { return <header className="border-b border-slate-200 dark:border-slate-800"><div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-4"><Link href="/" className="font-semibold no-underline">NetDocs MC</Link><div className="flex items-center gap-4"><Link href="/api/get-container-item" className="text-sm">API reference</Link><ThemeToggle /></div></div></header>; }
