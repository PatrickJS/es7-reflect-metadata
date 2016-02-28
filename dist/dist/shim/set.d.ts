export declare var cacheSentinel: any;
export declare class Set<K, V> {
    private _map;
    constructor();
    length: number;
    size: number;
    has(value: V): boolean;
    add(value: V): this;
    delete(value: V): boolean;
    clear(): void;
    forEach(callback: (value: V, key: K, map: Map<K, V>) => void, thisArg: any): void;
}
export declare function createSetPolyfill(): typeof Set;
