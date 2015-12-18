import {__Metadata__} from "./metadata";
import {createMapPolyfill, Map as Map_} from "../shim/map";

const _Map: any = typeof Map === "function" ? Map : createMapPolyfill();
// https://github.com/jonathandturner/decorators/blob/master/specs/metadata.md#getorcreatemetadatamap--o-p-create-
export function getOrCreateMetadataMap(target: Object, targetKey: string | symbol, create: boolean): Map<any, any> {
  let targetMetadata = __Metadata__.get(target);
  if (!targetMetadata) {
    if (!create) {
      return undefined;
    }
    // TODO: fix the typescript types
    // targetMetadata = new _Map<string | symbol, _Map<any, any>>();
    targetMetadata = new _Map();
    __Metadata__.set(target, targetMetadata);
  }

  let keyMetadata = targetMetadata.get(targetKey);
  if (!keyMetadata) {
    if (!create) {
      return undefined;
    }
    // TODO: fix the typescript types
    // keyMetadata = new _Map<any, any>();
    keyMetadata = new _Map();
    targetMetadata.set(targetKey, keyMetadata);
  }

  return keyMetadata;
}
