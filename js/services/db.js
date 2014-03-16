define(["linkDb/sugar",
    "zepto",
    "services/crypto",
    "models/Profile"], function (sugar, $, crypto, Profile) {
    "use strict";
    sugar.addLinkMeta("profile", "profiles", "root", "root");
    sugar.addLinkMeta("contact", "contacts", "profile", "profiles");
    sugar.addLinkMeta("dialog", "dialogs", "profile", "profiles");
    sugar.addLinkMeta("dialog", "dialogs", "contact", "contacts");
    sugar.addLinkMeta("document", "documents", "profile", "profiles");
    sugar.addLinkMeta("channel", "channels", "contact", "contacts");
    sugar.addLinkMeta("channel", "channels", "profile", "profile");
    sugar.addLinkMeta("message", "messages", "dialog", "dialogs");

    sugar.core.connect("truelink");

    function init(rootEntity) {
        var encryptor = crypto.createDbEncryptor(rootEntity);
        sugar.core.setDefaultEncryptor(encryptor);
        return rootEntity;
    }
    function saveRootEntity(entity, encryptor) {
        return sugar.save(entity).encrypt(encryptor).execute();
    }
    function loadRootEntity(id, encryptor) {
        return sugar.getById(id).decrypt(encryptor).execute();
    }

    function getById(constructor, id) {
        var query = sugar.getById(id)
            .resolve(function (entity) { return constructor.deserialize(entity); });
        return query.execute();
    }
    function getByLink(constructor, link, entityId) {
        return getById(constructor, entityId);
    }

    function getProfiles(rootEntity) {
        var query = sugar.get("profiles")
            .linkedWith("root", rootEntity)
            .resolve(getByLink.bind(null, Profile));
        return query.execute();
    }

    function addProfile(profile, rootEntity) {
        var query = sugar.save(profile.entity)
            .linkTo("root", rootEntity)
            .as("profile");
        return query.execute();
    }

    return {
        init: init,
        drop: sugar.drop,
        loadRootEntity: loadRootEntity,
        saveRootEntity: saveRootEntity,

        getProfiles: getProfiles,
        addProfile: addProfile

    };
});