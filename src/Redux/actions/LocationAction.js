import {
  API_METHODS,
  LOCATION,
  END_POINT,
  ApiHandler,
  BASE_URL,
} from '../config';

export const AddLocationAction = data => {
  return async (dispatch, getState) => {
    dispatch({ type: LOCATION.ADD_LOCATION_REQUEST });
    const reqParam = 
    {
        "id": data.id,
        "doctorId": data.doctorId,
        "locationName": data.locationName,
        "buildingName": data.buildingName,
        "address": data.address
      }
    
    const method = API_METHODS.POST;
    const endPoint = BASE_URL + END_POINT.addLocation;
    try {
      const response = await ApiHandler({ endPoint, method, reqParam });
      console.log("check ",response)
      if (response?.data?.status === 200) {
        if (response.data?.data) {
          dispatch({
            type: LOCATION.ADD_LOCATION_SUCCESS,
            payload: response.data,
          });
        }
        else {
          dispatch({ type: LOCATION.ADD_LOCATION_FAIL, payload: response.data });
        }
      } else {
        dispatch({ type: LOCATION.ADD_LOCATION_FAIL, payload: response.data });
      }
    } catch (err) {
      if (err.response?.status === 401) {
        dispatch({ type: LOCATION.ADD_LOCATION_FAIL, payload: err.response.data });
      } else {
        dispatch({ type: LOCATION.ADD_LOCATION_FAIL, payload: err });
      }
    }
  };
};

export const GetLocationAction = id => {
  return async (dispatch, getState) => {
    dispatch({ type: LOCATION.GET_LOCATION_REQUEST });
    const reqParam = {}
    
    const method = API_METHODS.GET;
    const endPoint = BASE_URL + END_POINT.getLocation(id);
    try {
      const response = await ApiHandler({ endPoint, method, reqParam });
      console.log("check ",response)
      if (response?.data?.status === 200) {
        if (response.data?.data) {
          dispatch({
            type: LOCATION.GET_LOCATION_SUCCESS,
            payload: response.data,
          });
        }
        else {
          dispatch({ type: LOCATION.GET_LOCATION_FAIL, payload: response.data });
        }
      } else {
        dispatch({ type: LOCATION.GET_LOCATION_FAIL, payload: response.data });
      }
    } catch (err) {
      if (err.response?.status === 401) {
        dispatch({ type: LOCATION.GET_LOCATION_FAIL, payload: err.response.data });
      } else {
        dispatch({ type: LOCATION.GET_LOCATION_FAIL, payload: err });
      }
    }
  };
};

export const DeleteLocationAction = id => {
  return async (dispatch, getState) => {
    dispatch({ type: LOCATION.DELETE_LOCATION_REQUEST });
    const reqParam = {}
    
    const method = API_METHODS.GET;
    const endPoint = BASE_URL + END_POINT.deleteLocation(id);
    try {
      const response = await ApiHandler({ endPoint, method, reqParam });
      console.log("check ",response)
      if (response?.data?.status === 200) {
        if (response.data?.data) {
          dispatch({
            type: LOCATION.DELETE_LOCATION_SUCCESS,
            payload: response.data,
          });
        }
        else {
          dispatch({ type: LOCATION.DELETE_LOCATION_FAIL, payload: response.data });
        }
      } else {
        dispatch({ type: LOCATION.DELETE_LOCATION_FAIL, payload: response.data });
      }
    } catch (err) {
      if (err.response?.status === 401) {
        dispatch({ type: LOCATION.DELETE_LOCATION_FAIL, payload: err.response.data });
      } else {
        dispatch({ type: LOCATION.DELETE_LOCATION_FAIL, payload: err });
      }
    }
  };
};


export const ClearLocationStatus = data => {
  return async (dispatch, getState) => {
    dispatch({ type: LOCATION.CLEAR_LOCATION_STATUS });
  };
};

