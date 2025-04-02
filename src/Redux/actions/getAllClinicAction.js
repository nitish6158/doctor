import {
  API_METHODS,
  CLINIC,
  END_POINT,
  ApiHandler,
  BASE_URL,
} from '../config';


export const GetAllClinicAction = doctorId => {
  return async (dispatch, getState) => {
    dispatch({ type: CLINIC.GET_CLINIC_REQUEST });
    const reqParam = {
    };
    const method = API_METHODS.GET;
    const endPoint = BASE_URL + END_POINT.getClinics(doctorId);
    try {
      const response = await ApiHandler({ endPoint, method, reqParam });
      console.log(response,'vaishnaviiiiiii')
      if (response?.data?.status === 200) {
        if (response?.data?.data) {
          dispatch({
            type: CLINIC.GET_CLINIC_SUCCESS,
            payload: response?.data?.data,
          });
        }
        else {
          dispatch({ type: CLINIC.GET_CLINIC_FAIL, payload: response.data });
        }
      } else {
        dispatch({ type: CLINIC.GET_CLINIC_FAIL, payload: response.data });
      }
    } catch (err) {
      if (err.response?.status === 401) {
        dispatch({ type: CLINIC.GET_CLINIC_FAIL, payload: err.response.data });
      } else {
        dispatch({ type: CLINIC.GET_CLINIC_FAIL, payload: err });
      }
    }
  };
};
