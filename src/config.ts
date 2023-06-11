const TERMINATION_TYPES = new Set(['string', 'number', 'boolean', 'undefined', 'bigint', 'symbol', 'function']);
const IGNORED_ERRORS = new Set(['ENOENT', 'EISDIR', 'EACCES', 'EPERM']);
const fileParsers: { [_: string]: (fileContents: string) => any } = {
  '.json': JSON.parse,
  '*': String,
}

/**
 * Get error codes for errors that would be prevented from being thrown.
 * @returns A set of error codes.
 */
export function getIgnoredErrors() {
  return new Set(IGNORED_ERRORS.values());
}

/**
 * Add an error code to the set of errors that would be prevented from being thrown.
 * @param error The error code to add.
 */
export function addIgnoredError(error: string) {
  IGNORED_ERRORS.add(error);
}

/**
 * Remove an error code from the set of errors that would be prevented from being thrown.
 * @param error The error code to remove.
 */
export function removeIgnoredError(error: string) {
  IGNORED_ERRORS.delete(error);
}

/**
 * Get the set of types that would be prevented from being dereferenced.
 * @returns A set of types.
 */
export function getTerminationTypes() {
  return new Set(TERMINATION_TYPES.values());
}

/**
 * Add a type to the set of types that would be prevented from being dereferenced.
 * @param type The type to add.
 */
export function addTerminationType(type: string) {
  TERMINATION_TYPES.add(type);
}

/**
 * Remove a type from the set of types that would be prevented from being dereferenced.
 * @param type The type to remove.
 */
export function removeTerminationType(type: string) {
  TERMINATION_TYPES.delete(type);
}

/**
 * Get an object containing all registered file parsers.
 * @returns The object containing all registered file parsers.
 */
export function getFileParsers() {
  return { ...fileParsers };
}

/**
 * Add a file parser to the set of file parsers.
 * @param extension The extension of the file type to parse.
 * @param parser The parser function.
 */
export function addFileParser(extension: string, parser: (fileContents: string) => any) {
  fileParsers[extension] = parser;
}

/**
 * Remove a file parser from the set of file parsers.
 * @param extension The extension of the file type to remove.
 */
export function removeFileParser(extension: string) {
  delete fileParsers[extension];
}
