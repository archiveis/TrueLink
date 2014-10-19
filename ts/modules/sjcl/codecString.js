/** @fileOverview Bit array codec implementations.
 *
 * @author Emily Stark
 * @author Mike Hamburg
 * @author Dan Boneh
 */

define(function (require, exports, module) {
    "use strict";
    var sjcl = require("./sjcl");
    var bitArray = require("./bitArray");
    /** @namespace UTF-8 strings */
    var utf8String = {
        /** Convert from a bitArray to a UTF-8 string. */
        fromBits: function (arr) {
            var out = "", bl = sjcl.bitArray.bitLength(arr), i, tmp;
            for (i=0; i<bl/8; i++) {
                if ((i&3) === 0) {
                    tmp = arr[i/4];
                }
                out += String.fromCharCode(tmp >>> 24);
                tmp <<= 8;
            }
            return decodeURIComponent(escape(out));
        },

        /** Convert from a UTF-8 string to a bitArray. */
        toBits: function (str) {
            str = unescape(encodeURIComponent(str));
            var out = [], i, tmp=0;
            for (i=0; i<str.length; i++) {
                tmp = tmp << 8 | str.charCodeAt(i);
                if ((i&3) === 3) {
                    out.push(tmp);
                    tmp = 0;
                }
            }
            if (i&3) {
                out.push(sjcl.bitArray.partial(8*(i&3), tmp));
            }
            return out;
        }
    };

    sjcl.codec.utf8String = utf8String;

    module.exports = utf8String;
});