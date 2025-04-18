import {
  API_METHODS,
  AUTH,
  END_POINT,
  ApiHandler,
  BASE_URL,
} from '../../config';

export const SignupAction = data => {
  return async (dispatch, getState) => {
    dispatch({ type: AUTH.SIGNUP_REQUEST });
    const reqParam = {
      "firstName": data.firstName,
      "lastName": data.lastName,
      "password": data.password,
      "email": data.email,
      "mobileNo": data.mobileNo,
      "profile": "DOCTOR",
      "cv": data.cv,
      "specialization": data.specialization,
      "country": data.country,
      "address": data.address,
      "language": data.language,
      "gender": data.gender,
      "clinicId": 0,
      "id": 0,
      "experience": "",
      "review": "",
      "description": "",
      "image": "",
    };

    const method = API_METHODS.POST;
    const endPoint = BASE_URL + END_POINT.signup;
    try {
      const response = await ApiHandler({ endPoint, method, reqParam });
      if (response?.data?.status === 200) {
        if (response?.data?.data) {
          dispatch({
            type: AUTH.SIGNUP_SUCCESS,
            payload: response.data,
          });
        } else {
          dispatch({ type: AUTH.SIGNUP_FAIL, payload: response.data });
        }
      } else {
        dispatch({ type: AUTH.SIGNUP_FAIL, payload: response.data });
      }
    } catch (err) {
      if (err.response?.status === 401) {
        dispatch({ type: AUTH.SIGNUP_FAIL, payload: err.response.data });
      } else {
        dispatch({ type: AUTH.SIGNUP_FAIL, payload: err });
      }
    }
  };
};

export const ClearStatusSignup = data => {
  return async (dispatch, getState) => {
    dispatch({ type: AUTH.CLEAR_RESPONSE_STATUS });
  };
};