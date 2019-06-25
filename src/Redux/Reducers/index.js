import { combineReducers } from 'redux';

import AuthReducer from './AuthReducer';
import CommonReducer from './CommonReducer';

export default combineReducers({
    auth: AuthReducer,
    common: CommonReducer,
});