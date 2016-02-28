import {createUniqueKey} from "../helper/create-unique-key";
import {getOrCreateWeakMapTable} from "../helper/get-or-create-weakmap";


export const rootKey = createUniqueKey();


export class WeakMap<T, V> {
  private _key = createUniqueKey();
  constructor() {}

  get length(): number {
    return 0;
  }

  has(target: T) {
    var table = getOrCreateWeakMapTable(rootKey, target, /*create*/ false);
    if (table) {
      return this._key in table;
    }
    return false;
  }

  get(target: T) {
    var table = getOrCreateWeakMapTable(rootKey, target, /*create*/ false);
    if (table) {
      return table[this._key];
    }
    return undefined;
  }

  set(target: T, value: V) {
    var table = getOrCreateWeakMapTable(rootKey, target, /*create*/ true);
    table[this._key] = value;
    return this;
  }

  delete(target: T) {
    var table = getOrCreateWeakMapTable(rootKey, target, /*create*/ false);
    if (table && this._key in table) {
        return delete table[this._key];
    }
    return false;
  }

  clear() {
    // NOTE: not a real clear, just makes the previous data unreachable
    this._key = createUniqueKey();
  }

}


export function createWeakMapPolyfill(): typeof WeakMap {
  return WeakMap;
}
