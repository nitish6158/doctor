import {
    AUTH,
  } from '../config';
export const UpdateClinicIdAction = data => {
  return async (dispatch, getState) => {
    dispatch({
        type: AUTH.UPDATE_CLINIC_ID,
        payload: data,
      });
  };
};
