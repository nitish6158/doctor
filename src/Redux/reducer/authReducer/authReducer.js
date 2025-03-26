import { AUTH } from "../../config/types";

const initialState = {
  appLanguage: 'EN', // can be "AR" and "FN"
  loginStatus: false,

  responseCode: null,
  responseCodeLogin: null,
  errMsg: null,
  loading: false,

  authToken: null,
  isVerified: null,
  status: null,

  updateLoading: false,

  userData: null,
  userId: null,
  userName: null,
  email: null,
  mobileNumber: null,
  country: null,
  address: null,
  firstName: null,
  lastName: null,
  specialization: null,
  cv: null,
  country: null,
  address: null,
  userType: null,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {

    case AUTH.SET_LANGUAGE:
      return Object.assign({}, state, {
        appLanguage: action.payload,
      });

    case AUTH.UPDATE_ACCOUNT_REQUEST:
      return Object.assign({}, state, {
        updateLoading: true,
      });
    case AUTH.UPDATE_ACCOUNT_SUCCESS:
      return Object.assign({}, state, {
        isVerified: action?.payload?.data?.isVerified,
        updateLoading: false,
        userData: action?.payload?.data,
        status: action?.payload?.data?.status,
        userName: action?.payload?.data?.userName,
        email: action?.payload?.data?.email,
        mobileNumber: action?.payload?.data?.mobileNo,
        country: action?.payload?.data?.country,
        address: action?.payload?.data?.address,
        firstName: action?.payload?.data?.firstName,
        lastName: action?.payload?.data?.lastName,
        specialization: action?.payload?.data?.specialization,
        cv: action?.payload?.data?.cv,
        userType: action?.payload?.data?.userType,
      });
    case AUTH.UPDATE_ACCOUNT_FAIL:
      return Object.assign({}, state, {
        updateLoading: false,
      });

    case AUTH.LOGIN_REQUEST:
      return Object.assign({}, state, {
        responseCodeLogin: null,
        errMsg: null,
        loading: true,
        authToken: null,
      });
    case AUTH.LOGIN_SUCCESS:
      return Object.assign({}, state, {
        responseCodeLogin: action?.payload?.status,
        errMsg: action?.payload?.message,
        loading: false,
        loginStatus: true,
        userData: action?.payload?.data,
        isVerified: action?.payload?.data?.isVerified,
        status: action?.payload?.data?.status,
        authToken: action?.payload?.data?.token,
        userId: action?.payload?.data?.id,
        userName: action?.payload?.data?.userName,
        email: action?.payload?.data?.email,
        mobileNumber: action?.payload?.data?.mobileNo,
        country: action?.payload?.data?.country,
        address: action?.payload?.data?.address,
        firstName: action?.payload?.data?.firstName,
        lastName: action?.payload?.data?.lastName,
        specialization: action?.payload?.data?.specialization,
        cv: action?.payload?.data?.cv,
        userType: action?.payload?.data?.userType,

      });
    case AUTH.LOGIN_FAIL:
      return Object.assign({}, state, {
        responseCodeLogin: action?.payload?.status,
        errMsg: action?.payload?.message,
        loading: false,
      });

    case AUTH.SIGNUP_REQUEST:
      return Object.assign({}, state, {
        responseCode: null,
        errMsg: null,
        loading: true,
        authToken: null,
      });
    case AUTH.SIGNUP_SUCCESS:
      return Object.assign({}, state, {
        responseCode: action?.payload?.status,
        errMsg: action?.payload?.message,
        loading: false,

        loginStatus: true,
        isVerified: action?.payload?.data?.isVerified,
        status: action?.payload?.data?.status,
        userData: action?.payload?.data,

        authToken: action?.payload?.data?.token,
        userId: action?.payload?.data?.id,
        userName: action?.payload?.data?.userName,
        email: action?.payload?.data?.email,
        mobileNumber: action?.payload?.data?.mobileNo,
        country: action?.payload?.data?.country,
        address: action?.payload?.data?.address,
        firstName: action?.payload?.data?.firstName,
        lastName: action?.payload?.data?.lastName,
        specialization: action?.payload?.data?.specialization,
        cv: action?.payload?.data?.cv,
        userType: action?.payload?.data?.userType,

      });
    case AUTH.SIGNUP_FAIL:
      return Object.assign({}, state, {
        responseCode: action?.payload?.status,
        errMsg: action?.payload?.message,
        loading: false,
      });

    case AUTH.LOGOUT_USER:
      return Object.assign({}, state, {
        loginStatus: false,
        isVerified: null,
        status: null,
        responseCode: null,
        responseCodeLogin: null,
        errMsg: null,
        loading: false,
        authToken: null,
        userData: null,
        userId: null,
        userName: null,
        email: null,
        mobileNumber: null,
        country: null,
        address: null,
        firstName: null,
        lastName: null,
        specialization: null,
        cv: null,
        country: null,
        address: null,
        userType: null,
      });

    case AUTH.CLEAR_ERROR_STATUS:
      return Object.assign({}, state, {
        responseCodeLogin: null,
        errMsg: null,
      });

    case AUTH.CLEAR_RESPONSE_STATUS:
      return Object.assign({}, state, {
        responseCode: null,
        errMsg: null,
      });

    default:
      return state;
  }
};

export default authReducer;

