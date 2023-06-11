/**
 * A simple dereferencer for ``$ref`` pointers in data documents.
 *
 * Resolves a JSON or YAML file and replaces all ``$ref`` pointers with the
 * referenced data.
 * i.e.
 * ```{ "$ref": "path#to/ref" }```  -> ```"Data at reference location"```
 */

import deref from "./dereferencer";

export * as config from "./config";
export { deref, derefObject } from "./dereferencer";
export { parseFile } from "./file-parser";
export { handleRef } from "./handler";
export default deref;
