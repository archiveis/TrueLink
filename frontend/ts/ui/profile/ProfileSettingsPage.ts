    "use strict";
    import EditableField = require("../../ui/common/EditableField");
    import React = require("react");
    import Profile = require("../../models/Profile");
    import reactObserver = require("../../mixins/reactObserver");
    var e = React.createClass({
        displayName: "ProfileSettingsPage",
        mixins: [reactObserver],
        render: function () {
            var profile = this.props.pageModel.model;
            var router = this.props.router;
            var isPublic = profile.publicityType == "public";
            return React.DOM.div(null, 
                React.DOM.div({className: "app-page-header"},
                    React.DOM.a({
                        className: "title",
                        href: "",
                        onClick: router.createNavigateHandler("home", profile.app)
                    }, "Settings for " + profile.name)),
                React.DOM.div({className: "app-page-content has-header"},
                    React.DOM.div({}, "Profile is " + profile.publicityType),
                    EditableField({
                        id: "profileName",
                        onChanged: profile.set.bind(profile, "name"),
                        label: "Profile Name (My Name): ",
                        value: profile.name
                    }),
                    !isPublic ? null : EditableField({
                        id: "email",
                        onChanged: profile.set.bind(profile, "email"),
                        label: "Email: ",
                        value: profile.email
                    }),
                    !isPublic ? null : EditableField({
                        id: "phoneNumber",
                        onChanged: profile.set.bind(profile, "phoneNumber"),
                        label: "Phone number: ",
                        value: profile.phoneNumber
                    }),
                    EditableField({
                        id: "serverUrl",
                        onChanged: profile.set.bind(profile, "serverUrl"),
                        label: "Server URL: ",
                        value: profile.serverUrl
                    }),
                    React.DOM.div({}, "Popup notifications: "),
                    React.DOM.select({
                        onChange: function (event) {
                            profile.set("notificationType", (<any>event.target).value);
                        }, 
                        value: profile.notificationType
                    }, 
                        React.DOM.option({ value: Profile.Profile.NOTIFICATION_NONE }, "None"),
                        React.DOM.option({ value: Profile.Profile.NOTIFICATION_COUNT }, "Only message count."),
                        React.DOM.option({ value: Profile.Profile.NOTIFICATION_MESSAGE }, "Show message text.")
                    ),
                    React.DOM.div({}, "Sound notifications: "),
                    React.DOM.select({
                        onChange: function (event) {
                            profile.set("notificationSound", (<any>event.target).value);
                        }, 
                        value: profile.notificationSound
                    }, 
                        React.DOM.option({ value: "audiotag1" }, "Sound 1"),
                        React.DOM.option({ value: "disabled" }, "Disabled")
                    ))
                );
        }
    });
export = e;
