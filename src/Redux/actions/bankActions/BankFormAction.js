import {
  API_METHODS,
  BANK,
  END_POINT,
  ApiHandler,
  BASE_URL3,
} from '../../config';

export const BankFormAction = data => {
  return async (dispatch, getState) => {
    dispatch({ type: BANK.BANK_FORM_REQUEST });
    const reqParam = {
      // "id": 0,
      // "bankName": "HDFC",
      // "accountNumber": "56548654956001",
      // "accountType": "saving",
      // "bankAddress": "Indore",
      // "nationalId": 100,
      // "branchName": "badoda",
      // "bankCode": "2002",
      // "languageType": "enfligh",
      // "doctorId": 101,
      // "doctorName": "anil jain",
      // "email": "raja@yopmail.com",
      // "mobileNumber": "7872738723",
      // "countryName": "india",

      "id": 0,
      "bankName": data.bankName,
      "accountNumber": data.accountNumber,
      "accountType": data.accountType,
      "bankAddress": data.bankAddress,
      "nationalId": data.nationalId,
      "branchName": data.branchName,
      "bankCode": data.bankCode,
      "languageType": data.languageType,
      "doctorId": data.doctorId,
      "doctorName": data.doctorName,
      "email": data.email,
      "mobileNumber": data.mobileNumber,
      "countryName": data.countryName,

    };
    const method = API_METHODS.POST;
    const endPoint = BASE_URL3 + END_POINT.bankform;
    try {
      const response = await ApiHandler({ endPoint, method, reqParam });
      if (response?.data?.status === 200) {
        if (response.data?.data) {
          dispatch({
            type: BANK.BANK_FORM_SUCCESS,
            payload: response.data,
          });
        }
        else {
          dispatch({ type: BANK.BANK_FORM_FAIL, payload: response.data });
        }
      } else {
        dispatch({ type: BANK.BANK_FORM_FAIL, payload: response.data });
      }
    } catch (err) {
      if (err.response?.status === 401) {
        dispatch({ type: BANK.BANK_FORM_FAIL, payload: err.response.data });
      } else {
        dispatch({ type: BANK.BANK_FORM_FAIL, payload: err });
      }
    }
  };
};
