import {
    API_METHODS,
    CONTRACT,
    END_POINT,
    ApiHandler,
    BASE_URL,
  } from '../config';
  

export const SendContract = data => {
  return async (dispatch, getState) => {
    dispatch({ type: CONTRACT.CONTRACT_REQUEST });
    const reqParam = {
    };
    const method = API_METHODS.GET;
    const endPoint = BASE_URL + END_POINT.sendContract(data);
    try {
      const response = await ApiHandler({ endPoint, method, reqParam });
      if (response?.data?.status === 200) {
        if (response?.data?.data) {
          dispatch({
            type: CONTRACT.CONTRACT_SUCCESS,
            payload: response.data,
          });
        }
        else {
          dispatch({ type: CONTRACT.CONTRACT_FAIL, payload: response.data });
        }
      } else {
        dispatch({ type: CONTRACT.CONTRACT_FAIL, payload: response.data });
      }
    } catch (err) {
      if (err.response?.status === 401) {
        dispatch({ type: CONTRACT.CONTRACT_FAIL, payload: err.response.data });
      } else {
        dispatch({ type: CONTRACT.CONTRACT_FAIL, payload: err });
      }
    }
  };
};


export const ClearContractStatus = data => {
  return async (dispatch, getState) => {
    dispatch({ type: CONTRACT.CLEAR_CONTRACT_STATUS });
  };
};