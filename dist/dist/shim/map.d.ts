export declare const cacheSentinel: any;
export declare class Map<K, V> {
    private _keys;
    private _values;
    private _cache;
    constructor();
    length: number;
    size: number;
    has(key: K): boolean;
    get(key: K): V | void;
    set(key: K, value: V): this;
    delete(key: any): boolean;
    clear(): void;
    forEach(callback: (value: V, key: K, map: Map<K, V>) => void, thisArg?: any): void;
    private _find(key);
}
export declare function createMapPolyfill(): typeof Map;
