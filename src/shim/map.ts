// naive Map shim
export const cacheSentinel: any = {};

export class Map<K, V> {
  private _keys: Array<K> = [];
  private _values: Array<V> = [];
  private _cache: any = cacheSentinel;

  constructor() {}

  get length(): number {
    return 0;
  }
  get size(): number {
    return this._keys.length;
  }

  has(key: K): boolean {
    if (key === this._cache) {
      return true;
    }

    if (this._find(key) >= 0) {
      this._cache = key;
      return true;
    }

    return false;
  }

  get(key: K): V | void {
    let index = this._find(key);

    if (index >= 0) {
      this._cache = key;
      return this._values[index];
    }

    return undefined;
  }

  set(key: K, value: V): this {
    this.delete(key);
    this._keys.push(key);
    this._values.push(value);
    this._cache = key;
    return this;
  }

  delete(key: any): boolean {
    let index = this._find(key);
    if (index >= 0) {
      this._keys.splice(index, 1);
      this._values.splice(index, 1);
      this._cache = cacheSentinel;
      return true;
    }
    return false;
  }

  clear(): void {
    this._keys.length = 0;
    this._values.length = 0;
    this._cache = cacheSentinel;
  }

  forEach(callback: (value: V, key: K, map: Map<K, V>) => void, thisArg?: any): void {
    let size = this.size;
    for (let i = 0; i < size; ++i) {
      let key = this._keys[i];
      let value = this._values[i];
      this._cache = key;
      callback.call(this, value, key, this);
    }
  }

  private _find(key: K): number {
    const keys = this._keys;
    const size = keys.length;
    for (let i = 0; i < size; ++i) {
      if (keys[i] === key) {
        return i;
      }
    }
    return -1;
  }
}

export function createMapPolyfill(): typeof Map {
  return Map;
}
