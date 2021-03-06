import BigIntForge = require("../multivalue/bigIntForge");
import Hex = require("../multivalue/hex");
import Base64 = require("../multivalue/base64");
import Bytes = require("../multivalue/bytes");
import DecBlocks = require("../multivalue/decBlocks");
import BigIntSjcl = require("../multivalue/bigIntSjcl");
import ByteBuffer = require("../multivalue/byteBuffer");
import Utf8String = require("../multivalue/utf8string");
export declare function BigIntForgeToHex(source: BigIntForge): Hex;
export declare function HexToBigIntForge(source: Hex): BigIntForge;
export declare function BigIntForgeToBytes(source: BigIntForge): Bytes;
export declare function BytesToBigIntForge(source: Bytes): BigIntForge;
export declare function DecBlocksToBigIntForge(source: DecBlocks): BigIntForge;
export declare function BigIntForgeToDecBlocks(source: BigIntForge): DecBlocks;
export declare function BigIntForgeToBigIntSjcl(source: BigIntForge): BigIntSjcl;
export declare function BigIntSjclToBigIntForge(source: BigIntSjcl): BigIntForge;
export declare function ByteBufferToHex(source: ByteBuffer): Hex;
export declare function HexToByteBuffer(source: Hex): ByteBuffer;
export declare function ByteBufferToBase64(source: ByteBuffer): Base64;
export declare function Base64ToByteBuffer(source: Base64): ByteBuffer;
export declare function ByteBufferToUtf8String(source: ByteBuffer): Utf8String;
export declare function Utf8StringToByteBuffer(source: Utf8String): ByteBuffer;
export declare function register(): void;
