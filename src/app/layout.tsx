import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/components/header";
export const metadata: Metadata = { title: { default: "NetDocs MC", template: "%s | NetDocs MC" }, description: "Unofficial community reference for the NetEase Minecraft ModAPI." };
const themeScript = `(function(){var t=localStorage.getItem('netdocs-theme');if(t==='dark'||(!t&&matchMedia('(prefers-color-scheme: dark)').matches))document.documentElement.classList.add('dark')})()`;
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) { return <html lang="en" suppressHydrationWarning><head><script dangerouslySetInnerHTML={{ __html: themeScript }} /></head><body><Header />{children}<footer className="border-t border-slate-200 px-4 py-8 text-center text-sm text-slate-500 dark:border-slate-800">NetDocs MC is an unofficial community project and is not affiliated with NetEase, Mojang, or Microsoft.</footer></body></html>; }
