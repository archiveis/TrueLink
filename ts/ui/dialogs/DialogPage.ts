    "use strict";
    import React = require("react");
    import reactObserver = require("mixins/reactObserver");
    import MessagesView = require("./MessagesView");
    import ContactList = require("ui/contacts/ContactList");
    var exp = React.createClass({
        displayName: "DialogPage",
        mixins: [reactObserver],
        getInitialState: function () {
            return {
                gcDisplayName: this.props.pageModel.model.profile.name
            }
        },
        _onSubmit: function() {
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
        componentDidMount: function () {
            var dialog = this.props.pageModel.model;
            dialog.markAsRead();
            dialog.on("changed", dialog.markAsRead, dialog);
        },
        componentWillUnmount: function () {
            var dialog = this.props.pageModel.model;
            dialog.off("changed", dialog.markAsRead, dialog);
        },
        _onAddPeople: function () {
            this.state.pageModel.set("mode", "addPeople");
            //invite contact from current dialog to new group chat . test
            //this._handleAddContact(null);
            return false;
        },

        _handleCancelAddContact: function () {
            this.state.pageModel.set("mode", "messages");
        },

        _handleAddContact: function (contacts) {
            var dialog = this.state.model;
            var profile = dialog.profile;
            if (contacts.indexOf(dialog.contact) == -1) {
                contacts.push(dialog.contact);
            }

            var chat = profile.startGroupChat(null, dialog.contact, this.state.gcDisplayName);
            for (var key in contacts) {
                var contact = contacts[key];
                if(contact.tlConnection.canSendMessages()){
                    var invitation = chat.grConnection._activeTlgr.generateInvitation();
                    contact.sendTlgrInvite({invite: invitation});
                }
            }
            this.props.router.createNavigateHandler("groupChat", chat)();
            return false;
        },
        _onConfigure: function () {
            var dialog = this.props.pageModel.model;
            // TODO this is kinda dumb
            this.props.router.navigate("contact", dialog.contact);
        },

        _handleGoToChat: function (id) {
            var chat = this.state.model.profile.groupChatByInviteId(id);
            if (chat) {
                this.props.router.createNavigateHandler("groupChat", chat)();
            }
        },

        render: function () {
            var dialog = this.state.model;
            //            var pageModel = this.state.pageModel;
            var router = this.props.router;

            var words = ["POP!", "POOF!", "BANG!", "ZAP!", "WHOOSH!", "POW!", "BONG!", "KA-POW!", "SNAP!", "CRACK!", "SIZZLE!", "BAM!"]
            function randomItem (list) {
                return list[Math.floor(Math.random() * list.length)];
            }

            var input = React.DOM.div({ className: "message-input" },
                React.DOM.form({ onSubmit: this._onSubmit }, React.DOM.input({ ref: "inputMessage" })),
                React.DOM.div({ className: "send-button" }, React.DOM.button({ onClick: this._onSubmit }, randomItem(words))));
            var configure = React.DOM.div({ className: "message-input" },
                React.DOM.button({ onClick: this._onConfigure }, "Configure secure channel"));
            var content = null;
            if (this.state.pageModel.mode === "addPeople") {
                content = [
                    ContactList({
                        buttonText: "Invite",
                        contacts: dialog.profile.contacts,
                        checkBoxes: true,
                        onCancel: this._handleCancelAddContact,
                        onCommand: this._handleAddContact
                    }),
                    React.DOM.input({
                        type: "text",
                        onChange: function (e) {
                            this.setState({ gcDisplayName: e.target.value });
                        }.bind(this),
                        value: this.state.gcDisplayName
                    })
                ];
            }else {
                content = MessagesView({ profile: dialog.profile, messages: dialog.messages, onGoToChat: this._handleGoToChat });
            }

            return React.DOM.div({ className: "dialog-page app-page" },
                React.DOM.div({ className: "app-page-header" },
                    React.DOM.a({
                        className: "title",
                        href: "",
                        onClick: router.createNavigateHandler("dialogs", dialog.profile)
                    }, "〈 Dialog: " + dialog.name),
                    React.DOM.a({
                        className: "header-button",
                        href: "",
                        onClick: this._onAddPeople
                    }, "Add People")),
                React.DOM.div({ className: "app-page-content has-header has-footer" },
                    content),
                   // ContactList({ contacts: dialog.profile.contacts, onClick: this._handleAddContact })),
                React.DOM.div({ className: "app-page-footer" },
                    React.DOM.div({ className: "tabs-header" },
                        React.DOM.div({ className: "tab-title" }, "Secure channel")),
                    React.DOM.div({ className: "tabs-content" },
                        dialog.hasSecureChannels() ? input : configure)));
        }
    });
export = exp;