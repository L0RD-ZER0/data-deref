import { resolve as resolvePath } from "path";
import { getTerminationTypes } from "./config";
import parseFile from "./file-parser";
import handleRef, { extractRef } from "./handler";

/**
 * Recursively dereference all references in an object.
 * @param obj Object to be dereferenced.
 * @param fsPath Path on the file-system to the file containing the object.
 * @param loaded Object containing all loaded files.
 */
async function derefRecursive(obj: any, fsPath: string, loaded: { [_: string]: any }) {
  const TERMINATION_TYPES = getTerminationTypes();
  for (const key in obj) {
    if (TERMINATION_TYPES.has(typeof obj[key])) {
      continue;
    }
    if (obj[key].hasOwnProperty('$ref')) {
      const refObj = await handleRef(obj[key]['$ref'], fsPath, loaded);
      if (refObj !== null) {
        obj[key] = refObj;
      }
    }
    await derefRecursive(obj[key], fsPath, loaded);
  }
}

/**
 * Dereference all references in a file.
 * @param filePath Path to the file to be dereferenced.
 */
export async function deref(filePath: string) {
  const [path, ref] = filePath.split('#');
  const fsPath = resolvePath(path);
  const obj = await parseFile(fsPath);
  const loaded: { [_: string]: any } = {};
  loaded[fsPath] = obj;
  await derefRecursive(obj, fsPath, loaded);
  return extractRef(obj, ref);
}

export default deref;

/**
 * Dereference all references in an object.
 * @param obj Object to be dereferenced.
 */
export async function derefObject(obj: any) {
  const loaded: { [_: string]: any } = {};
  loaded[''] = obj;
  await derefRecursive(obj, '', loaded);
  return obj;
}
