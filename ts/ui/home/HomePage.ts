    "use strict";
    import React = require("react");
    import ReactBootstrap = require("react-bootstrap");
    import reactObserver = require("../../mixins/reactObserver");
    var exp = React.createClass({
        displayName: "HomePage",
        mixins: [reactObserver],
        render: function () {
            var app = this.state.model;
            var router = this.props.router;
            var profileComponents = {};
            var model = this.props.pageModel.model;
            app.profiles.forEach(function (p) {
                profileComponents[p.name] = React.DOM.li({
                    onClick: model.setCurrentProfile.bind(model, p),
                    style: { cursor: "pointer", "margin-left": 20 }
                }, p.name);
            });
            return React.DOM.div(null,
                React.DOM.div({className: "app-page-header"},
                    React.DOM.span({className: "header-dropdown-menu-button"},
                        ReactBootstrap.DropdownButton({
                                title: "∴",
                                pullRight: true,
                                onSelect: function () {} // menu does not close on item click without this
                            },
                            ReactBootstrap.MenuItem({
                                onClick: function () {/* stub */}
                            }, "(stub) Start dialog"),
                            ReactBootstrap.MenuItem({
                                onClick: function () {/* stub */}
                            }, "(stub) Add contact"),
                            ReactBootstrap.MenuItem({
                                divider: true
                            }),
                            ReactBootstrap.MenuItem({
                                onClick: function () {/* stub */}
                            }, "(stub) Accept invitation"),
                            ReactBootstrap.MenuItem({
                                onClick: function () {/* stub */}
                            }, "(stub) Enter confirmation"),
                            ReactBootstrap.MenuItem({
                                onClick: function () {/* stub */}
                            }, "(stub) Connet to a public key"),
                            ReactBootstrap.MenuItem({
                                divider: true
                            }),
                            ReactBootstrap.MenuItem({
                                onClick: function () {/* stub */}
                            }, "(stub) Advanced"),
                            ReactBootstrap.MenuItem({
                                onClick: function () {/* stub */}
                            }, "(stub) Settings"),
                            ReactBootstrap.MenuItem({
                                onClick: function () {/* stub */}
                            }, "(stub) Help"))),
                    React.DOM.a({
                        className: "title",
                        href: "#"
                    }, "Home page: " + app.currentProfile.name))
                ,
                React.DOM.ul(null, profileComponents));
        }
    });
export = exp;
