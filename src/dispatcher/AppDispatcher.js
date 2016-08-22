import {Dispatcher} from 'flux';
import assign from 'object-assign';

/**
 * Purpose: to create a single dispatcher instance for use throughout the
 * entire app. The two methods below are merely thin wrappers that describe
 * where the action originated from. Not mandatory, but may be helpful
 **/
var AppDispatcher = assign(new Dispatcher(), {

    handleViewAction(action) {
        this.dispatch({
            source: "Review",
            action: action
        });
    }
});

module.exports = AppDispatcher;