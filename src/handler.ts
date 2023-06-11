import { dirname, resolve as resolvePath } from "path";
import { parseFile } from "./file-parser";

/**
 * Extract a reference from an object.
 * @param obj Object to extract the reference from.
 * @param ref Reference to extract (``/`` separated).
 */
export async function extractRef(obj: any, ref: string | undefined) {
  if (!ref) {
    return obj;
  }
  const pathParts = ref.split('/');
  let refObj = obj;
  for (const pathPart of pathParts) {
    if (pathPart === '#' || pathPart === '') {
      continue;
    }
    refObj = refObj[pathPart];
    if (refObj === undefined) {
      return null;
    }
  }
  return refObj;
}

/**
 * Handler to handle a reference.
 * @param $ref Reference to be handled.
 * @param fsPath Path to the file containing the reference.
 * @param loaded Object containing all loaded files.
 */
export async function handleRef($ref: string, fsPath: string, loaded: { [_: string]: any }) {
  const [path, ref] = $ref.split('#');
  if (path === '') {
    return extractRef(loaded[fsPath], ref);
  }
  const resolvedPath = resolvePath(dirname(fsPath), path);
  if (loaded[resolvedPath] === undefined) {
    loaded[resolvedPath] = await parseFile(resolvedPath);
  }
  if (loaded[resolvedPath] === null) {
    return null;
  }
  return extractRef(loaded[resolvedPath], ref);
}

export default handleRef;
