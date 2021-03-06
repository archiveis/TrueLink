    "use strict";
    var exp = {

        Application: {
            // key is a link name
            // propType may be smth like "lazyLoadingMany" in future
            // type is a definition name within this query, not a class name
            // type "any" means that the corresponding model must be already deserialized
            // (see SerializationContext.deserialize() without constructor argument)
            // type "_auto" - type is obtained from packet data (_type_ property) should get it from metadata instead i guess /by Murashko
            menu: {propType: "one", type: "Menu"},
            profiles: {propType: "many", type: "Profile"},
            currentProfile: {propType: "one", type: "Profile"},
            router: {propType: "one", type: "Router"},
            random: {propType: "one", type: "Random"}
        },
        Profile: {
            tlConnections: {propType: "many", type: "TlConnection"},
            contacts: {propType: "many", type: "Contact"},
            documents: {propType: "many", type: "Document"},
            dialogs: {propType: "many", type: "_auto"},
            grConnections: {propType: "many", type: "GrConnection"},
            transport: {propType: "one", type: "CouchTransport"},
            sync: {propType: "one", type: "Sync"}
        },
        Sync: {
            transport: {propType: "one", type: "CouchTransport"},
            grConnection: {propType: "one", type: "GrConnection"},
            tlConnections: {propType: "many", type: "TlConnection"},
            initialConnection: {propType: "one", type: "TlConnection"},
            _sorter: {propType: "one", type: "TopologicalSorter"}
        },
        TopologicalSorter: {},
        GrConnection: {
            activeTlgr: {propType: "one", type: "Tlgr"},
            transport: {propType: "one", type: "CouchTransport"}
        },
        TlConnection: {
            _initialTlec: {propType: "one", type: "CouchTlec"},
            _tlecs: {propType: "many", type: "CouchTlec"},
            _sorter: {propType: "one", type: "TopologicalSorter"}
        },
        CouchTlec: {
            _tlecBuilder: {propType: "one", type: "TlecBuilder"}
        },
        TlecBuilder: {
            _tlkeBuilder: {propType: "one", type: "TlkeBuilder"},
            _tlht: {propType: "one", type: "Tlht"},
            _tlec: {propType: "one", type: "Tlec"},
            _route: {propType: "one", type: "Route"},
            _echoRoute: {propType: "one", type: "Route"},
            _cryptor: {propType: "one", type: "TlecCryptor"}
        },
        TlecCryptor: {},
        TlkeBuilder: {
            _tlke: {propType: "one", type: "Tlke"},
            _route: {propType: "one", type: "Route"}
        },
        Route: {},
        Tlec: {},
        Tlht: {},
        Tlke: {},
        Tlgr: {},
        Dialog: {
            contact: {propType: "one", type: "Contact"},
            history: {propType: "one", type: "MessageHistory"}
        },
        GroupChat: {
            grConnection: {propType: "one", type: "GrConnection"},
            history: {propType: "one", type: "MessageHistory"}
        },
        Menu: {},
        Document: {},
        Contact: {
            tlConnection: {propType: "one", type: "TlConnection"},
        },
        MessageHistory: {},
        Router: {
            pageModel: {propType: "one", type: "PageModel"}
        },
        PageModel: {
            model: {propType: "one", type: "any"}
        },
        CouchTransport: {},
        Random: {}
    };
export = exp;
