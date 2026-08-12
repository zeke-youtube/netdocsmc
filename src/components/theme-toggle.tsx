"use client";
import { useEffect, useState } from "react";

type Theme = "light" | "dark";
export function ThemeToggle() {
  const [theme, setTheme] = useState<Theme | null>(null);
  useEffect(() => setTheme(document.documentElement.classList.contains("dark") ? "dark" : "light"), []);
  function toggle() {
    const next = theme === "dark" ? "light" : "dark";
    document.documentElement.classList.toggle("dark", next === "dark");
    localStorage.setItem("netdocs-theme", next); setTheme(next);
  }
  return <button type="button" onClick={toggle} className="rounded border border-slate-300 px-3 py-1.5 text-sm dark:border-slate-700" aria-label={`Use ${theme === "dark" ? "light" : "dark"} theme`}>{theme === "dark" ? "Light" : "Dark"}</button>;
}
