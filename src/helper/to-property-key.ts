import {isSymbol} from "./is-symbol";
// https://people.mozilla.org/~jorendorff/es6-draft.html#sec-topropertykey
export function toPropertyKey(value: any): string | symbol {
  if (isSymbol(value)) {
    return <symbol>value;
  }
  return String(value);
}
