import type { ApiEntry } from "@/types/docs";

export interface SearchResult { entry: ApiEntry; score: number }
const normalize = (value: string): string => value.toLocaleLowerCase().trim();
export function searchEntries(entries: ApiEntry[], rawQuery: string, limit = 20): SearchResult[] {
  const query = normalize(rawQuery);
  if (!query) return [];
  return entries.map((entry) => ({ entry, score: scoreEntry(entry, query) })).filter(({ score }) => score > 0)
    .sort((a, b) => b.score - a.score || a.entry.name.localeCompare(b.entry.name)).slice(0, limit);
}
function scoreEntry(entry: ApiEntry, query: string): number {
  const name = normalize(entry.name);
  if (name === query) return 1000;
  if (name.startsWith(query)) return 800;
  if (name.includes(query)) return 600;
  if (normalize(entry.namespace ?? "").includes(query)) return 400;
  if (normalize(entry.category ?? "").includes(query)) return 300;
  if ([entry.description.en, entry.description.zh].some((text) => normalize(text ?? "").includes(query))) return 200;
  if (entry.parameters.some((parameter) => normalize(parameter.name).includes(query))) return 100;
  if (entry.related?.some((term) => normalize(term).includes(query))) return 75;
  return 0;
}
