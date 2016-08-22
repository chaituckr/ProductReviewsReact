var AppDispatcher = require('../dispatcher/AppDispatcher');

var ReviewAction = {
    getRatings: function () {
        AppDispatcher.handleViewAction({
            source: 'Review Page',
            actionType: "REVIEW"
        });
    }
};

module.exports = ReviewAction;