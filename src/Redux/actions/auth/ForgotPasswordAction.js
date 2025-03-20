import {
  API_METHODS,
  AUTH,
  END_POINT,
  ApiHandler,
  BASE_URL,
} from '../../config';

export const ForgotPasswordAction = data => {
  return async (dispatch, getState) => {
    dispatch({ type: AUTH.FORGOT_PASSWORD_REQUEST });
    const reqParam = {
      "email": data,
      "userType": 'DOCTOR',
    };
    const method = API_METHODS.POST;
    const endPoint = BASE_URL + END_POINT.forgotpassword;
    try {
      const response = await ApiHandler({ endPoint, method, reqParam });
      if (response?.data?.status === 200) {
        if (response?.data?.data) {
          dispatch({
            type: AUTH.FORGOT_PASSWORD_SUCCESS,
            payload: response.data,
          });
        } 
        else {
          dispatch({ type: AUTH.FORGOT_PASSWORD_FAIL, payload: response.data });
        }
      } else {
        dispatch({ type: AUTH.FORGOT_PASSWORD_FAIL, payload: response.data });
      }
    } catch (err) {
      if (err.response?.status === 401) {
        dispatch({ type: AUTH.FORGOT_PASSWORD_FAIL, payload: err.response.data });
      } else {
        dispatch({ type: AUTH.FORGOT_PASSWORD_FAIL, payload: err });
      }
    }
  };
};


export const ClearErrorStatusForgotPassword = data => {
  return async (dispatch, getState) => {
    dispatch({ type: AUTH.CLEAR_ERROR_STATUS_FORGOT_PASSWORD });
  };
};