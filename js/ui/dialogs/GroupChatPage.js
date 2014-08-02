define(function(require, exports, module) {
    "use strict";
    var React = require("react");
    var reactObserver = require("mixins/reactObserver");
    var MessagesView = require("./MessagesView");
    var ContactList = require("ui/contacts/ContactList");
    module.exports = React.createClass({
        displayName: "GroupChatPage",
        mixins: [reactObserver],
        getInitialState: function () {
            return {
                messageText: ""
            };
        },
        _onSubmit: function() {
            try {
                this.props.pageModel.model.sendMessage(this.state.messageText);
                this.setState({messageText:""});
            } catch (ex) {
                console.error(ex);
            }
            return false;
        },
        componentDidMount: function() {
            var dialog = this.props.pageModel.model;
            dialog.markAsRead();
            dialog.on("changed", dialog.markAsRead, dialog);
        },
        componentWillUnmount: function() {
            var dialog = this.props.pageModel.model;
            dialog.off("changed", dialog.markAsRead, dialog);
        },
        _onAddPeople: function() {
        },
        _handleAddContact: function(contact) {
        },
        render: function() {
            var groupChat = this.state.model;
            //            var pageModel = this.state.pageModel;
            var router = this.props.router;

            var words = ["POP!", "POOF!", "BANG!", "ZAP!", "WHOOSH!", "POW!", "BONG!", "KA-POW!", "SNAP!", "CRACK!", "SIZZLE!", "BAM!"]
            function randomItem(list) {
                return list[Math.floor(Math.random() * list.length)];
            }

            var input = React.DOM.div({ className: "message-input" },
                React.DOM.form({ onSubmit: this._onSubmit },
                    React.DOM.input({
                        value: this.state.messageText,
                        ref: "inputMessage",
                        onChnage: function (e) { this.setState({ messageText: e.target.value });}.bind(this)
                    })),
                React.DOM.div({ className: "send-button" }, React.DOM.button({ onClick: this._onSubmit }, randomItem(words))));

            return React.DOM.div({ className: "dialog-page app-page" },
                React.DOM.div({ className: "app-page-header" },
                    React.DOM.a({
                        className: "title",
                        href: "",
                        onClick: router.createNavigateHandler("dialogs", groupChat.profile)
                    }, "〈 Group Chat: " + groupChat.name),
                    React.DOM.a({
                        className: "header-button",
                        href: "",
                        onClick: this._onAddPeople
                    }, "Add People")),
                React.DOM.div({ className: "app-page-content has-header has-footer" },
                    MessagesView({ messages: groupChat.messages })),
                   // ContactList({ contacts: dialog.profile.contacts, onClick: this._handleAddContact })),
                React.DOM.div({ className: "app-page-footer" },
                    React.DOM.div({ className: "tabs-header" },
                        React.DOM.div({ className: "tab-title" }, "Secure channel")),
                    React.DOM.div({ className: "tabs-content" },
                        input)));
        }
    });
})

