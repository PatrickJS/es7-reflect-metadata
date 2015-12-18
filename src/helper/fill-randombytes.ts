import {BufferLike} from "./interfaces";

export function fillRandomBytes(buffer: BufferLike, size: number): BufferLike {
  for (let i = 0; i < size; ++i) {
    buffer[i] = Math.random() * 255 | 0;
  }
  return buffer;
}
