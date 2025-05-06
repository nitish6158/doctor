import {
    API_METHODS,
    RATING,
    END_POINT,
    ApiHandler,
    BASE_URL,
} from '../config';

export const GetAllRatingAction = data => {
    console.log(data.vaish)
    // return async (dispatch, getState) => {
    //     dispatch({ type: RATING.GET_RATING_REQUEST });
    //     const reqParam =
    //     {
    //         "pageIndex": 0,
    //         "pageSize": 0,
    //         "searchText": data.searchText,
    //         "direction": data.direction,
    //         "filterByFieldName": data.filterByFieldName,
    //         "clinicId": 0,
    //         "doctorId": data.doctorId
    //     }
    //     const method = API_METHODS.POST;
    //     const endPoint = BASE_URL + END_POINT.getAllRating;
    //     try {
    //         const response = await ApiHandler({ endPoint, method, reqParam });
    //         if (response?.data?.status === 200) {
    //             if (response.data?.data) {
    //                 dispatch({
    //                     type: RATING.GET_RATING_SUCCESS,
    //                     payload: response.data,
    //                 });
    //             }
    //             else {
    //                 dispatch({ type: RATING.GET_RATING_FAIL, payload: response.data });
    //             }
    //         } else {
    //             dispatch({ type: RATING.GET_RATING_FAIL, payload: response.data });
    //         }
    //     } catch (err) {
    //         if (err.response?.status === 401) {
    //             dispatch({ type: RATING.GET_RATING_FAIL, payload: err.response.data });
    //         } else {
    //             dispatch({ type: RATING.GET_RATING_FAIL, payload: err });
    //         }
    //     }
    // };
};
