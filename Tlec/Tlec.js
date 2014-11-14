"use strict";
var tools = require("modules/tools");

var eventEmitter = require("modules/events/eventEmitter");
var invariant = require("modules/invariant");

var serializable = require("modules/serialization/serializable");

var TlecAlgo = require("./tlec-algo");
var DecryptionFailedError = require('./decryption-failed-error');

var extend = tools.extend;
var isFunction = tools.isFunction;

function Tlec(factory) {
    invariant(factory, "Can be constructed only with factory");
    invariant(isFunction(factory.createRandom), "factory must have createRandom() method");

    this._defineEvent("expired");
    this._defineEvent("packet");
    this._defineEvent("message");
    this._defineEvent("wrongSignatureMessage");
    this._defineEvent("changed");

    this._factory = factory;
    this._algo = new TlecAlgo(factory.createRandom());
}

extend(Tlec.prototype, eventEmitter, serializable, {
    serialize: function (packet, context) {
        var data = this._algo.serialize();
        packet.setData(data);
    },
    deserialize: function (packet, context) {
        var data = packet.getData();
        this._algo.deserialize(data);
    },

    init: function (initObj) {
        this._algo.init(initObj);
        this.checkEventHandlers();
        this._onChanged();
    },

    sendMessage: function (message) {
        var encrypted = this._algo.createMessage(message);
        if (this._algo.isExpired()) {
            this.fire("expired");
        }
        this._onChanged();
        this.fire("packet", encrypted);
    },

    // process packet from the network
    processPacket: function (bytes) {
        var netData;
        try {
            netData = this._algo.processPacket(bytes);
        } catch (ex) {
            if (ex instanceof DecryptionFailedError) {
                throw DecryptionFailedError.innerError;
            } else {
                throw ex;
            }
        }

        if (netData === false) {
            this.fire("wrongSignatureMessage", netData);
            return;
        }
        this.fire("message", netData);
    },

    _onChanged: function () {
        this.fire("changed", this);
    },


});

module.exports = Tlec;
