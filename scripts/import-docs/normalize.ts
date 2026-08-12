import { createSlug } from "../../src/lib/slug";
import type { ApiEntry, ApiKind, ApiSide, ImportWarning } from "../../src/types/docs";
import type { RawEntry } from "./parsers/text";
const sides: Record<string, ApiSide> = { 服务端: "server", 客户端: "client", 服务端和客户端: "both", server: "server", client: "client", both: "both" };
export function normalizeRecord(raw: RawEntry, record: string): { entry?: ApiEntry; warnings: ImportWarning[] } {
  const warnings: ImportWarning[] = []; const name = raw.name?.trim();
  if (!name) return { warnings: [{ code: "missing-name", message: "Entry has no API name", record, field: "name" }] };
  const declaration = raw.declaration?.match(/^(method|event|class|component|system|property) in (.+)$/i);
  const kind: ApiKind = declaration ? declaration[1].toLowerCase() as ApiKind : "unknown"; const namespace = declaration?.[2];
  const side = sides[raw.side?.toLowerCase() ?? ""] ?? "unknown";
  if (side === "unknown") warnings.push({ code: "invalid-side", message: `Unknown side value: ${raw.side ?? "missing"}`, record, field: "side" });
  const slug = createSlug(name); const id = namespace ? `${namespace}.${name}` : name;
  return { entry: { id, name, slug, side, kind, namespace, description: raw.description ? { zh: raw.description } : {}, parameters: (raw.parameters ?? []).filter((parameter) => parameter.name).map((parameter) => ({ name: parameter.name!, type: parameter.type, description: parameter.description ? { zh: parameter.description } : undefined })), source: raw.source }, warnings };
}
