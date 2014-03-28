define(["modules/data-types/hex"], function (Hex) {
    "use strict";
    var tokens = {
        TlkeChannel: {},
        GenericChannel: {},
        ContactChannelGroup: {}
    };
    tokens.TlkeChannel.GenerateToken = function () {};
    tokens.TlkeChannel.OfferToken = function (offerBytes) { this.offer = offerBytes; };
    tokens.TlkeChannel.AuthToken = function (authBytes) { this.auth = authBytes; };
    tokens.TlkeChannel.ChangeStateToken = function (state) { this.state = state; };
    // do not change these properties! (kind of IChannelChangedIdsToken)
    tokens.TlkeChannel.TlkeChannelGeneratedToken = function (inId, outId) {
        this.inId = inId;
        this.outId = outId;
    };
    // do not change these properties! (kind of IChannelChangedIdsToken)
    tokens.TlkeChannel.GenericChannelGeneratedToken = function (inId, outId, key) {
        this.inId = inId;
        this.outId = outId;
        this.key = key;
    };

    tokens.GenericChannel.WrongSignatureToken = function (msg) { this.msg = msg; };
    tokens.GenericChannel.ExpiresToken = function () {  };
    tokens.GenericChannel.ExpiredToken = function () {  };

    tokens.ContactChannelGroup.GenerateTlkeToken = function () { };
    tokens.ContactChannelGroup.OfferToken = function (offer, ref) { this.offer = offer; this.ref = ref; };
    tokens.ContactChannelGroup.OfferToken.prototype = {
        serialize: function () {
            return {
                o: this.offer.as(Hex).serialize(),
                ref: this.ref
            };
        },
        _typeName: "10"
    };
    tokens.ContactChannelGroup.OfferToken.deserialize = function (dto) {
        var offer = Hex.deserialize(dto.o);
        return new tokens.ContactChannelGroup.OfferToken(offer, dto.ref);
    };
    tokens.ContactChannelGroup.AuthToken = function (auth, ref) { this.auth = auth; };

    tokens.ContactChannelGroup.AuthToken.prototype = {
        serialize: function () {
            return {
                a: this.auth.as(Hex).serialize(),
            };
        },
        _typeName: "15"
    };
    tokens.ContactChannelGroup.AuthToken.deserialize = function (dto) {
        var auth = Hex.deserialize(dto.a);
        return new tokens.ContactChannelGroup.AuthToken(auth);
    };

    tokens.ContactChannelGroup.ChannelAddedToken = function (inId) { this.inId = inId; };
    tokens.ContactChannelGroup.ChangeStateToken = function (state) { this.state = state; };
    tokens.ContactChannelGroup.OverChannelChangeStateToken = function (state) { this.state = state; };

    tokens.ContactChannelGroup.GenerateOverTlkeToken = function () { };



    var types = {}, type, group;
    for (group in tokens) {
        if (tokens.hasOwnProperty(group)) {
            for (type in tokens[group]) {
                if (tokens[group].hasOwnProperty(type)) {
                    var name = tokens[group][type].prototype._typeName;
                    if (name) {
                        types[name] = tokens[group][type];
                    }
                }
            }
        }
    }


    tokens.serialize = function (token) {
        if (!token._typeName) {
            throw new Error("Could not serialize token: missing prototype._typeName");
        }
        return {
            t: token._typeName,
            d: token.serialize()
        };
    };

    tokens.deserialize = function (dto) {
        return types[dto.t].deserialize(dto.d);
    };


    return tokens;
});
