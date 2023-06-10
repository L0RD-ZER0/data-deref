const TERMINATION_TYPES = new Set(['string', 'number', 'boolean', 'undefined', 'bigint', 'symbol', 'function']);
const IGNORED_ERRORS = new Set(['ENOENT', 'EISDIR', 'EACCES', 'EPERM']);
const fileParsers: { [_: string]: (fileContents: string) => any } = {
  '.json': JSON.parse,
  '*': String,
}

export function getIgnoredErrors() {
  return new Set(IGNORED_ERRORS.values());
}

export function addIgnoredError(error: string) {
  IGNORED_ERRORS.add(error);
}

export function removeIgnoredError(error: string) {
  IGNORED_ERRORS.delete(error);
}

export function getTerminationTypes() {
  return new Set(TERMINATION_TYPES.values());
}

export function addTerminationType(type: string) {
  TERMINATION_TYPES.add(type);
}

export function removeTerminationType(type: string) {
  TERMINATION_TYPES.delete(type);
}

export function getFileParsers() {
  return { ...fileParsers };
}

export function addFileParser(extension: string, parser: (fileContents: string) => any) {
  fileParsers[extension] = parser;
}

export function removeFileParser(extension: string) {
  delete fileParsers[extension];
}
