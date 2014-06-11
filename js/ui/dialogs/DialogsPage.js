define(function (require, exports, module) {
    "use strict";
    var React = require("react");
    var reactObserver = require("mixins/reactObserver");
    module.exports = React.createClass({
        displayName: "DialogsPage",
        mixins: [reactObserver],
        _appendDialogComponent: function (components, dialog) {
            components[dialog.name] = React.DOM.div({className: "generic-block dialog clearfix"},
                React.DOM.div({className: "dialog-image"}, ""),
                React.DOM.div({className: "dialog-title"}, dialog.name));
        },
        handleStartDialog: function () {
            var props = this.props;
            props.router.navigate("contacts", props.pageModel.model);
            return false;
        },
        render: function () {
            var profile = this.state.model;
//            var pageModel = this.state.pageModel;
            var router = this.props.router;
            var dialogs = {};
            profile.dialogs.forEach(this._appendDialogComponent.bind(this, dialogs));
            return React.DOM.div({className: "dialogs-page"},
                React.DOM.div({className: "app-page-title"},
                    React.DOM.a({
                        className: "title",
                        href: "",
                        onClick: router.createNavigateHandler("home", profile.app)
                    }, "Dialogs")),
                React.DOM.div({className: "app-page-content"},
                    React.DOM.div({className: "generic-block"},
                        React.DOM.a({
                            className: "button",
                            href: "",
                            onClick: this.handleStartDialog
                        }, "Start new dialog")),
                    dialogs
                    ));
        }
    });
});