import { RATING } from '../config/types';

const initialState = {
  getRatingResponseCode: null,
  errMsg: null,
  loading: false,
  getRatingData: null,
}

const getAllRatingReducer = (state = initialState, action) => {
  switch (action.type) {
      case RATING.GET_RATING_REQUEST:
      return Object.assign({}, state, {
        getRatingResponseCode: null,
        errMsg: null,
        loading: true,
        getRatingData: null,
      });
    case RATING.GET_RATING_SUCCESS:
      return Object.assign({}, state, {
        getRatingResponseCode: action?.payload?.status,
        errMsg: action?.payload?.message,
        loading: false,
        getRatingData: action?.payload?.data,
      });
    case RATING.GET_RATING_FAIL:
      return Object.assign({}, state, {
        getRatingResponseCode: action?.payload?.status,
        errMsg: action?.payload?.message,
        loading: false,
        getRatingData: null,
      });

    default:
      return state;
  }
};

export default getAllRatingReducer;
