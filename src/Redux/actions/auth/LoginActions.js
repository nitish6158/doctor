import {
  API_METHODS,
  AUTH,
  END_POINT,
  ApiHandler,
  BASE_URL,
} from '../../config';


export const LogoutAction = data => {
  return async (dispatch, getState) => {
    dispatch({ type: AUTH.LOGOUT_USER });
  };
};

export const ClearErrorStatus = data => {
  return async (dispatch, getState) => {
    dispatch({ type: AUTH.CLEAR_ERROR_STATUS });
  };
};

export const LoginAction = data => {
  return async (dispatch, getState) => {
    dispatch({ type: AUTH.LOGIN_REQUEST });
    const reqParam = {
      "email": data.email,
      "password": data.password,
      "userType": 'DOCTOR',
    };
    const method = API_METHODS.POST;
    const endPoint = BASE_URL + END_POINT.login;
    try {
      const response = await ApiHandler({ endPoint, method, reqParam });
      if (response?.data?.status === 200) {
        if (response?.data?.data) {
          dispatch({
            type: AUTH.LOGIN_SUCCESS,
            payload: response.data,
          });
        }
        else {
          dispatch({ type: AUTH.LOGIN_FAIL, payload: response.data });
        }
      } else {
        dispatch({ type: AUTH.LOGIN_FAIL, payload: response.data });
      }
    } catch (err) {
      if (err.response?.status === 401) {
        dispatch({ type: AUTH.LOGIN_FAIL, payload: err.response.data });
      } else {
        dispatch({ type: AUTH.LOGIN_FAIL, payload: err });
      }
    }
  };
};

export const UpdateUserInfo = id => {
  return async (dispatch, getState) => {
    dispatch({ type: AUTH.UPDATE_ACCOUNT_REQUEST });

    const reqParam = {
      
    };
   
    const method = API_METHODS.GET;
    const endPoint = BASE_URL + END_POINT.getDoctorDetail(id);
    try {
      console.log("before api call")
      const response = await ApiHandler({ endPoint, method, reqParam });
      console.log("after api call")
      if (response?.data?.status === 200) {
        if (response?.data?.data) {
          dispatch({
            type: AUTH.UPDATE_ACCOUNT_SUCCESS,
            payload: response.data,
          });
        }
        else {
          dispatch({ type: AUTH.UPDATE_ACCOUNT_FAIL, payload: response.data });
        }
      } else {
        dispatch({ type: AUTH.UPDATE_ACCOUNT_FAIL, payload: response.data });
      }
    } catch (err) {
      if (err.response?.status === 401) {
        dispatch({ type: AUTH.UPDATE_ACCOUNT_FAIL, payload: err.response.data });
      } else {
        dispatch({ type: AUTH.UPDATE_ACCOUNT_FAIL, payload: err });
      }
    }
  };
};

