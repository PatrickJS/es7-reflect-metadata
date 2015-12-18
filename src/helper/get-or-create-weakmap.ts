import {hasOwn} from "./has-own";

export function getOrCreateWeakMapTable(rootKey: string, target: any, create?: any): any {
  if (!hasOwn.call(target, rootKey)) {
    if (!create) {
      return undefined;
    }

    Object.defineProperty(target, rootKey, {
      value: Object.create(null)
    });
  }
  return target[rootKey];
}
