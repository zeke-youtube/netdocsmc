import entriesJson from "../../docs-data/api.json";
import type { ApiEntry } from "@/types/docs";

export const apiEntries = entriesJson as ApiEntry[];
export function getApiBySlug(slug: string): ApiEntry | undefined { return apiEntries.find((entry) => entry.slug === slug); }
export function getCategories(): Array<{ name: string; entries: ApiEntry[] }> {
  const groups = new Map<string, ApiEntry[]>();
  for (const entry of apiEntries) groups.set(entry.category ?? "Uncategorized", [...(groups.get(entry.category ?? "Uncategorized") ?? []), entry]);
  return [...groups].sort(([a], [b]) => a.localeCompare(b)).map(([name, entries]) => ({ name, entries: entries.sort((a, b) => a.name.localeCompare(b.name)) }));
}
