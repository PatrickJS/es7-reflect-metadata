export declare const rootKey: any;
export declare class WeakMap<T, V> {
    private _key;
    constructor();
    length: number;
    has(target: T): boolean;
    get(target: T): any;
    set(target: T, value: V): this;
    delete(target: T): boolean;
    clear(): void;
}
export declare function createWeakMapPolyfill(): typeof WeakMap;
