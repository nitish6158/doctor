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
            "clinicId": data.clinicId,
            "doctorId":data.doctorId,
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
        const reqParam =
            {
                "clinicId": data.clinicId,
                "doctorId": data.doctorId,
                "date": data.date,
                "timeSlots": data.timeSlots,
                "createdByClinic": data.createdByClinic
            }

            // timesholt array defincaiton :
            // [
            // {
            //     "fromTime": "string",
            //     "toTime": "string",
            //     "type": "string",
            //     "location": "string"
            // },
            // ]

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