import {
  API_METHODS,
  AUTH,
  END_POINT,
  ApiHandler,
  BASE_URL,
} from '../../config';

export const ChangePassowordAction = data => {
  return async (dispatch, getState) => {
    dispatch({ type: AUTH.CHANGE_PASSWORD_REQUEST });
    const reqParam = {
      "email": data.email,
      "password": data.password,
      "newPassword": data.newPassword,
      "token": data.token,
      "userType": "DOCTOR"
    }
    const method = API_METHODS.POST;
    const endPoint = BASE_URL + END_POINT.changePassword;
    try {
      const response = await ApiHandler({ endPoint, method, reqParam });
      if (response?.data?.status === 200) {
        if (response?.data?.data) {
          dispatch({
            type: AUTH.CHANGE_PASSWORD_SUCCESS,
            payload: response.data,
          });
        } else {
          dispatch({ type: AUTH.CHANGE_PASSWORD_FAIL, payload: response.data });
        }
      } else {
        dispatch({ type: AUTH.CHANGE_PASSWORD_FAIL, payload: response.data });
      }
    } catch (err) {
      if (err.response?.status === 401) {
        dispatch({ type: AUTH.CHANGE_PASSWORD_FAIL, payload: err.response.data });
      } else {
        dispatch({ type: AUTH.CHANGE_PASSWORD_FAIL, payload: err });
      }
    }
  };
};

export const ClearStatusChangePassword = data => {
  return async (dispatch, getState) => {
    dispatch({ type: AUTH.CLEAR_RESPONSE_STATUS_CHANGE_PASSWORD });
  };
};

