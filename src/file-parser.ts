import * as fs from "fs/promises";
import { extname } from "path";
import { getFileParsers, getIgnoredErrors } from "./config";

/**
 * Parse a file based on the parser registered for its extension.
 * @param filePath The path to the file to parse.
 */
export async function parseFile(filePath: string) {
  const fileParsers = getFileParsers();
  let fileContents;
  try {
    fileContents = await fs.readFile(filePath, 'utf8');
  } catch (err: any) {
    if (getIgnoredErrors().has(err.code)) {
      return null;
    }
    throw err;
  }
  if (extname(filePath) in fileParsers) {
    fileContents = fileParsers[extname(filePath)](fileContents);
  } else {
    fileContents = fileParsers['*'](fileContents);
  }
  return fileContents;
}

export default parseFile;
