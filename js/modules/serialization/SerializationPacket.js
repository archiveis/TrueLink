define(["tools/invariant", "zepto"], function (invariant, $) {
    "use strict";

    function isPacketOrList (link) {
        if (link instanceof SerializationPacket) {
            return true;
        }
        if ($.isArray(link)) {
            for (var i = 0; i < link.length; i += 1) {
                if (!(link[i] instanceof SerializationPacket)) {
                    return false;
                }
            }
            return true;
        }
        return false;
    }

    function SerializationPacket() {
        this._data = {};
        this._links = {};
        this.isSerialized = false;
    }
    SerializationPacket.prototype = {
        getData: function () {
            return this._data;
        },
        setData: function (data) {
            invariant($.isPlainObject(data), "data must be plain object");
            this._data = data;
        },
        getLink: function (linkName) {
            invariant(linkName, "missing linkName");
            return this._links[linkName];
        },
        setLink: function (linkName, link) {
            invariant(linkName, "missing linkName");
            invariant(isPacketOrList(link), "link should be SerializationPacket or SerializationPacket[]");
            this._links[linkName] = link;
        },

        getLinks: function () { return this._links; }

    };
    SerializationPacket.nullPacket = new SerializationPacket();

    return SerializationPacket;
});