import {combineReducers} from 'redux';

import bankReducer from './bankReducer';
import authReducer from './authReducer/authReducer';
import forgotPasswordReducer from './authReducer/forgotPasswordReducer';
import ContractReducer from './contractReducer';
import getAllClinicReducer from './getAllClinicReducer';
import availabilityReducer from './availabilityReducer';
import matchingReducer from './matchingReducer';

const rootReducer = combineReducers({
  authReducer, 
  bankReducer,
  forgotPasswordReducer,
  ContractReducer,
  getAllClinicReducer,
  availabilityReducer,
  matchingReducer
});

export default rootReducer;
