import { BANK } from '../config/types';

const initialState = {
  responseCode: null,
  errMsg: null,
  loading: false,
  data:null,
}

const bankReducer = (state = initialState, action) => {
  switch (action.type) {
    case BANK.BANK_FORM_REQUEST:
      return Object.assign({}, state, {
        responseCode: null,
        errMsg: null,
        loading: true,
        data:null,
      });
    case BANK.BANK_FORM_SUCCESS:
      return Object.assign({}, state, {
        responseCode: action?.payload?.status,
        errMsg: action?.payload?.message,
        loading: false,
        data:action?.payload?.data,
      });
    case BANK.BANK_FORM_FAIL:
      return Object.assign({}, state, {
        responseCode: action?.payload?.status,
        errMsg: action?.payload?.message,
        loading: false,
        data:null,
      });

    default:
      return state;
  }
};

export default bankReducer;
