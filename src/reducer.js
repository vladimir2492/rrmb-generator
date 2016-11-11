import { combineReducers } from 'redux';
// BOT: Reducer imports here
import scalableReducer from 'modules/scalable-module'

const rootReducer = combineReducers({
    // BOT: Reducer list here
  scalable: scalableReducer,

});

export default rootReducer;
