import * as crypto from "crypto";
import {BufferLike} from "./interfaces";

export function genRandomBytes(size: number): BufferLike {
  return crypto.randomBytes(size);
}
