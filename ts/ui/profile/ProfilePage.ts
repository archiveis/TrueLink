    "use strict";
    import React = require("react");
    import reactObserver = require("mixins/reactObserver");
    export = React.createClass({
        displayName: "ProfilePage",
        mixins: [reactObserver],
        render: function () {
            var profile = this.state.model;
//            var router = this.props.router;
            return React.DOM.div(null, "Profile Settings: " + profile.name);
        }
    });
