import * as fs from "fs/promises";
import { extname } from "path";
import { getFileParsers, getIgnoredErrors } from "./config";

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
