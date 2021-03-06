"use strict";
import React = require("react");
import uuid = require("uuid");

var exp = React.createClass({
    displayName: "ContactList",
    propTypes: {
        contacts: React.PropTypes.array,
        onClick: React.PropTypes.func,
        checkBoxes: React.PropTypes.bool,
        currentUser: React.PropTypes.string
    },
    getInitialState: function() {
        return {
            checked: []
        };
    },

    componentWillReceiveProps: function (nextProps) {
        this.initCheckBoxes(nextProps);
    },

    componentWillMount: function () {
        this.initCheckBoxes(this.props);
    },

    initCheckBoxes: function (props) {
        if (props.checkBoxes || true) {
            this.state.checked = new Array(props.contacts.length);
        }
    },

    onClick: function (i, e) {
        this.state.checked[i] = !!!this.state.checked[i];
        this.setState({ checked: this.state.checked });
        e.stopPropagation();
    },

    onCommand: function () {
        if (this.props.onCommand) {
            var contacts = [];
            for (var key in this.state.checked) {
                if (this.state.checked[key]) {
                    contacts.push(this.props.contacts[key]);
                }
            }
            this.props.onCommand(contacts);
        }
    },

    render: function() {
        var cancelButton = (this.props.onCancel) ? (React.DOM.input({ 
            type: "button", 
            onClick: this.props.onCancel, 
            value: "Cancel" 
            })) : null;
        return React.DOM.div({},
            this.props.contacts.map(function(contact, index) {
                var fieldId = uuid.v4();
                var cb = (this.props.currentUser === contact.name) ? (undefined) :
                    (React.DOM.input({
                        id: fieldId,
                        type: "checkbox",
                        onClick: this.onClick.bind(null, index),
                        checked: this.state.checked[index]
                    }));
                return React.DOM.div({
                    className: "generic-block contact clearfix"
                   // onClick: (this.props.onClick)?(this.props.onClick.bind(null, contact)):(undefined)
                },
                    React.DOM.div({ className: "contact-image" }, ""),
                    React.DOM.div({
                        "data-name": contact.name,
                        className: "contact-title"
                        },
                        React.DOM.label({
                            htmlFor: fieldId
                            },
                            contact.name
                        ), cb)
                    );
            }, this),
            React.DOM.input({ 
                type: "button", 
                onClick: this.onCommand, 
                value: this.props.buttonText
            }),
            cancelButton
            );
    }
});

export = exp;
