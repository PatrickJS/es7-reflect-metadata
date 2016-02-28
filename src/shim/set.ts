// naive Set shim
import {createMapPolyfill} from "./map";
// var _Map: MapConstructor = (typeof Map !== "undefined") ? createMapPolyfill() : Map;

export var cacheSentinel: any = {};

export class Set<K, V> {
  private _map = new Map();

  constructor() {}

  get length(): number {
    return 0;
  }
  get size() {
    return this._map.size;
  }

  has(value: V): boolean {
    return this._map.has(value);
  }

  add(value: V): this {
    this._map.set(value, value);
    return this;
  }

  delete(value: V): boolean {
    return this._map.delete(value);
  }

  clear() {
    this._map.clear();
  }

  forEach(callback: (value: V, key: K, map: Map<K, V>) => void, thisArg: any): void {
    this._map.forEach(callback, thisArg);
  }

}

export function createSetPolyfill(): typeof Set {
  return Set;
}
