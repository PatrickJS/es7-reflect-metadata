// https://people.mozilla.org/~jorendorff/es6-draft.html#sec-ecmascript-language-types-symbol-type
export function isSymbol(x: any): boolean {
  return typeof x === "symbol";
}
