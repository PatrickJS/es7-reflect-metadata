
// https://people.mozilla.org/~jorendorff/es6-draft.html#sec-object-type
export function isObject(x: any): boolean {
  return typeof x === "object" ? x !== null : typeof x === "function";
}
