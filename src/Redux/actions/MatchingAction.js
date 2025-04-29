import {
    API_METHODS,
    MATCHING,
    END_POINT,
    ApiHandler,
    BASE_URL,
    AUTH,
} from '../config';

export const addMatchingAction = data => {
    return async (dispatch, getState) => {
        dispatch({ type: MATCHING.ADD_MATCHING_REQUEST });
        const reqParam =
        {
            "id": data.id,
            "country": data.country,
            "address": data.address,
            "specialization": data.specialization,
            "experience": data.experience,
            "type": data.type, //online/offline
            "doctorId": data.doctorId,
            "profile": data.profile
        }

        const method = API_METHODS.POST;
        const endPoint = BASE_URL + END_POINT.addMatching;
        try {
            const response = await ApiHandler({ endPoint, method, reqParam });
            if (response?.data?.status === 200) {
                if (response.data?.data) {
                    dispatch({
                        type: MATCHING.ADD_MATCHING_SUCCESS,
                        payload: response.data,
                    });
                    dispatch({
                        type: AUTH.UPDATE_JOB_DETAIL,
                        payload: 1,
                    });
                }
                else {
                    dispatch({ type: MATCHING.ADD_MATCHING_FAIL, payload: response.data });
                }
            } else {
                dispatch({ type: MATCHING.ADD_MATCHING_FAIL, payload: response.data });
            }
        } catch (err) {
            if (err.response?.status === 401) {
                dispatch({ type: MATCHING.ADD_MATCHING_FAIL, payload: err.response.data });
            } else {
                dispatch({ type: MATCHING.ADD_MATCHING_FAIL, payload: err });
            }
        }
    };
};

export const getMyJobData = id => {
    return async (dispatch, getState) => {
        dispatch({ type: MATCHING.GET_JOB_DATA_REQUEST });
        const reqParam = {}
        const method = API_METHODS.GET;
        const endPoint = BASE_URL + END_POINT.myJobData(id);
        try {
            const response = await ApiHandler({ endPoint, method, reqParam });
            if (response?.data?.status === 200) {
                if (response.data?.data) {
                    dispatch({
                        type: MATCHING.GET_JOB_DATA_SUCCESS,
                        payload: response.data,
                    });
                }
                else {
                    dispatch({ type: MATCHING.GET_JOB_DATA_FAIL, payload: response.data });
                }
            } else {
                dispatch({ type: MATCHING.GET_JOB_DATA_FAIL, payload: response.data });
            }
        } catch (err) {
            if (err.response?.status === 401) {
                dispatch({ type: MATCHING.GET_JOB_DATA_FAIL, payload: err.response.data });
            } else {
                dispatch({ type: MATCHING.GET_JOB_DATA_FAIL, payload: err });
            }
        }
    };
};

export const getMyMatchingAction = data => {
    return async (dispatch, getState) => {
        dispatch({ type: MATCHING.MY_MATCHING_REQUEST });
        const reqParam =
        {
            "pageIndex": data.pageIndex,
            "pageSize": data.pageSize,
            "searchText": data.searchText,
            "direction": data.direction,
            "filterByFieldName": data.filterByFieldName,
            "clinicId": 0,
            "status": 1,
            "country": data.country,
            "address": data.address,
            "specialization": data.specialization,
            "experience": data.experience,
            "type": data.type,
        }

        // {
        //     "pageIndex": 0,
        //     "pageSize": 0,
        //     "searchText": "",
        //     "direction": "",
        //     "filterByFieldName": "",
        //     "clinicId": 0,
        //     "status": 1,
        //     "country": "EMIRATES",
        //     "address": "Dewas",
        //     "specialization": "Dermatologisttt",
        //     "experience": "8",
        //     "type": "offline"
        //   }


        const method = API_METHODS.POST;
        const endPoint = BASE_URL + END_POINT.myMatchings;
        try {
            const response = await ApiHandler({ endPoint, method, reqParam });
            if (response?.data?.status === 200) {
                if (response.data?.data) {
                    dispatch({
                        type: MATCHING.MY_MATCHING_SUCCESS,
                        payload: response.data,
                    });
                }
                else {
                    dispatch({ type: MATCHING.MY_MATCHING_FAIL, payload: response.data });
                }
            } else {
                dispatch({ type: MATCHING.MY_MATCHING_FAIL, payload: response.data });
            }
        } catch (err) {
            if (err.response?.status === 401) {
                dispatch({ type: MATCHING.MY_MATCHING_FAIL, payload: err.response.data });
            } else {
                dispatch({ type: MATCHING.MY_MATCHING_FAIL, payload: err });
            }
        }
    };
};

export const ClearStatusMatching = data => {
    return async (dispatch, getState) => {
        dispatch({ type: MATCHING.CLEAR_RESPONSE_STATUS });
    };
};



export const ClearMatchingReducer = data => {
    return async (dispatch, getState) => {
        dispatch({ type: MATCHING.CLEAR_REDUCER })
    };
};