"use client";
import { useState } from "react";
import Link from "next/link";
import { searchEntries } from "./search";
import type { ApiEntry } from "@/types/docs";
export function SearchBox({ entries }: { entries: ApiEntry[] }) {
  const [query, setQuery] = useState(""); const results = searchEntries(entries, query, 8);
  return <div className="relative max-w-2xl"><label htmlFor="docs-search" className="sr-only">Search API documentation</label><input id="docs-search" type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search API names, namespaces, descriptions…" className="w-full rounded-md border border-slate-300 bg-white px-4 py-3 dark:border-slate-700 dark:bg-slate-900" />{query && <div className="absolute z-10 mt-1 w-full rounded-md border border-slate-200 bg-white shadow-lg dark:border-slate-700 dark:bg-slate-900">{results.length ? <ul>{results.map(({ entry }) => <li key={entry.id}><Link href={`/api/${entry.slug}`} className="block px-4 py-3 no-underline hover:bg-slate-50 dark:hover:bg-slate-800"><strong>{entry.name}</strong><span className="ml-2 text-sm text-slate-500">{entry.namespace}</span></Link></li>)}</ul> : <p className="px-4 py-3 text-sm text-slate-500">No matching API entries.</p>}</div>}</div>;
}
