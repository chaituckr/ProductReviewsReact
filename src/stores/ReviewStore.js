var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var Constants = require('../constants/Constants');
var assign = require('object-assign');

var ratings = [];

var ReviewStore = assign({}, EventEmitter.prototype, {
    getRating: function () {
        return ratings;
    },
    emitChange: function () {
        this.emit("REVIEW");
    },
    addChangeListener: function (cb) {
        this.on("REVIEW", cb);
    },
    removeChangeListener: function (cb) {
        this.removeListener("REVIEW", cb);
    }
});

AppDispatcher.register(function (payload) {
    var action = payload.action;
    switch (action.actionType) {
        case "REVIEW":
            ratings = Constants.response;
            ReviewStore.emitChange();
            /*We can make ajax calls here*/
    }
});

module.exports = ReviewStore;