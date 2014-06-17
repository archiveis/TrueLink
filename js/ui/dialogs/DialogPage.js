define(function (require, exports, module) {
    "use strict";
    var React = require("react");
    var reactObserver = require("mixins/reactObserver");
    var MessagesView = require("./MessagesView");
    module.exports = React.createClass({
        displayName: "DialogPage",
        mixins: [reactObserver],
        _onSubmit: function () {
            try {
                var node = this.refs.inputMessage.getDOMNode();
                var messageObj = node.value;
                node.value = "";
                this.props.pageModel.model.sendMessage(messageObj);
            } catch (ex) {
                console.error(ex);
            }
            return false;
        },
        render: function () {
            var dialog = this.state.model;
//            var pageModel = this.state.pageModel;
            var router = this.props.router;
            return React.DOM.div({className: "dialog-page"},
                React.DOM.div({className: "app-page-title"},
                    React.DOM.a({
                        className: "title",
                        href: "",
                        onClick: router.createNavigateHandler("dialogs", dialog.profile)
                    }, "Dialog: " + dialog.name)),
                React.DOM.div({className: "app-page-content"},
                    MessagesView({messages: dialog.messages}),
                    React.DOM.form({onSubmit: this._onSubmit},
                        React.DOM.input({ref: "inputMessage"}))));
        }
    });
});