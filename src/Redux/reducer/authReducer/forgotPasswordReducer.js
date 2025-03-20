import { AUTH } from "../../config/types";
const initialState = {
    responseCode: null,
    errMsg: null,
    loading: false,
};

const forgotPasswordReducer = (state = initialState, action) => {
    switch (action.type) {
        case AUTH.FORGOT_PASSWORD_REQUEST:
            return Object.assign({}, state, {
                responseCode: null,
                errMsg: null,
                loading: true,
                authToken: null,
            });
        case AUTH.FORGOT_PASSWORD_SUCCESS:
            return Object.assign({}, state, {
                responseCode: action?.payload?.status,
                errMsg: action?.payload?.message,
                loading: false,
            });
        case AUTH.FORGOT_PASSWORD_FAIL:
            return Object.assign({}, state, {
                responseCode: action?.payload?.status,
                errMsg: action?.payload?.message,
                loading: false,
            });
        case AUTH.CLEAR_ERROR_STATUS_FORGOT_PASSWORD:
            return Object.assign({}, state, {
                responseCode: null,
                errMsg: null,
            });
        default:
            return state;
    }
};

export default forgotPasswordReducer;

