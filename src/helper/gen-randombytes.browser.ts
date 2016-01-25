import {BufferLike} from "./interfaces";
import {fillRandomBytes} from "./fill-randombytes";

export function genRandomBytes(size: number): BufferLike {
  var data: BufferLike;

  if (typeof Uint8Array === "function") {
    data = new Uint8Array(size);
    if (typeof (<any>window).crypto !== "undefined") {
      (<any>window).crypto.getRandomValues(<Uint8Array>data);
    } else if (typeof (<any>window).msCrypto !== "undefined") {
      (<any>window).msCrypto.getRandomValues(<Uint8Array>data);
    } else {
      fillRandomBytes(data, size);
    }
  } else {
    data = new Array(size);
    fillRandomBytes(data, size);
  }

  return data;
 }
