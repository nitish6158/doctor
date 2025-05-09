import { AUTH } from "../../config/types";

const initialState = {
  appLanguage: 'EN', // can be "AR" and "FN"
  profileImageUrl: null,
  loginStatus: false,
  selectedClinicId: null,
  selectedClinicName: null,
  isJobAdded: null,
  responseCode: null,
  updateUseResponseCode: null,
  responseCodeLogin: null,
  changePasswordResponseCode: null,
  errMsg: null,
  loading: false,

  authToken: null,
  isVerified: null,
  status: null,

  individual: null,

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
    case AUTH.SET_IMAGE:
      return Object.assign({}, state, {
        profileImageUrl: action.payload,
      });
    case AUTH.SET_JOB_ADDED:
      return Object.assign({}, state, {
        isJobAdded: action.payload,
      });

    case AUTH.SET_IS_VERIFIED:
      return Object.assign({}, state, {
        isVerified: action.payload,
      });

    case AUTH.UPDATE_CLINIC_ID:
      return Object.assign({}, state, {
        selectedClinicId: action.payload.ClinicId,
        selectedClinicName: action.payload.ClinicName,
      });
    case AUTH.UPDATE_JOB_DETAIL:
      return Object.assign({}, state, {
        isJobAdded: action.payload,
      });

    case AUTH.UPDATE_ACCOUNT_REQUEST:
      return Object.assign({}, state, {
        updateLoading: false,
      });

    case AUTH.UPDATE_ACCOUNT_SUCCESS:
      return Object.assign({}, state, {
        isVerified: action?.payload?.data?.isVerified,
        updateLoading: false,
        individual: action?.payload?.data?.individual,
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
        isJobAdded: action?.payload?.data?.isJobAdded
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
        individual: action?.payload?.data?.individual,
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
        isJobAdded: action?.payload?.data?.isJobAdded


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
        isJobAdded: action?.payload?.data?.isJobAdded,
        loginStatus: true,
        isVerified: action?.payload?.data?.isVerified,
        status: action?.payload?.data?.status,
        userData: action?.payload?.data,
        individual: action?.payload?.data?.individual,
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
        updateUseResponseCode: null,
        errMsg: null,
        loading: false,
        authToken: null,
        userData: null,
        userId: null,
        userName: null,
        individual: null,
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
        isJobAdded: null,
        selectedClinicId: null,
        selectedClinicName: null,
      });

    case AUTH.UPDATE_USER_REQUEST:
      return Object.assign({}, state, {
        updateUseResponseCode: null,
        errMsg: null,
        loading: true,
      });
    case AUTH.UPDATE_USER_SUCCESS:
      return Object.assign({}, state, {
        updateUseResponseCode: action?.payload?.status,
        errMsg: action?.payload?.message,
        loading: false,
        isJobAdded: action?.payload?.data?.isJobAdded,
        loginStatus: true,
        isVerified: action?.payload?.data?.isVerified,
        status: action?.payload?.data?.status,
        userData: action?.payload?.data,
        individual: action?.payload?.data?.individual,
        userName: action?.payload?.data?.userName,
        country: action?.payload?.data?.country,
        address: action?.payload?.data?.address,
        firstName: action?.payload?.data?.firstName,
        lastName: action?.payload?.data?.lastName,
        specialization: action?.payload?.data?.specialization,
        cv: action?.payload?.data?.cv,
        userType: action?.payload?.data?.userType,
      });
    case AUTH.UPDATE_USER_FAIL:
      return Object.assign({}, state, {
        updateUseResponseCode: action?.payload?.status,
        errMsg: action?.payload?.message,
        loading: false,
      });

    case AUTH.CHANGE_PASSWORD_REQUEST:
      return Object.assign({}, state, {
        changePasswordResponseCode: null,
        errMsg: null,
        loading: true,
        authToken: null,
      });
    case AUTH.CHANGE_PASSWORD_SUCCESS:
      return Object.assign({}, state, {
        changePasswordResponseCode: action?.payload?.status,
        errMsg: action?.payload?.message,
        loading: false,
        userData: action?.payload?.data,
        authToken: action?.payload?.data?.token,
        userId: action?.payload?.data?.id,
        email: action?.payload?.data?.email,
        userType: action?.payload?.data?.userType,

      });
    case AUTH.CHANGE_PASSWORD_FAIL:
      return Object.assign({}, state, {
        changePasswordResponseCode: action?.payload?.status,
        errMsg: action?.payload?.message,
        loading: false,
      });


    case AUTH.CLEAR_RESPONSE_STATUS_CHANGE_PASSWORD:
      return Object.assign({}, state, {
        changePasswordResponseCode: null,
        errMsg: null,
      });

    case AUTH.CLEAR_UPDATE_ACCOUNT_STATUS:
      return Object.assign({}, state, {
        updateUseResponseCode: null,
        errMsg: null,
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

