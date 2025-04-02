import { AVAILABILITY } from '../config/types';

const initialState = {
  responseCode: null,
  errMsg: null,
  loading: false,
  data: null,
}

const availabilityReducer = (state = initialState, action) => {
  switch (action.type) {
    case AVAILABILITY.ADD_AVAILABILITY_REQUEST:
      return Object.assign({}, state, {
        responseCode: null,
        errMsg: null,
        loading: true,
        data: null,
      });
    case AVAILABILITY.ADD_AVAILABILITY_SUCCESS:
      return Object.assign({}, state, {
        responseCode: action?.payload?.status,
        errMsg: action?.payload?.message,
        loading: false,
        data: action?.payload?.data,
      });
    case AVAILABILITY.ADD_AVAILABILITY_FAIL:
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

export default availabilityReducer;
