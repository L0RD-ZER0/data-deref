import { resolve as resolvePath } from "path";
import { getTerminationTypes } from "./config";
import parseFile from "./file-parser";
import handleRef from "./handler";

async function derefRecursive(obj: any, fsPath: string, loaded: { [_: string]: any }) {
  console.log(loaded);
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

export async function deref(filePath: string) {
  const fsPath = resolvePath(filePath);
  const obj = await parseFile(fsPath);
  const loaded: { [_: string]: any } = {};
  loaded[fsPath] = obj;
  await derefRecursive(obj, fsPath, loaded);
  return obj;
}

export default deref;

export async function derefObject(obj: any) {
  const loaded: { [_: string]: any } = {};
  loaded[''] = obj;
  await derefRecursive(obj, '', loaded);
  return obj;
}
