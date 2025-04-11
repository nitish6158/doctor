import { LOCATION } from '../config/types';

const initialState = {
  responseCode: null,
  errMsg: null,
  loading: false,
  addLocationData: null,
  getLocationData: null,
  deleteLocationData: null,
}

const locationReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOCATION.ADD_LOCATION_REQUEST:
      return Object.assign({}, state, {
        responseCode: null,
        errMsg: null,
        loading: true,
        addLocationData: null,
      });
    case LOCATION.ADD_LOCATION_SUCCESS:
      return Object.assign({}, state, {
        responseCode: action?.payload?.status,
        errMsg: action?.payload?.message,
        loading: false,
        addLocationData: action?.payload?.data,
      });
    case LOCATION.ADD_LOCATION_FAIL:
      return Object.assign({}, state, {
        responseCode: action?.payload?.status,
        errMsg: action?.payload?.message,
        loading: false,
        addLocationData: null,
      });


    case LOCATION.GET_LOCATION_REQUEST:
      return Object.assign({}, state, {
        responseCode: null,
        errMsg: null,
        loading: true,
        getLocationData: null,
      });
    case LOCATION.GET_LOCATION_SUCCESS:
      return Object.assign({}, state, {
        responseCode: action?.payload?.status,
        errMsg: action?.payload?.message,
        loading: false,
        getLocationData: action?.payload?.data,
      });
    case LOCATION.GET_LOCATION_FAIL:
      return Object.assign({}, state, {
        responseCode: action?.payload?.status,
        errMsg: action?.payload?.message,
        loading: false,
        getLocationData: null,
      });
    case LOCATION.DELETE_LOCATION_REQUEST:
      return Object.assign({}, state, {
        responseCode: null,
        errMsg: null,
        loading: true,
        deleteLocationData: null,
      });
    case LOCATION.DELETE_LOCATION_SUCCESS:
      return Object.assign({}, state, {
        responseCode: action?.payload?.status,
        errMsg: action?.payload?.message,
        loading: false,
        deleteLocationData: action?.payload?.data,
      });
    case LOCATION.DELETE_LOCATION_FAIL:
      return Object.assign({}, state, {
        responseCode: action?.payload?.status,
        errMsg: action?.payload?.message,
        loading: false,
        deleteLocationData: null,
      });
    case LOCATION.CLEAR_LOCATION_STATUS:
      return Object.assign({}, state, {
        responseCode: null,
        errMsg: null,
      });

    default:
      return state;
  }
};

export default locationReducer;
