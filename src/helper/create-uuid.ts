import {UUID_SIZE} from "./helper-constants";
import {genRandomBytes} from "./gen-randombytes";

export function createUUID() {
  var data = genRandomBytes(UUID_SIZE);
  // mark as random - RFC 4122 § 4.4
  data[6] = data[6] & 0x4f | 0x40;
  data[8] = data[8] & 0xbf | 0x80;

  var result = "";

  for (let offset = 0; offset < UUID_SIZE; ++offset) {
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
