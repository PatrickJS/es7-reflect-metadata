import {ordinaryOwnMetadataKeys} from "./ordinary-own-metadata-keys";
import {getProtoOfType} from "./get-proto-of-type";
import {createSetPolyfill} from "../shim/set";

const _Set: any = typeof Set === "function" ? Set : createSetPolyfill();
// https://github.com/jonathandturner/decorators/blob/master/specs/metadata.md#ordinarymetadatakeys--o-p-
export function ordinaryMetadataKeys(O: Object, P: string | symbol): any[] {
  let ownKeys = ordinaryOwnMetadataKeys(O, P);
  let parent = getProtoOfType(O);
  if (parent === null) {
    return ownKeys;
  }

  let parentKeys = ordinaryMetadataKeys(parent, P);
  if (parentKeys.length <= 0) {
    return ownKeys;
  }
  if (ownKeys.length <= 0) {
    return parentKeys;
  }

  let set = new _Set();
  let keys: any[] = [];

  for (let key of ownKeys) {
    let hasKey = set.has(key);
    if (!hasKey) {
      set.add(key);
      keys.push(key);
    }
  }

  for (let key of parentKeys) {
    let hasKey = set.has(key);
    if (!hasKey) {
      set.add(key);
      keys.push(key);
    }
  }

  return keys;
}
