import type { ApiEntry, ImportWarning } from "../../src/types/docs";
export function validateEntries(entries: ApiEntry[], requireSource = false): ImportWarning[] {
  const warnings: ImportWarning[] = []; const ids = new Set<string>(); const slugs = new Set<string>();
  entries.forEach((entry, index) => { const record = `${index}:${entry.name || "unnamed"}`;
    if (!entry.name) warnings.push({ code: "missing-name", message: "API name is required", record });
    if (ids.has(entry.id)) warnings.push({ code: "duplicate-id", message: `Duplicate ID: ${entry.id}`, record }); ids.add(entry.id);
    if (slugs.has(entry.slug)) warnings.push({ code: "duplicate-slug", message: `Duplicate slug: ${entry.slug}`, record }); slugs.add(entry.slug);
    if (!Array.isArray(entry.parameters)) warnings.push({ code: "malformed-parameters", message: "Parameters must be an array", record });
    if (!(["client", "server", "both", "unknown"] as string[]).includes(entry.side)) warnings.push({ code: "invalid-side", message: `Invalid side: ${String(entry.side)}`, record });
    if (requireSource && !entry.source?.url && !entry.source?.title) warnings.push({ code: "missing-source", message: "Source attribution is required", record });
  }); return warnings;
}
