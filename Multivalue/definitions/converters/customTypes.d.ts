import DecBlocks = require("../multivalue/decBlocks");
import Bytes = require("../multivalue/bytes");
import Base64 = require("../multivalue/base64");
import Base64Url = require("../multivalue/base64url");
import Utf8String = require("../multivalue/utf8string");
import Hex = require("../multivalue/hex");
export declare function HexToDecBlocks(source: Hex): DecBlocks;
export declare function HexToBytes(source: Hex): Bytes;
export declare function BytesToHex(source: Bytes): Hex;
export declare function DecBlocksToHex(source: DecBlocks): Hex;
export declare function DecBlocksToBytes(source: DecBlocks): Bytes;
export declare function BytesToDecBlocks(source: Bytes): DecBlocks;
export declare function BytesToBase64(source: Bytes): Base64;
export declare function Base64ToBytes(source: Base64): Bytes;
export declare function BytesToBase64Url(source: Bytes): Base64Url;
export declare function Base64UrlToBytes(source: Base64Url): Bytes;
export declare function BytesToUtf8String(source: Bytes): Utf8String;
export declare function Utf8StringToBytes(source: Utf8String): Bytes;
export declare function register(): void;
