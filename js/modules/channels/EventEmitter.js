define(["./Event", "tools/invariant"], function (Event, invariant) {
    "use strict";
    function EventEmitter() {}

    EventEmitter.prototype = {
        _defineEvent: function (name) {
            this.events = this.events || {};
            this.events[name] = new Event();
        },
        _checkEvent: function (name) {
            invariant(this.events[name], "No %s event defined for this emitter", name);
        },
        on: function (name, cb, context) {
            this._checkEvent(name);
            this.events[name].addHandler(cb, context);
        },
        off: function (name, cb) {
            this._checkEvent(name);
            this.events[name].removeHandler(cb);
        },
        fire: function (name, args) {
            this._checkEvent(name);
            this.events[name].fire(args, this);
        },
        checkEventHandlers: function () {
            var unhandled = [], name;
            for (name in this.events) {
                if (this.events.hasOwnProperty(name) && !this.events[name].hasHandlers()) {
                    unhandled.push(name);
                }
            }
            if (unhandled.length > 0) {
                console.warn("No one is listening for events %s of ", unhandled.join(", "), this);
            }
        }
    };
    return EventEmitter;
});