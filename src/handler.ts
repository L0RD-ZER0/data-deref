import { dirname, resolve as resolvePath } from "path";
import { parseFile } from "./file-parser";

async function extractRef(obj: any, ref: string | undefined) {
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
