import { parseText, type RawEntry } from "./text";
import type { ImportWarning } from "../../../src/types/docs";
export function parseHtml(input: string, record = "HTML input"): { records: RawEntry[]; warnings: ImportWarning[] } {
  const text = input.replace(/<\s*br\s*\/?>/gi, "\n").replace(/<\/(p|div|h[1-6]|tr|li)>/gi, "\n").replace(/<[^>]+>/g, " ").replace(/&nbsp;/g, " ").replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&amp;/g, "&");
  return parseText(text, record);
}
