exports["Reflect"] =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	function __export(m) {
	    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
	}
	var Reflect = __webpack_require__(1);
	global.Reflect = Reflect;
	__export(__webpack_require__(1));


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var get_proto_of_type_1 = __webpack_require__(2);
	var to_property_key_1 = __webpack_require__(3);
	var is_constructor_1 = __webpack_require__(5);
	var is_undefined_1 = __webpack_require__(6);
	var is_array_1 = __webpack_require__(7);
	var is_object_1 = __webpack_require__(8);
	var metadata_1 = __webpack_require__(9);
	var ordinary_own_metadata_keys_1 = __webpack_require__(18);
	var get_or_create_metadata_map_1 = __webpack_require__(19);
	var ordinary_metadata_keys_1 = __webpack_require__(21);
	/**
	 * Applies a set of decorators to a property of a target object.
	 * @param decorators An array of decorators.
	 * @param target The target object.
	 * @param targetKey (Optional) The property key to decorate.
	 * @param targetDescriptor (Optional) The property descriptor for the target key
	 * @remarks Decorators are applied in reverse order.
	 * @example
	 *
	 *     class C {
	 *         // property declarations are not part of ES6, though they are valid in TypeScript:
	 *         // static staticProperty;
	 *         // property;
	 *
	 *         constructor(p) { }
	 *         static staticMethod(p) { }
	 *         method(p) { }
	 *     }
	 *
	 *     // constructor
	 *     C = Reflect.decorate(decoratorsArray, C);
	 *
	 *     // property (on constructor)
	 *     Reflect.decorate(decoratorsArray, C, "staticProperty");
	 *
	 *     // property (on prototype)
	 *     Reflect.decorate(decoratorsArray, C.prototype, "property");
	 *
	 *     // method (on constructor)
	 *     Object.defineProperty(C, "staticMethod",
	 *         Reflect.decorate(decoratorsArray, C, "staticMethod",
	 *             Object.getOwnPropertyDescriptor(C, "staticMethod")));
	 *
	 *     // method (on prototype)
	 *     Object.defineProperty(C.prototype, "method",
	 *         Reflect.decorate(decoratorsArray, C.prototype, "method",
	 *             Object.getOwnPropertyDescriptor(C.prototype, "method")));
	 *
	 */
	function decorate(decorators, target, targetKey, targetDescriptor) {
	    if (!is_undefined_1.isUndefined(targetDescriptor)) {
	        if (!is_array_1.isArray(decorators)) {
	            throw new TypeError('decorators ' + decorators + ' is not an array of decorators');
	        }
	        else if (!is_object_1.isObject(target)) {
	            throw new TypeError('target ' + target + ' is not an object');
	        }
	        else if (is_undefined_1.isUndefined(targetKey)) {
	            throw new TypeError('target key ' + targetKey + 'is undefined');
	        }
	        else if (!is_object_1.isObject(targetDescriptor)) {
	            throw new TypeError('targetDescriptor ' + targetDescriptor + ' is not an object');
	        }
	        targetKey = to_property_key_1.toPropertyKey(targetKey);
	        return DecoratePropertyWithDescriptor(decorators, target, targetKey, targetDescriptor);
	    }
	    else if (!is_undefined_1.isUndefined(targetKey)) {
	        if (!is_array_1.isArray(decorators)) {
	            throw new TypeError('decorators ' + decorators + ' is not an array of decorators');
	        }
	        else if (!is_object_1.isObject(target)) {
	            throw new TypeError('target ' + target + ' is not an object');
	        }
	        targetKey = to_property_key_1.toPropertyKey(targetKey);
	        return DecoratePropertyWithoutDescriptor(decorators, target, targetKey);
	    }
	    else {
	        if (!is_array_1.isArray(decorators)) {
	            throw new TypeError('decorators ' + decorators + ' is not an array of decorators');
	        }
	        else if (!is_constructor_1.isConstructor(target)) {
	            throw new TypeError('target ' + target + ' is not a constructor');
	        }
	        return DecorateConstructor(decorators, target);
	    }
	}
	exports.decorate = decorate;
	/**
	 * A default metadata decorator factory that can be used on a class, class member, or parameter.
	 * @param metadataKey The key for the metadata entry.
	 * @param metadataValue The value for the metadata entry.
	 * @returns A decorator function.
	 * @remarks
	 * If `metadataKey` is already defined for the target and target key, the
	 * metadataValue for that key will be overwritten.
	 * @example
	 *
	 *     // constructor
	 *     @Reflect.metadata(key, value)
	 *     class C {
	 *     }
	 *
	 *     // property (on constructor, TypeScript only)
	 *     class C {
	 *         @Reflect.metadata(key, value)
	 *         static staticProperty;
	 *     }
	 *
	 *     // property (on prototype, TypeScript only)
	 *     class C {
	 *         @Reflect.metadata(key, value)
	 *         property;
	 *     }
	 *
	 *     // method (on constructor)
	 *     class C {
	 *         @Reflect.metadata(key, value)
	 *         static staticMethod() { }
	 *     }
	 *
	 *     // method (on prototype)
	 *     class C {
	 *         @Reflect.metadata(key, value)
	 *         method() { }
	 *     }
	 *
	 */
	function metadata(metadataKey, metadataValue) {
	    function decorator(target, targetKey) {
	        if (!is_undefined_1.isUndefined(targetKey)) {
	            if (!is_object_1.isObject(target)) {
	                throw new TypeError('target ' + target + ' is not an object');
	            }
	            targetKey = to_property_key_1.toPropertyKey(targetKey);
	            OrdinaryDefineOwnMetadata(metadataKey, metadataValue, target, targetKey);
	        }
	        else {
	            if (!is_constructor_1.isConstructor(target)) {
	                throw new TypeError('target ' + target + ' is not a constructor');
	            }
	            OrdinaryDefineOwnMetadata(metadataKey, metadataValue, target, /*targetKey*/ undefined);
	        }
	    }
	    return decorator;
	}
	exports.metadata = metadata;
	/**
	 * Define a unique metadata entry on the target.
	 * @param metadataKey A key used to store and retrieve metadata.
	 * @param metadataValue A value that contains attached metadata.
	 * @param target The target object on which to define metadata.
	 * @param targetKey (Optional) The property key for the target.
	 * @example
	 *
	 *     class C {
	 *         // property declarations are not part of ES6, though they are valid in TypeScript:
	 *         // static staticProperty;
	 *         // property;
	 *
	 *         constructor(p) { }
	 *         static staticMethod(p) { }
	 *         method(p) { }
	 *     }
	 *
	 *     // constructor
	 *     Reflect.defineMetadata("custom:annotation", options, C);
	 *
	 *     // property (on constructor)
	 *     Reflect.defineMetadata("custom:annotation", options, C, "staticProperty");
	 *
	 *     // property (on prototype)
	 *     Reflect.defineMetadata("custom:annotation", options, C.prototype, "property");
	 *
	 *     // method (on constructor)
	 *     Reflect.defineMetadata("custom:annotation", options, C, "staticMethod");
	 *
	 *     // method (on prototype)
	 *     Reflect.defineMetadata("custom:annotation", options, C.prototype, "method");
	 *
	 *     // decorator factory as metadata-producing annotation.
	 *     function MyAnnotation(options): Decorator {
	 *         return (target, key?) => Reflect.defineMetadata("custom:annotation", options, target, key);
	 *     }
	 *
	 */
	function defineMetadata(metadataKey, metadataValue, target, targetKey) {
	    if (!is_object_1.isObject(target)) {
	        throw new TypeError('target ' + target + ' is not an object');
	    }
	    else if (!is_undefined_1.isUndefined(targetKey)) {
	        targetKey = to_property_key_1.toPropertyKey(targetKey);
	    }
	    return OrdinaryDefineOwnMetadata(metadataKey, metadataValue, target, targetKey);
	}
	exports.defineMetadata = defineMetadata;
	/**
	 * Gets a value indicating whether the target object or its prototype chain has the provided metadata key defined.
	 * @param metadataKey A key used to store and retrieve metadata.
	 * @param target The target object on which the metadata is defined.
	 * @param targetKey (Optional) The property key for the target.
	 * @returns `true` if the metadata key was defined on the target object or its prototype chain; otherwise, `false`.
	 * @example
	 *
	 *     class C {
	 *         // property declarations are not part of ES6, though they are valid in TypeScript:
	 *         // static staticProperty;
	 *         // property;
	 *
	 *         constructor(p) { }
	 *         static staticMethod(p) { }
	 *         method(p) { }
	 *     }
	 *
	 *     // constructor
	 *     result = Reflect.hasMetadata("custom:annotation", C);
	 *
	 *     // property (on constructor)
	 *     result = Reflect.hasMetadata("custom:annotation", C, "staticProperty");
	 *
	 *     // property (on prototype)
	 *     result = Reflect.hasMetadata("custom:annotation", C.prototype, "property");
	 *
	 *     // method (on constructor)
	 *     result = Reflect.hasMetadata("custom:annotation", C, "staticMethod");
	 *
	 *     // method (on prototype)
	 *     result = Reflect.hasMetadata("custom:annotation", C.prototype, "method");
	 *
	 */
	function hasMetadata(metadataKey, target, targetKey) {
	    if (!is_object_1.isObject(target)) {
	        throw new TypeError('target ' + target + ' is not an object');
	    }
	    else if (!is_undefined_1.isUndefined(targetKey)) {
	        targetKey = to_property_key_1.toPropertyKey(targetKey);
	    }
	    return OrdinaryHasMetadata(metadataKey, target, targetKey);
	}
	exports.hasMetadata = hasMetadata;
	/**
	 * Gets a value indicating whether the target object has the provided metadata key defined.
	 * @param metadataKey A key used to store and retrieve metadata.
	 * @param target The target object on which the metadata is defined.
	 * @param targetKey (Optional) The property key for the target.
	 * @returns `true` if the metadata key was defined on the target object; otherwise, `false`.
	 * @example
	 *
	 *     class C {
	 *         // property declarations are not part of ES6, though they are valid in TypeScript:
	 *         // static staticProperty;
	 *         // property;
	 *
	 *         constructor(p) { }
	 *         static staticMethod(p) { }
	 *         method(p) { }
	 *     }
	 *
	 *     // constructor
	 *     result = Reflect.hasOwnMetadata("custom:annotation", C);
	 *
	 *     // property (on constructor)
	 *     result = Reflect.hasOwnMetadata("custom:annotation", C, "staticProperty");
	 *
	 *     // property (on prototype)
	 *     result = Reflect.hasOwnMetadata("custom:annotation", C.prototype, "property");
	 *
	 *     // method (on constructor)
	 *     result = Reflect.hasOwnMetadata("custom:annotation", C, "staticMethod");
	 *
	 *     // method (on prototype)
	 *     result = Reflect.hasOwnMetadata("custom:annotation", C.prototype, "method");
	 *
	 */
	function hasOwnMetadata(metadataKey, target, targetKey) {
	    if (!is_object_1.isObject(target)) {
	        throw new TypeError('target ' + target + ' is not an object');
	    }
	    else if (!is_undefined_1.isUndefined(targetKey)) {
	        targetKey = to_property_key_1.toPropertyKey(targetKey);
	    }
	    return OrdinaryHasOwnMetadata(metadataKey, target, targetKey);
	}
	exports.hasOwnMetadata = hasOwnMetadata;
	/**
	 * Gets the metadata value for the provided metadata key on the target object or its prototype chain.
	 * @param metadataKey A key used to store and retrieve metadata.
	 * @param target The target object on which the metadata is defined.
	 * @param targetKey (Optional) The property key for the target.
	 * @returns The metadata value for the metadata key if found; otherwise, `undefined`.
	 * @example
	 *
	 *     class C {
	 *         // property declarations are not part of ES6, though they are valid in TypeScript:
	 *         // static staticProperty;
	 *         // property;
	 *
	 *         constructor(p) { }
	 *         static staticMethod(p) { }
	 *         method(p) { }
	 *     }
	 *
	 *     // constructor
	 *     result = Reflect.getMetadata("custom:annotation", C);
	 *
	 *     // property (on constructor)
	 *     result = Reflect.getMetadata("custom:annotation", C, "staticProperty");
	 *
	 *     // property (on prototype)
	 *     result = Reflect.getMetadata("custom:annotation", C.prototype, "property");
	 *
	 *     // method (on constructor)
	 *     result = Reflect.getMetadata("custom:annotation", C, "staticMethod");
	 *
	 *     // method (on prototype)
	 *     result = Reflect.getMetadata("custom:annotation", C.prototype, "method");
	 *
	 */
	function getMetadata(metadataKey, target, targetKey) {
	    if (!is_object_1.isObject(target)) {
	        throw new TypeError('target ' + target + ' is not an object');
	    }
	    else if (!is_undefined_1.isUndefined(targetKey)) {
	        targetKey = to_property_key_1.toPropertyKey(targetKey);
	    }
	    return OrdinaryGetMetadata(metadataKey, target, targetKey);
	}
	exports.getMetadata = getMetadata;
	/**
	 * Gets the metadata value for the provided metadata key on the target object.
	 * @param metadataKey A key used to store and retrieve metadata.
	 * @param target The target object on which the metadata is defined.
	 * @param targetKey (Optional) The property key for the target.
	 * @returns The metadata value for the metadata key if found; otherwise, `undefined`.
	 * @example
	 *
	 *     class C {
	 *         // property declarations are not part of ES6, though they are valid in TypeScript:
	 *         // static staticProperty;
	 *         // property;
	 *
	 *         constructor(p) { }
	 *         static staticMethod(p) { }
	 *         method(p) { }
	 *     }
	 *
	 *     // constructor
	 *     result = Reflect.getOwnMetadata("custom:annotation", C);
	 *
	 *     // property (on constructor)
	 *     result = Reflect.getOwnMetadata("custom:annotation", C, "staticProperty");
	 *
	 *     // property (on prototype)
	 *     result = Reflect.getOwnMetadata("custom:annotation", C.prototype, "property");
	 *
	 *     // method (on constructor)
	 *     result = Reflect.getOwnMetadata("custom:annotation", C, "staticMethod");
	 *
	 *     // method (on prototype)
	 *     result = Reflect.getOwnMetadata("custom:annotation", C.prototype, "method");
	 *
	 */
	function getOwnMetadata(metadataKey, target, targetKey) {
	    if (!is_object_1.isObject(target)) {
	        throw new TypeError('target ' + target + ' is not an object');
	    }
	    else if (!is_undefined_1.isUndefined(targetKey)) {
	        targetKey = to_property_key_1.toPropertyKey(targetKey);
	    }
	    return OrdinaryGetOwnMetadata(metadataKey, target, targetKey);
	}
	exports.getOwnMetadata = getOwnMetadata;
	/**
	 * Gets the metadata keys defined on the target object or its prototype chain.
	 * @param target The target object on which the metadata is defined.
	 * @param targetKey (Optional) The property key for the target.
	 * @returns An array of unique metadata keys.
	 * @example
	 *
	 *     class C {
	 *         // property declarations are not part of ES6, though they are valid in TypeScript:
	 *         // static staticProperty;
	 *         // property;
	 *
	 *         constructor(p) { }
	 *         static staticMethod(p) { }
	 *         method(p) { }
	 *     }
	 *
	 *     // constructor
	 *     result = Reflect.getMetadataKeys(C);
	 *
	 *     // property (on constructor)
	 *     result = Reflect.getMetadataKeys(C, "staticProperty");
	 *
	 *     // property (on prototype)
	 *     result = Reflect.getMetadataKeys(C.prototype, "property");
	 *
	 *     // method (on constructor)
	 *     result = Reflect.getMetadataKeys(C, "staticMethod");
	 *
	 *     // method (on prototype)
	 *     result = Reflect.getMetadataKeys(C.prototype, "method");
	 *
	 */
	function getMetadataKeys(target, targetKey) {
	    if (!is_object_1.isObject(target)) {
	        throw new TypeError('target ' + target + ' is not an object');
	    }
	    else if (!is_undefined_1.isUndefined(targetKey)) {
	        targetKey = to_property_key_1.toPropertyKey(targetKey);
	    }
	    return ordinary_metadata_keys_1.ordinaryMetadataKeys(target, targetKey);
	}
	exports.getMetadataKeys = getMetadataKeys;
	/**
	 * Gets the unique metadata keys defined on the target object.
	 * @param target The target object on which the metadata is defined.
	 * @param targetKey (Optional) The property key for the target.
	 * @returns An array of unique metadata keys.
	 * @example
	 *
	 *     class C {
	 *         // property declarations are not part of ES6, though they are valid in TypeScript:
	 *         // static staticProperty;
	 *         // property;
	 *
	 *         constructor(p) { }
	 *         static staticMethod(p) { }
	 *         method(p) { }
	 *     }
	 *
	 *     // constructor
	 *     result = Reflect.getOwnMetadataKeys(C);
	 *
	 *     // property (on constructor)
	 *     result = Reflect.getOwnMetadataKeys(C, "staticProperty");
	 *
	 *     // property (on prototype)
	 *     result = Reflect.getOwnMetadataKeys(C.prototype, "property");
	 *
	 *     // method (on constructor)
	 *     result = Reflect.getOwnMetadataKeys(C, "staticMethod");
	 *
	 *     // method (on prototype)
	 *     result = Reflect.getOwnMetadataKeys(C.prototype, "method");
	 *
	 */
	function getOwnMetadataKeys(target, targetKey) {
	    if (!is_object_1.isObject(target)) {
	        throw new TypeError('target ' + target + ' is not an object');
	    }
	    else if (!is_undefined_1.isUndefined(targetKey)) {
	        targetKey = to_property_key_1.toPropertyKey(targetKey);
	    }
	    return ordinary_own_metadata_keys_1.ordinaryOwnMetadataKeys(target, targetKey);
	}
	exports.getOwnMetadataKeys = getOwnMetadataKeys;
	/**
	 * Deletes the metadata entry from the target object with the provided key.
	 * @param metadataKey A key used to store and retrieve metadata.
	 * @param target The target object on which the metadata is defined.
	 * @param targetKey (Optional) The property key for the target.
	 * @returns `true` if the metadata entry was found and deleted; otherwise, false.
	 * @example
	 *
	 *     class C {
	 *         // property declarations are not part of ES6, though they are valid in TypeScript:
	 *         // static staticProperty;
	 *         // property;
	 *
	 *         constructor(p) { }
	 *         static staticMethod(p) { }
	 *         method(p) { }
	 *     }
	 *
	 *     // constructor
	 *     result = Reflect.deleteMetadata("custom:annotation", C);
	 *
	 *     // property (on constructor)
	 *     result = Reflect.deleteMetadata("custom:annotation", C, "staticProperty");
	 *
	 *     // property (on prototype)
	 *     result = Reflect.deleteMetadata("custom:annotation", C.prototype, "property");
	 *
	 *     // method (on constructor)
	 *     result = Reflect.deleteMetadata("custom:annotation", C, "staticMethod");
	 *
	 *     // method (on prototype)
	 *     result = Reflect.deleteMetadata("custom:annotation", C.prototype, "method");
	 *
	 */
	function deleteMetadata(metadataKey, target, targetKey) {
	    if (!is_object_1.isObject(target)) {
	        throw new TypeError('target ' + target + ' is not an object');
	    }
	    else if (!is_undefined_1.isUndefined(targetKey)) {
	        targetKey = to_property_key_1.toPropertyKey(targetKey);
	    }
	    // https://github.com/jonathandturner/decorators/blob/master/specs/metadata.md#deletemetadata-metadatakey-p-
	    var metadataMap = get_or_create_metadata_map_1.getOrCreateMetadataMap(target, targetKey, /*create*/ false);
	    if (is_undefined_1.isUndefined(metadataMap)) {
	        return false;
	    }
	    if (!metadataMap.delete(metadataKey)) {
	        return false;
	    }
	    if (metadataMap.size > 0) {
	        return true;
	    }
	    var targetMetadata = metadata_1.__Metadata__.get(target);
	    targetMetadata.delete(targetKey);
	    if (targetMetadata.size > 0) {
	        return true;
	    }
	    metadata_1.__Metadata__.delete(target);
	    return true;
	}
	exports.deleteMetadata = deleteMetadata;
	function DecorateConstructor(decorators, target) {
	    for (var i = decorators.length - 1; i >= 0; --i) {
	        var decorator = decorators[i];
	        var decorated = decorator(target);
	        if (!is_undefined_1.isUndefined(decorated)) {
	            if (!is_constructor_1.isConstructor(decorated)) {
	                throw new TypeError('target ' + target + ' is not a constructor');
	            }
	            target = decorated;
	        }
	    }
	    return target;
	}
	function DecoratePropertyWithDescriptor(decorators, target, propertyKey, descriptor) {
	    for (var i = decorators.length - 1; i >= 0; --i) {
	        var decorator = decorators[i];
	        var decorated = decorator(target, propertyKey, descriptor);
	        if (!is_undefined_1.isUndefined(decorated)) {
	            if (!is_object_1.isObject(decorated)) {
	                throw new TypeError('decorated ' + decorated + ' is not an object');
	            }
	            descriptor = decorated;
	        }
	    }
	    return descriptor;
	}
	function DecoratePropertyWithoutDescriptor(decorators, target, propertyKey) {
	    for (var i = decorators.length - 1; i >= 0; --i) {
	        var decorator = decorators[i];
	        decorator(target, propertyKey);
	    }
	}
	// https://github.com/jonathandturner/decorators/blob/master/specs/metadata.md#ordinaryhasmetadata--metadatakey-o-p-
	function OrdinaryHasMetadata(MetadataKey, O, P) {
	    var hasOwn = OrdinaryHasOwnMetadata(MetadataKey, O, P);
	    if (hasOwn) {
	        return true;
	    }
	    var parent = get_proto_of_type_1.getProtoOfType(O);
	    if (parent !== null) {
	        return OrdinaryHasMetadata(MetadataKey, parent, P);
	    }
	    return false;
	}
	// https://github.com/jonathandturner/decorators/blob/master/specs/metadata.md#ordinaryhasownmetadata--metadatakey-o-p-
	function OrdinaryHasOwnMetadata(MetadataKey, O, P) {
	    var metadataMap = get_or_create_metadata_map_1.getOrCreateMetadataMap(O, P, /*create*/ false);
	    if (metadataMap === undefined) {
	        return false;
	    }
	    return Boolean(metadataMap.has(MetadataKey));
	}
	// https://github.com/jonathandturner/decorators/blob/master/specs/metadata.md#ordinarygetmetadata--metadatakey-o-p-
	function OrdinaryGetMetadata(MetadataKey, O, P) {
	    var hasOwn = OrdinaryHasOwnMetadata(MetadataKey, O, P);
	    if (hasOwn) {
	        return OrdinaryGetOwnMetadata(MetadataKey, O, P);
	    }
	    var parent = get_proto_of_type_1.getProtoOfType(O);
	    if (parent !== null) {
	        return OrdinaryGetMetadata(MetadataKey, parent, P);
	    }
	    return undefined;
	}
	// https://github.com/jonathandturner/decorators/blob/master/specs/metadata.md#ordinarygetownmetadata--metadatakey-o-p-
	function OrdinaryGetOwnMetadata(MetadataKey, O, P) {
	    var metadataMap = get_or_create_metadata_map_1.getOrCreateMetadataMap(O, P, /*create*/ false);
	    if (metadataMap === undefined) {
	        return undefined;
	    }
	    return metadataMap.get(MetadataKey);
	}
	// https://github.com/jonathandturner/decorators/blob/master/specs/metadata.md#ordinarydefineownmetadata--metadatakey-metadatavalue-o-p-
	function OrdinaryDefineOwnMetadata(MetadataKey, MetadataValue, O, P) {
	    var metadataMap = get_or_create_metadata_map_1.getOrCreateMetadataMap(O, P, /*create*/ true);
	    metadataMap.set(MetadataKey, MetadataValue);
	}


/***/ },
/* 2 */
/***/ function(module, exports) {

	"use strict";
	var functionPrototype = Function.prototype;
	function getProtoOfType(O) {
	    var proto = Object.getPrototypeOf(O);
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
	    var prototype = O.prototype;
	    var prototypeProto = prototype && Object.getPrototypeOf(prototype);
	    if (prototypeProto == null || prototypeProto === Object.prototype) {
	        return proto;
	    }
	    // if the constructor was not a function, then we cannot determine the heritage.
	    var constructor = prototypeProto.constructor;
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
	exports.getProtoOfType = getProtoOfType;


/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var is_symbol_1 = __webpack_require__(4);
	// https://people.mozilla.org/~jorendorff/es6-draft.html#sec-topropertykey
	function toPropertyKey(value) {
	    if (is_symbol_1.isSymbol(value)) {
	        return value;
	    }
	    return String(value);
	}
	exports.toPropertyKey = toPropertyKey;


/***/ },
/* 4 */
/***/ function(module, exports) {

	"use strict";
	// https://people.mozilla.org/~jorendorff/es6-draft.html#sec-ecmascript-language-types-symbol-type
	function isSymbol(x) {
	    return typeof x === "symbol";
	}
	exports.isSymbol = isSymbol;


/***/ },
/* 5 */
/***/ function(module, exports) {

	"use strict";
	// https://people.mozilla.org/~jorendorff/es6-draft.html#sec-isconstructor
	function isConstructor(x) {
	    return typeof x === "function";
	}
	exports.isConstructor = isConstructor;


/***/ },
/* 6 */
/***/ function(module, exports) {

	"use strict";
	// https://people.mozilla.org/~jorendorff/es6-draft.html#sec-ecmascript-language-types-undefined-type
	function isUndefined(x) {
	    return x === undefined;
	}
	exports.isUndefined = isUndefined;


/***/ },
/* 7 */
/***/ function(module, exports) {

	"use strict";
	// https://people.mozilla.org/~jorendorff/es6-draft.html#sec-isarray
	function isArray(x) {
	    return Array.isArray(x);
	}
	exports.isArray = isArray;


/***/ },
/* 8 */
/***/ function(module, exports) {

	"use strict";
	// https://people.mozilla.org/~jorendorff/es6-draft.html#sec-object-type
	function isObject(x) {
	    return typeof x === "object" ? x !== null : typeof x === "function";
	}
	exports.isObject = isObject;


/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var weakmap_1 = __webpack_require__(10);
	var _WeakMap = typeof WeakMap === "function" ? WeakMap : weakmap_1.createWeakMapPolyfill();
	// TODO: fix the typescript types
	// export const __Metadata__ = new _WeakMap<Object, Map<string | symbol, Map<any, any>>>();
	exports.__Metadata__ = new _WeakMap();


/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var create_unique_key_1 = __webpack_require__(11);
	var get_or_create_weakmap_1 = __webpack_require__(17);
	exports.rootKey = create_unique_key_1.createUniqueKey();
	var WeakMap = (function () {
	    function WeakMap() {
	        this._key = create_unique_key_1.createUniqueKey();
	    }
	    Object.defineProperty(WeakMap.prototype, "length", {
	        get: function () {
	            return 0;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    WeakMap.prototype.has = function (target) {
	        var table = get_or_create_weakmap_1.getOrCreateWeakMapTable(exports.rootKey, target, /*create*/ false);
	        if (table) {
	            return this._key in table;
	        }
	        return false;
	    };
	    WeakMap.prototype.get = function (target) {
	        var table = get_or_create_weakmap_1.getOrCreateWeakMapTable(exports.rootKey, target, /*create*/ false);
	        if (table) {
	            return table[this._key];
	        }
	        return undefined;
	    };
	    WeakMap.prototype.set = function (target, value) {
	        var table = get_or_create_weakmap_1.getOrCreateWeakMapTable(exports.rootKey, target, /*create*/ true);
	        table[this._key] = value;
	        return this;
	    };
	    WeakMap.prototype.delete = function (target) {
	        var table = get_or_create_weakmap_1.getOrCreateWeakMapTable(exports.rootKey, target, /*create*/ false);
	        if (table && this._key in table) {
	            return delete table[this._key];
	        }
	        return false;
	    };
	    WeakMap.prototype.clear = function () {
	        // NOTE: not a real clear, just makes the previous data unreachable
	        this._key = create_unique_key_1.createUniqueKey();
	    };
	    return WeakMap;
	}());
	exports.WeakMap = WeakMap;
	function createWeakMapPolyfill() {
	    return WeakMap;
	}
	exports.createWeakMapPolyfill = createWeakMapPolyfill;


/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var helper_constants_1 = __webpack_require__(12);
	var has_own_1 = __webpack_require__(13);
	var create_uuid_1 = __webpack_require__(14);
	exports.keys = {};
	function createUniqueKey() {
	    var key;
	    do {
	        key = helper_constants_1.WEAKMAP_PREFIX + create_uuid_1.createUUID();
	    } while (has_own_1.hasOwn.call(exports.keys, key));
	    exports.keys[key] = true;
	    return key;
	}
	exports.createUniqueKey = createUniqueKey;


/***/ },
/* 12 */
/***/ function(module, exports) {

	"use strict";
	exports.UUID_SIZE = 16;
	exports.WEAKMAP_PREFIX = "@@WeakMap@@";


/***/ },
/* 13 */
/***/ function(module, exports) {

	"use strict";
	exports.hasOwn = Object.prototype.hasOwnProperty;


/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var helper_constants_1 = __webpack_require__(12);
	var gen_randombytes_1 = __webpack_require__(15);
	function createUUID() {
	    var data = gen_randombytes_1.genRandomBytes(helper_constants_1.UUID_SIZE);
	    // mark as random - RFC 4122 § 4.4
	    data[6] = data[6] & 0x4f | 0x40;
	    data[8] = data[8] & 0xbf | 0x80;
	    var result = "";
	    for (var offset = 0; offset < helper_constants_1.UUID_SIZE; ++offset) {
	        var byte = data[offset];
	        if (offset === 4 || offset === 6 || offset === 8) {
	            result += "-";
	        }
	        if (byte < 16) {
	            result += "0";
	        }
	        result += byte.toString(16).toLowerCase();
	    }
	    return result;
	}
	exports.createUUID = createUUID;


/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var crypto = __webpack_require__(16);
	function genRandomBytes(size) {
	    return crypto.randomBytes(size);
	}
	exports.genRandomBytes = genRandomBytes;


/***/ },
/* 16 */
/***/ function(module, exports) {

	module.exports = require("crypto");

/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var has_own_1 = __webpack_require__(13);
	function getOrCreateWeakMapTable(rootKey, target, create) {
	    if (!has_own_1.hasOwn.call(target, rootKey)) {
	        if (!create) {
	            return undefined;
	        }
	        Object.defineProperty(target, rootKey, {
	            value: Object.create(null)
	        });
	    }
	    return target[rootKey];
	}
	exports.getOrCreateWeakMapTable = getOrCreateWeakMapTable;


/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var get_or_create_metadata_map_1 = __webpack_require__(19);
	// https://github.com/jonathandturner/decorators/blob/master/specs/metadata.md#ordinaryownmetadatakeys--o-p-
	function ordinaryOwnMetadataKeys(target, targetKey) {
	    var metadataMap = get_or_create_metadata_map_1.getOrCreateMetadataMap(target, targetKey, /*create*/ false);
	    var keys = [];
	    if (metadataMap) {
	        metadataMap.forEach(function (_, key) { return keys.push(key); });
	    }
	    return keys;
	}
	exports.ordinaryOwnMetadataKeys = ordinaryOwnMetadataKeys;


/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var metadata_1 = __webpack_require__(9);
	var map_1 = __webpack_require__(20);
	var _Map = typeof Map === "function" ? Map : map_1.createMapPolyfill();
	// https://github.com/jonathandturner/decorators/blob/master/specs/metadata.md#getorcreatemetadatamap--o-p-create-
	function getOrCreateMetadataMap(target, targetKey, create) {
	    var targetMetadata = metadata_1.__Metadata__.get(target);
	    if (!targetMetadata) {
	        if (!create) {
	            return undefined;
	        }
	        // TODO: fix the typescript types
	        // targetMetadata = new _Map<string | symbol, _Map<any, any>>();
	        targetMetadata = new _Map();
	        metadata_1.__Metadata__.set(target, targetMetadata);
	    }
	    var keyMetadata = targetMetadata.get(targetKey);
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
	exports.getOrCreateMetadataMap = getOrCreateMetadataMap;


/***/ },
/* 20 */
/***/ function(module, exports) {

	"use strict";
	// naive Map shim
	exports.cacheSentinel = {};
	var Map = (function () {
	    function Map() {
	        this._keys = [];
	        this._values = [];
	        this._cache = exports.cacheSentinel;
	    }
	    Object.defineProperty(Map.prototype, "length", {
	        get: function () {
	            return 0;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(Map.prototype, "size", {
	        get: function () {
	            return this._keys.length;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Map.prototype.has = function (key) {
	        if (key === this._cache) {
	            return true;
	        }
	        if (this._find(key) >= 0) {
	            this._cache = key;
	            return true;
	        }
	        return false;
	    };
	    Map.prototype.get = function (key) {
	        var index = this._find(key);
	        if (index >= 0) {
	            this._cache = key;
	            return this._values[index];
	        }
	        return undefined;
	    };
	    Map.prototype.set = function (key, value) {
	        this.delete(key);
	        this._keys.push(key);
	        this._values.push(value);
	        this._cache = key;
	        return this;
	    };
	    Map.prototype.delete = function (key) {
	        var index = this._find(key);
	        if (index >= 0) {
	            this._keys.splice(index, 1);
	            this._values.splice(index, 1);
	            this._cache = exports.cacheSentinel;
	            return true;
	        }
	        return false;
	    };
	    Map.prototype.clear = function () {
	        this._keys.length = 0;
	        this._values.length = 0;
	        this._cache = exports.cacheSentinel;
	    };
	    Map.prototype.forEach = function (callback, thisArg) {
	        var size = this.size;
	        for (var i = 0; i < size; ++i) {
	            var key = this._keys[i];
	            var value = this._values[i];
	            this._cache = key;
	            callback.call(this, value, key, this);
	        }
	    };
	    Map.prototype._find = function (key) {
	        var keys = this._keys;
	        var size = keys.length;
	        for (var i = 0; i < size; ++i) {
	            if (keys[i] === key) {
	                return i;
	            }
	        }
	        return -1;
	    };
	    return Map;
	}());
	exports.Map = Map;
	function createMapPolyfill() {
	    return Map;
	}
	exports.createMapPolyfill = createMapPolyfill;


/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var ordinary_own_metadata_keys_1 = __webpack_require__(18);
	var get_proto_of_type_1 = __webpack_require__(2);
	var set_1 = __webpack_require__(22);
	var _Set = typeof Set === "function" ? Set : set_1.createSetPolyfill();
	// https://github.com/jonathandturner/decorators/blob/master/specs/metadata.md#ordinarymetadatakeys--o-p-
	function ordinaryMetadataKeys(O, P) {
	    var ownKeys = ordinary_own_metadata_keys_1.ordinaryOwnMetadataKeys(O, P);
	    var parent = get_proto_of_type_1.getProtoOfType(O);
	    if (parent === null) {
	        return ownKeys;
	    }
	    var parentKeys = ordinaryMetadataKeys(parent, P);
	    if (parentKeys.length <= 0) {
	        return ownKeys;
	    }
	    if (ownKeys.length <= 0) {
	        return parentKeys;
	    }
	    var set = new _Set();
	    var keys = [];
	    for (var _i = 0, ownKeys_1 = ownKeys; _i < ownKeys_1.length; _i++) {
	        var key = ownKeys_1[_i];
	        var hasKey = set.has(key);
	        if (!hasKey) {
	            set.add(key);
	            keys.push(key);
	        }
	    }
	    for (var _a = 0, parentKeys_1 = parentKeys; _a < parentKeys_1.length; _a++) {
	        var key = parentKeys_1[_a];
	        var hasKey = set.has(key);
	        if (!hasKey) {
	            set.add(key);
	            keys.push(key);
	        }
	    }
	    return keys;
	}
	exports.ordinaryMetadataKeys = ordinaryMetadataKeys;


/***/ },
/* 22 */
/***/ function(module, exports) {

	"use strict";
	// var _Map: MapConstructor = (typeof Map !== "undefined") ? createMapPolyfill() : Map;
	exports.cacheSentinel = {};
	var Set = (function () {
	    function Set() {
	        this._map = new Map();
	    }
	    Object.defineProperty(Set.prototype, "length", {
	        get: function () {
	            return 0;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(Set.prototype, "size", {
	        get: function () {
	            return this._map.size;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Set.prototype.has = function (value) {
	        return this._map.has(value);
	    };
	    Set.prototype.add = function (value) {
	        this._map.set(value, value);
	        return this;
	    };
	    Set.prototype.delete = function (value) {
	        return this._map.delete(value);
	    };
	    Set.prototype.clear = function () {
	        this._map.clear();
	    };
	    Set.prototype.forEach = function (callback, thisArg) {
	        this._map.forEach(callback, thisArg);
	    };
	    return Set;
	}());
	exports.Set = Set;
	function createSetPolyfill() {
	    return Set;
	}
	exports.createSetPolyfill = createSetPolyfill;


/***/ }
/******/ ]);
//# sourceMappingURL=node.js.map