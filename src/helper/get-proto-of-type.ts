const functionPrototype = Function.prototype;

export function getProtoOfType(O: any): any {
  let proto = Object.getPrototypeOf(O);
  if (typeof O !== "function" || O === functionPrototype) {
    return proto;
  }

  // TypeScript doesn't set __proto__ in ES5, as it's non-standard.
  // Try to determine the superclass constructor. Compatible implementations
  // must either set __proto__ on a subclass constructor to the superclass constructor,
  // or ensure each class has a valid `constructor` property on its prototype that
  // points back to the constructor.

  // If this is not the same as Function.[[Prototype]], then this is definately inherited.
  // This is the case when in ES6 or when using __proto__ in a compatible browser.
  if (proto !== functionPrototype) {
    return proto;
  }

  // If the super prototype is Object.prototype, null, or undefined, then we cannot determine the heritage.
  let prototype = O.prototype;
  let prototypeProto = prototype && Object.getPrototypeOf(prototype);
  if (prototypeProto == null || prototypeProto === Object.prototype) {
    return proto;
  }

  // if the constructor was not a function, then we cannot determine the heritage.
  let constructor = prototypeProto.constructor;
  if (typeof constructor !== "function") {
    return proto;
  }

  // if we have some kind of self-reference, then we cannot determine the heritage.
  if (constructor === O) {
    return proto;
  }

  // we have a pretty good guess at the heritage.
  return constructor;
}
