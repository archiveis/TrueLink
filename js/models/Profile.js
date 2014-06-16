define(function (require, exports, module) {
    "use strict";
    var invariant = require("modules/invariant");
    var extend = require("extend");
    var eventEmitter = require("modules/events/eventEmitter");
    var serializable = require("modules/serialization/serializable");
    var model = require("mixins/model");
    var urandom = require("modules/urandom/urandom");

    function Profile() {
        this._defineEvent("changed");

        this.app = null;
        this.bg = null;
        this.documents = [];
        this.contacts = [];
        this.tlConnections = [];
        this.dialogs = [];
        this.pollingUrl = "";
    }

    extend(Profile.prototype, eventEmitter, serializable, model, {
        // called by factory
        setApp: function (app) {
            this.app = app;
        },

        createDocument: function () {
            this.checkFactory();
            var document = this._factory.createDocument();
            document.set({
                name: urandom.animal()
            });
            this.documents.push(document);
            this._onChanged();
            return document;
        },
        createContact: function () {
            this.checkFactory();
            var contact = this._factory.createContact(this);
            var contactTlConnection = this._createTlConnection();
            this._addTlConnection(contactTlConnection);
            contact.set({
                name : urandom.name(),
                tlConnection: contactTlConnection
            });
            contact.init();
            console.log("__profile added contact with tlConnection");
            this.contacts.push(contact);
            this._onChanged();
            return contact;
        },

        startDirectDialog: function (contact) {
            this.checkFactory();
            var dialog = this._findDirectDialog(contact);
            if (!dialog) {
                dialog = this._factory.createDialog();
                dialog.init();
                dialog.name = contact.name;
                dialog.addContact(contact);
                console.log("__profile added dialog");
                this.dialogs.push(dialog);
                this._onChanged();
            }
            return dialog;
        },

        _createTlConnection: function () {
            this.checkFactory();
            var tlConnection = this._factory.createTlConnection();
            tlConnection.init();
            return tlConnection;
        },

        _addTlConnection: function (conn) {
            this._linkTlConnection(conn);
            console.log("__profile added tlConnection");
            this.tlConnections.push(conn);
        },

        _findDirectDialog: function (contact) {
            var i;
            for (i = 0; i < this.dialogs.length; i += 1) {
                if (this.dialogs[i].contacts.length === 1 &&  this.dialogs[i].contacts[0] === contact) {
                    return this.dialogs[i];
                }
            }
            return null;
        },

        serialize: function (packet, context) {
            packet.setData({
                name: this.name,
                bg: this.bg,
                pollingUrl: this.pollingUrl
            });

            packet.setLink("documents", context.getPacket(this.documents));
            packet.setLink("contacts", context.getPacket(this.contacts));
            packet.setLink("dialogs", context.getPacket(this.dialogs));
            packet.setLink("tlConnections", context.getPacket(this.tlConnections));
        },
        deserialize: function (packet, context) {
            this.checkFactory();
            var factory = this._factory;
            var data = packet.getData();
            this.name = data.name;
            this.bg = data.bg;
            this.pollingUrl = data.pollingUrl;
            this.documents = context.deserialize(packet.getLink("documents"), factory.createDocument, factory);
            this.contacts = context.deserialize(packet.getLink("contacts"), factory.createContact, factory);
            this.dialogs = context.deserialize(packet.getLink("dialogs"), factory.createDialog, factory);
            this.tlConnections = context.deserialize(packet.getLink("tlConnections"), factory.createTlConnection, factory);
            this.tlConnections.forEach(this._linkTlConnection, this);

        },
        _linkTlConnection: function (conn) {
//            conn.on("message", this._onTlConnectionMessage, this);
        },

        _onTlConnectionMessage: function (message) {
//            this.fire("message", message);
        }


    });

    module.exports = Profile;
});