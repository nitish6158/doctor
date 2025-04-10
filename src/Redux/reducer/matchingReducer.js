import { MATCHING } from '../config/types';

const initialState = {
  errMsg: null,
  responseCode: null,
  responseCode2: null,
  loading: false,
  data: null,
  addMatchingData: null,
  getJobData: null,
  myMatchingData:null,
}

const matchingReducer = (state = initialState, action) => {
  switch (action.type) {
    case MATCHING.ADD_MATCHING_REQUEST:
      return Object.assign({}, state, {
        responseCode2: null,
        errMsg: null,
        loading: true,
        addMatchingData: null,
      });
    case MATCHING.ADD_MATCHING_SUCCESS:
      return Object.assign({}, state, {
        responseCode2: action?.payload?.status,
        errMsg: action?.payload?.message,
        loading: false,
        addMatchingData: action?.payload?.data,
      });
    case MATCHING.ADD_MATCHING_FAIL:
      return Object.assign({}, state, {
        responseCode2: action?.payload?.status,
        errMsg: action?.payload?.message,
        loading: false,
        addMatchingData: null,
      });

    case MATCHING.GET_JOB_DATA_REQUEST:
      return Object.assign({}, state, {
        responseCode: null,
        errMsg: null,
        loading: true,
        getJobData: null,
      });
    case MATCHING.GET_JOB_DATA_SUCCESS:
      return Object.assign({}, state, {
        responseCode: action?.payload?.status,
        errMsg: action?.payload?.message,
        loading: false,
        getJobData: action?.payload?.data,
      });
    case MATCHING.GET_JOB_DATA_FAIL:
      return Object.assign({}, state, {
        responseCode: action?.payload?.status,
        errMsg: action?.payload?.message,
        loading: false,
        getJobData: null,
      });
    case MATCHING.MY_MATCHING_REQUEST:
      return Object.assign({}, state, {
        responseCode: null,
        errMsg: null,
        loading: true,
        myMatchingData: null,
      });
    case MATCHING.MY_MATCHING_SUCCESS:
      return Object.assign({}, state, {
        responseCode: action?.payload?.status,
        errMsg: action?.payload?.message,
        loading: false,
        myMatchingData: action?.payload?.data,
      });
    case MATCHING.MY_MATCHING_FAIL:
      return Object.assign({}, state, {
        responseCode: action?.payload?.status,
        errMsg: action?.payload?.message,
        loading: false,
        myMatchingData: null,
      });
    case MATCHING.CLEAR_RESPONSE_STATUS:
      return Object.assign({}, state, {
        errMsg: null,
        responseCode2:null
      });


    default:
      return state;
  }
};

export default matchingReducer;
