import {getOrCreateMetadataMap} from "./get-or-create-metadata-map";
// https://github.com/jonathandturner/decorators/blob/master/specs/metadata.md#ordinaryownmetadatakeys--o-p-
export function ordinaryOwnMetadataKeys(target: Object, targetKey: string | symbol): any[] {
  let metadataMap = getOrCreateMetadataMap(target, targetKey, /*create*/ false);
  let keys: any[] = [];
  if (metadataMap) {
    metadataMap.forEach((_, key) => keys.push(key));
  }

  return keys;
}

