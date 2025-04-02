import { CLINIC } from "../config/types";
const initialState = {
  responseCode: null,
  errMsg: null,
  loading: false,
  data: null,
}

const getAllClinicReducer = (state = initialState, action) => {
  switch (action.type) {
    case CLINIC.GET_CLINIC_REQUEST:
      return Object.assign({}, state, {
        responseCode: null,
        errMsg: null,
        loading: true,
        data: null,
      });
    case CLINIC.GET_CLINIC_SUCCESS:
      return Object.assign({}, state, {
        responseCode: action?.payload?.status,
        errMsg: action?.payload?.message,
        loading: false,
        data: action?.payload,
      });
    case CLINIC.GET_CLINIC_FAIL:
      return Object.assign({}, state, {
        responseCode: action?.payload?.status,
        errMsg: action?.payload?.message,
        loading: false,
        data: null,
      });
    default:
      return state;
  }
};

export default getAllClinicReducer;



