"use client";
import { useState } from "react";

export function CopyButton({ value, label = "Copy" }: { value: string; label?: string }) {
  const [copied, setCopied] = useState(false);
  async function copy() { await navigator.clipboard.writeText(value); setCopied(true); window.setTimeout(() => setCopied(false), 1500); }
  return <button type="button" onClick={copy} className="rounded border border-slate-300 px-2 py-1 text-xs dark:border-slate-700" aria-label={`${label}: ${value}`}>{copied ? "Copied" : label}</button>;
}
