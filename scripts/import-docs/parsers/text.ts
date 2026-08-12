import type { ImportWarning } from "../../../src/types/docs";

export interface RawEntry { name?: string; side?: string; declaration?: string; description?: string; parameters?: Array<{ name?: string; type?: string; description?: string }>; source?: { url?: string; title?: string } }
export function parseText(input: string, record = "text input"): { records: RawEntry[]; warnings: ImportWarning[] } {
  const lines = input.replace(/\r\n?/g, "\n").split("\n").map((line) => line.trim()).filter(Boolean);
  const warnings: ImportWarning[] = [];
  if (!lines.length) return { records: [], warnings: [{ code: "empty-input", message: "Input contains no documentation", record }] };
  const sideIndex = lines.findIndex((line) => /^(服务端|客户端|服务端和客户端|server|client|both)$/i.test(line));
  const descriptionHeading = lines.indexOf("描述"); const parameterHeading = lines.indexOf("参数");
  const declaration = lines.find((line) => /^(method|event|class|component|system|property) in /i.test(line));
  const raw: RawEntry = { name: lines[0], side: sideIndex >= 0 ? lines[sideIndex] : undefined, declaration, description: descriptionHeading >= 0 ? lines[descriptionHeading + 1] : undefined, parameters: [] };
  if (parameterHeading >= 0) {
    const values = lines.slice(parameterHeading + 1).filter((line) => !["参数名", "数据类型", "说明"].includes(line));
    for (let index = 0; index < values.length; index += 3) raw.parameters?.push({ name: values[index], type: values[index + 1], description: values[index + 2] });
    if (values.length % 3) warnings.push({ code: "partial-parameter", message: "Parameter table has an incomplete row", record });
  }
  if (sideIndex < 0) warnings.push({ code: "missing-side", message: "No side designation was found", record });
  return { records: [raw], warnings };
}
