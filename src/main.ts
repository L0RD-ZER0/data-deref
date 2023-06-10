import deref from "./dereferencer";

export * as config from "./config";
export { deref, derefObject } from "./dereferencer";
export { parseFile } from "./file-parser";
export { handleRef } from "./handler";
export default deref;
