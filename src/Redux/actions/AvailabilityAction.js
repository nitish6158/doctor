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
            "clinicId": data.clinicId,
            "doctorId": data.doctorId,
            "repeatForWeek": data.repeatForWeek,
            "dateTimeSlotsRequest": {
                "date": data.dateArray,
                "timeSlots": data.timeSlots,
            },
            "createdByClinic": data.createdByClinic
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

export const BlockAvailabilityByFutureTimeAction = data => {
    return async (dispatch, getState) => {
        dispatch({ type: AVAILABILITY.BLOCK_AVAILABILITY_BY_TIME_REQUEST });
        const reqParam = {
            "doctorId": data.doctorId,
            "date": data.date,
            "fromTime": data.fromTime,
            "toTime": data.toTime,
            "reason": data.reason,
        };
        const method = API_METHODS.POST;
        const endPoint = BASE_URL + END_POINT.blockAvailabilityByTime;
        try {
            const response = await ApiHandler({ endPoint, method, reqParam });
            console.log("check ", response)
            if (response?.data?.status === 200) {
                if (response.data?.data) {
                    dispatch({
                        type: AVAILABILITY.BLOCK_AVAILABILITY_BY_TIME_SUCCESS,
                        payload: response.data,
                    });
                }
                else {
                    dispatch({ type: AVAILABILITY.BLOCK_AVAILABILITY_BY_TIME_FAIL, payload: response.data });
                }
            } else {
                dispatch({ type: AVAILABILITY.BLOCK_AVAILABILITY_BY_TIME_FAIL, payload: response.data });
            }
        } catch (err) {
            if (err.response?.status === 401) {
                dispatch({ type: AVAILABILITY.BLOCK_AVAILABILITY_BY_TIME_FAIL, payload: err.response.data });
            } else {
                dispatch({ type: AVAILABILITY.BLOCK_AVAILABILITY_BY_TIME_FAIL, payload: err });
            }
        }
    };
};

export const BlockAvailabilityByTimeSlotIDAction = data => {
    return async (dispatch, getState) => {
        dispatch({ type: AVAILABILITY.BLOCK_AVAILABILITY_BY_TIME_SLOT_REQUEST });
        const reqParam = {
            "date": data.date,
            "doctorID": data.doctorID,
            "timeSlotId": [
                data.timeSlotId
            ]
        }

        const method = API_METHODS.POST;
        const endPoint = BASE_URL + END_POINT.blockAvailabilityByTimeSlot;
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
        console.log(data)
        const reqParam =
        {
            "clinicId": data.clinicId,
            "doctorId": data.doctorId,
            "date": data.date,
        }
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

export const EditSlotAction = data => {
    return async (dispatch, getState) => {
        dispatch({ type: AVAILABILITY.EDIT_SLOT_REQUEST });
        console.log(data)
        const reqParam = {
            "clinicId": data.clinicId,
            "doctorId": data.doctorId,
            "timeSlotId": data.timeSlotId,
            "date": data.date,
            "fromTime": data.fromTime,
            "toTime": data.toTime,
            "location": data.location,
            "mode": data.mode
        }
        const method = API_METHODS.POST;
        const endPoint = BASE_URL + END_POINT.editSlot;
        try {
            const response = await ApiHandler({ endPoint, method, reqParam });
            console.log("check ", response)
            if (response?.data?.status === 200) {
                if (response.data?.data) {
                    dispatch({
                        type: AVAILABILITY.EDIT_SLOT_SUCCESS,
                        payload: response.data,
                    });
                }
                else {
                    dispatch({ type: AVAILABILITY.EDIT_SLOT_FAIL, payload: response.data });
                }
            } else {
                dispatch({ type: AVAILABILITY.EDIT_SLOT_FAIL, payload: response.data });
            }
        } catch (err) {
            if (err.response?.status === 401) {
                dispatch({ type: AVAILABILITY.EDIT_SLOT_FAIL, payload: err.response.data });
            } else {
                dispatch({ type: AVAILABILITY.EDIT_SLOT_FAIL, payload: err });
            }
        }
    };
};

export const DeleteSlotAction = data => {
    return async (dispatch, getState) => {
        dispatch({ type: AVAILABILITY.DELETE_SLOT_REQUEST });
        console.log(data)
        const reqParam = {
            "clinicId": data.clinicId,
            "doctorId": data.doctorId,
            "date": data.date,
            "slotList": [
                data.timeSlotId,
            ]
        }
        const method = API_METHODS.POST;
        const endPoint = BASE_URL + END_POINT.deleteSlot;
        try {
            const response = await ApiHandler({ endPoint, method, reqParam });
            console.log("check ", response)
            if (response?.data?.status === 200) {
                if (response.data?.data) {
                    dispatch({
                        type: AVAILABILITY.DELETE_SLOT_SUCCESS,
                        payload: response.data,
                    });
                }
                else {
                    dispatch({ type: AVAILABILITY.DELETE_SLOT_FAIL, payload: response.data });
                }
            } else {
                dispatch({ type: AVAILABILITY.DELETE_SLOT_FAIL, payload: response.data });
            }
        } catch (err) {
            if (err.response?.status === 401) {
                dispatch({ type: AVAILABILITY.DELETE_SLOT_FAIL, payload: err.response.data });
            } else {
                dispatch({ type: AVAILABILITY.DELETE_SLOT_FAIL, payload: err });
            }
        }
    };
};

export const RestoreDateAction = data => {
    return async (dispatch, getState) => {
        dispatch({ type: AVAILABILITY.RESTORE_DATE_REQUEST });
        console.log(data)
        const reqParam = {
            "doctorId": data.doctorId,
            "date": data.date,
        }
        const method = API_METHODS.POST;
        const endPoint = BASE_URL + END_POINT.restoreDate(reqParam);
        try {
            const response = await ApiHandler({ endPoint, method, reqParam });
            console.log("check ", response)
            if (response?.data?.status === 200) {
                if (response.data?.data) {
                    dispatch({
                        type: AVAILABILITY.RESTORE_DATE_SUCCESS,
                        payload: response.data,
                    });
                }
                else {
                    dispatch({ type: AVAILABILITY.RESTORE_DATE_FAIL, payload: response.data });
                }
            } else {
                dispatch({ type: AVAILABILITY.RESTORE_DATE_FAIL, payload: response.data });
            }
        } catch (err) {
            if (err.response?.status === 401) {
                dispatch({ type: AVAILABILITY.RESTORE_DATE_FAIL, payload: err.response.data });
            } else {
                dispatch({ type: AVAILABILITY.RESTORE_DATE_FAIL, payload: err });
            }
        }
    };
};

export const RestoreSlotAction = data => {
    return async (dispatch, getState) => {
        dispatch({ type: AVAILABILITY.RESTORE_SLOT_REQUEST });
        console.log(data)
        const reqParam = {
        }
        const method = API_METHODS.POST;
        const endPoint = BASE_URL + END_POINT.restoreSlot(data);
        try {
            const response = await ApiHandler({ endPoint, method, reqParam });
            console.log("check ", response)
            if (response?.data?.status === 200) {
                if (response.data?.data) {
                    dispatch({
                        type: AVAILABILITY.RESTORE_SLOT_SUCCESS,
                        payload: response.data,
                    });
                }
                else {
                    dispatch({ type: AVAILABILITY.RESTORE_SLOT_FAIL, payload: response.data });
                }
            } else {
                dispatch({ type: AVAILABILITY.RESTORE_SLOT_FAIL, payload: response.data });
            }
        } catch (err) {
            if (err.response?.status === 401) {
                dispatch({ type: AVAILABILITY.RESTORE_SLOT_FAIL, payload: err.response.data });
            } else {
                dispatch({ type: AVAILABILITY.RESTORE_SLOT_FAIL, payload: err });
            }
        }
    };
};

export const ClearAgendaStatus = data => {
    return async (dispatch, getState) => {
        dispatch({ type: AVAILABILITY.CLEAR_ERROR_STATUS });
    };
};

