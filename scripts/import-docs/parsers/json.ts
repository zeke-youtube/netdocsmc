import type { ImportWarning } from "../../../src/types/docs";
import type { RawEntry } from "./text";
export function parseJson(input: string, record = "JSON input"): { records: RawEntry[]; warnings: ImportWarning[] } {
  try { const parsed: unknown = JSON.parse(input); if (Array.isArray(parsed)) return { records: parsed as RawEntry[], warnings: [] }; if (parsed && typeof parsed === "object") return { records: [parsed as RawEntry], warnings: [] }; return { records: [], warnings: [{ code: "invalid-json-shape", message: "Expected an object or array", record }] }; }
  catch (error) { return { records: [], warnings: [{ code: "invalid-json", message: error instanceof Error ? error.message : "JSON parsing failed", record }] }; }
}
