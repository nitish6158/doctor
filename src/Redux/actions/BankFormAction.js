import {
  API_METHODS,
  BANK,
  END_POINT,
  ApiHandler,
  BASE_URL,
} from '../config';

export const BankFormAction = data => {
  return async (dispatch, getState) => {
    dispatch({ type: BANK.BANK_FORM_REQUEST });
    const reqParam =
    {
      "id":data.id,
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
      "iban": data.iban,
      "swiftBicCode": data.swiftBicCode,
      "sirenNo": data.sirenNo,
    };

    const method = API_METHODS.POST;
    const endPoint = BASE_URL + END_POINT.bankform;
    try {
      const response = await ApiHandler({ endPoint, method, reqParam });
      console.log("check ", response)
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


export const ClearBankStatus = data => {
  return async (dispatch, getState) => {
    dispatch({ type: BANK.CLEAR_BANK_STATUS });
  };
};