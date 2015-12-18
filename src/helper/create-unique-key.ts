import {WEAKMAP_PREFIX} from "./helper-constants";
import {hasOwn} from "./has-own";
import {createUUID} from "./create-uuid";

export const keys: any = {};


export function createUniqueKey() {
  var key: any;
  do {
    key = WEAKMAP_PREFIX + createUUID();
  } while (hasOwn.call(keys, key));

  keys[key] = true;

  return key;
}
