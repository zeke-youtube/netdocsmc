export type ApiSide = "client" | "server" | "both" | "unknown";
export type ApiKind = "method" | "event" | "class" | "component" | "system" | "property" | "unknown";
export interface LocalizedText { zh?: string; en?: string }
export interface ApiParameter { name: string; type?: string; description?: LocalizedText; required?: boolean }
export interface ApiReturn { type?: string; description?: LocalizedText }
export interface CodeExample { language: string; code: string; title?: LocalizedText }
export interface ApiEntry {
  id: string; name: string; slug: string; side: ApiSide; kind: ApiKind;
  category?: string; namespace?: string; description: LocalizedText;
  parameters: ApiParameter[]; returns?: ApiReturn; examples?: CodeExample[];
  notes?: LocalizedText[]; related?: string[]; source?: { url?: string; title?: string };
}

export interface ImportWarning { code: string; message: string; record?: string; field?: string }
export interface ImportResult { entries: ApiEntry[]; warnings: ImportWarning[] }
