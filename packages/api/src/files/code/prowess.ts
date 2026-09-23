import type { CodeOutputArtifactFile } from './preflight';

export interface ProwessCodeOutput {
  readonly toolCallId: string;
  readonly files: readonly CodeOutputArtifactFile[];
}

function record(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value != null && !Array.isArray(value);
}

export function getProwessCodeOutput(value: unknown): ProwessCodeOutput | null {
  if (!record(value) || typeof value.id !== 'string' || !Array.isArray(value.prowess_files)) {
    return null;
  }
  const files: CodeOutputArtifactFile[] = [];
  for (const file of value.prowess_files.slice(0, 10)) {
    if (
      !record(file) ||
      typeof file.id !== 'string' ||
      typeof file.name !== 'string' ||
      typeof file.storage_session_id !== 'string'
    ) {
      return null;
    }
    files.push({ id: file.id, name: file.name, storage_session_id: file.storage_session_id });
  }
  return files.length === 0 ? null : { toolCallId: value.id, files };
}
