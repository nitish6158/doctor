import {
    API_METHODS,
    AVAILABILITY,
    END_POINT,
    ApiHandler,
    BASE_URL,
} from '../config';

export const getAvailabilityAction = data => {
    return async (dispatch, getState) => {
        dispatch({ type: AVAILABILITY.GET_AVAILABILITY_REQUEST });
        const reqParam =
        {
            "doctorId": data.doctorId,
            "date": data.date
        }

        const method = API_METHODS.POST;
        const endPoint = BASE_URL + END_POINT.getAvailability;
        try {
            const response = await ApiHandler({ endPoint, method, reqParam });
            console.log("check ", response)
            if (response?.data?.status === 200) {
                if (response.data?.data) {
                    dispatch({
                        type: AVAILABILITY.GET_AVAILABILITY_SUCCESS,
                        payload: response.data,
                    });
                }
                else {
                    dispatch({ type: AVAILABILITY.GET_AVAILABILITY_FAIL, payload: response.data });
                }
            } else {
                dispatch({ type: AVAILABILITY.GET_AVAILABILITY_FAIL, payload: response.data });
            }
        } catch (err) {
            if (err.response?.status === 401) {
                dispatch({ type: AVAILABILITY.GET_AVAILABILITY_FAIL, payload: err.response.data });
            } else {
                dispatch({ type: AVAILABILITY.GET_AVAILABILITY_FAIL, payload: err });
            }
        }
    };
};

export const AddAvailabilityAction = data => {
    return async (dispatch, getState) => {
        dispatch({ type: AVAILABILITY.ADD_AVAILABILITY_REQUEST });
        const reqParam = {
            "clinicId": 0,
            "doctorId": data.doctorId,
            "repeatForWeek": data.repeatForWeek,
            "dateTimeSlotsRequest": {
                "date": data.date,
                "timeSlots": data.timeSlots,
            },
            "createdByClinic": 0
        }
        const method = API_METHODS.POST;
        const endPoint = BASE_URL + END_POINT.addAvailability;
        try {
            const response = await ApiHandler({ endPoint, method, reqParam });
            console.log("check ", response)
            if (response?.data?.status === 200) {
                if (response.data?.data) {
                    dispatch({
                        type: AVAILABILITY.ADD_AVAILABILITY_SUCCESS,
                        payload: response.data,
                    });
                }
                else {
                    dispatch({ type: AVAILABILITY.ADD_AVAILABILITY_FAIL, payload: response.data });
                }
            } else {
                dispatch({ type: AVAILABILITY.ADD_AVAILABILITY_FAIL, payload: response.data });
            }
        } catch (err) {
            if (err.response?.status === 401) {
                dispatch({ type: AVAILABILITY.ADD_AVAILABILITY_FAIL, payload: err.response.data });
            } else {
                dispatch({ type: AVAILABILITY.ADD_AVAILABILITY_FAIL, payload: err });
            }
        }
    };
};

export const BlockAvailabilityByDateAction = data => {
    return async (dispatch, getState) => {
        dispatch({ type: AVAILABILITY.BLOCK_AVAILABILITY_BY_DATE_REQUEST });
        const reqParam = {
            "doctorId": data.doctorId,
            "fromDate": data.fromDate,
            "toDate": data.toDate,
            "reason": data.reason,
        }
        const method = API_METHODS.POST;
        const endPoint = BASE_URL + END_POINT.blockAvailabilityByDate;
        try {
            const response = await ApiHandler({ endPoint, method, reqParam });
            console.log("check ", response)
            if (response?.data?.status === 200) {
                if (response.data?.data) {
                    dispatch({
                        type: AVAILABILITY.BLOCK_AVAILABILITY_BY_DATE_SUCCESS,
                        payload: response.data,
                    });
                }
                else {
                    dispatch({ type: AVAILABILITY.BLOCK_AVAILABILITY_BY_DATE_FAIL, payload: response.data });
                }
            } else {
                dispatch({ type: AVAILABILITY.BLOCK_AVAILABILITY_BY_DATE_FAIL, payload: response.data });
            }
        } catch (err) {
            if (err.response?.status === 401) {
                dispatch({ type: AVAILABILITY.BLOCK_AVAILABILITY_BY_DATE_FAIL, payload: err.response.data });
            } else {
                dispatch({ type: AVAILABILITY.BLOCK_AVAILABILITY_BY_DATE_FAIL, payload: err });
            }
        }
    };
};

export const BlockAvailabilityByTimeSlotIDAction = data => {
    return async (dispatch, getState) => {
        dispatch({ type: AVAILABILITY.BLOCK_AVAILABILITY_BY_TIME_SLOT_REQUEST });
        const reqParam = {
            "date": data.date,
            "doctorID": data.doctorId,
            "timeSlotId": [
                data.timeSlotId
            ]
        }

        const method = API_METHODS.POST;
        const endPoint = BASE_URL + END_POINT.blockAvailabilityByTime;
        try {
            const response = await ApiHandler({ endPoint, method, reqParam });
            console.log("check ", response)
            if (response?.data?.status === 200) {
                if (response.data?.data) {
                    dispatch({
                        type: AVAILABILITY.BLOCK_AVAILABILITY_BY_TIME_SLOT_SUCCESS,
                        payload: response.data,
                    });
                }
                else {
                    dispatch({ type: AVAILABILITY.BLOCK_AVAILABILITY_BY_TIME_SLOT_FAIL, payload: response.data });
                }
            } else {
                dispatch({ type: AVAILABILITY.BLOCK_AVAILABILITY_BY_TIME_SLOT_FAIL, payload: response.data });
            }
        } catch (err) {
            if (err.response?.status === 401) {
                dispatch({ type: AVAILABILITY.BLOCK_AVAILABILITY_BY_TIME_SLOT_FAIL, payload: err.response.data });
            } else {
                dispatch({ type: AVAILABILITY.BLOCK_AVAILABILITY_BY_TIME_SLOT_FAIL, payload: err });
            }
        }
    };
};

export const TeamAvailabilityListAction = data => {
    return async (dispatch, getState) => {
        dispatch({ type: AVAILABILITY.TEAM_AVAILABILITY_LIST_REQUEST });
        const reqParam =
        // {
        //     "clinicId": data.clinicId,
        //     "doctorId": data.doctorId,
        //     "date": data.date,
        // }
        {
            "clinicId": 46,
            "doctorId": 121,
            "date": "10-04-2025"
          };
        const method = API_METHODS.POST;
        const endPoint = BASE_URL + END_POINT.teamAvailabilityList;
        try {
            const response = await ApiHandler({ endPoint, method, reqParam });
            console.log("check ", response)
            if (response?.data?.status === 200) {
                if (response.data?.data) {
                    dispatch({
                        type: AVAILABILITY.TEAM_AVAILABILITY_LIST_SUCCESS,
                        payload: response.data,
                    });
                }
                else {
                    dispatch({ type: AVAILABILITY.TEAM_AVAILABILITY_LIST_FAIL, payload: response.data });
                }
            } else {
                dispatch({ type: AVAILABILITY.TEAM_AVAILABILITY_LIST_FAIL, payload: response.data });
            }
        } catch (err) {
            if (err.response?.status === 401) {
                dispatch({ type: AVAILABILITY.TEAM_AVAILABILITY_LIST_FAIL, payload: err.response.data });
            } else {
                dispatch({ type: AVAILABILITY.TEAM_AVAILABILITY_LIST_FAIL, payload: err });
            }
        }
    };
};


export const ClearAgendaStatus = data => {
    return async (dispatch, getState) => {
        dispatch({ type: AVAILABILITY.CLEAR_ERROR_STATUS });
    };
};

