import { CONTRACT } from '../config/types';

const initialState = {
  responseCode: null,
  errMsg: null,
  loading: false,
  data:null,
}

const ContractReducer = (state = initialState, action) => {
  switch (action.type) {
    case CONTRACT.CONTRACT_REQUEST:
      return Object.assign({}, state, {
        responseCode: null,
        errMsg: null,
        loading: true,
        data:null,
      });
    case CONTRACT.CONTRACT_SUCCESS:
      return Object.assign({}, state, {
        responseCode: action?.payload?.status,
        errMsg: action?.payload?.message,
        loading: false,
        data:action?.payload?.data,
      });
    case CONTRACT.CONTRACT_FAIL:
      return Object.assign({}, state, {
        responseCode: action?.payload?.status,
        errMsg: action?.payload?.message,
        loading: false,
        data:null,
      });
    case CONTRACT.CLEAR_CONTRACT_STATUS:
      return Object.assign({}, state, {
        responseCode: null,
        errMsg: null,
      });

    default:
      return state;
  }
};

export default ContractReducer;
