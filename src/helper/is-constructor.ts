
// https://people.mozilla.org/~jorendorff/es6-draft.html#sec-isconstructor
export function isConstructor(x: any): boolean {
  return typeof x === "function";
}
