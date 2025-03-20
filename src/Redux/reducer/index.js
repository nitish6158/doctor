import {combineReducers} from 'redux';

import bankReducer from './bankReducer';
import authReducer from './authReducer/authReducer';
import forgotPasswordReducer from './authReducer/forgotPasswordReducer';

const rootReducer = combineReducers({
  authReducer, 
  bankReducer,
  forgotPasswordReducer,
});

export default rootReducer;
