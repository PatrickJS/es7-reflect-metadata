import {createWeakMapPolyfill} from "../shim/weakmap";
const _WeakMap: any = typeof WeakMap === "function" ? WeakMap : createWeakMapPolyfill();
// TODO: fix the typescript types
// export const __Metadata__ = new _WeakMap<Object, Map<string | symbol, Map<any, any>>>();
export const __Metadata__ = new _WeakMap();
