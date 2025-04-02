export const BASE_URL = 'http://151.106.34.159:4000/api/v1';

export const END_POINT = {
  login: '/authController/login',
  signup: '/doctor/doctorProfileRegister',
  forgotpassword: '/authController/forgotPassword',
  fileUpload: '/authController/uploadPost',
  specilization: lang => `/admin/getSpecializationByType?lang=${lang}`,
  getDoctorProfile: leng => `/doctor/get_doctor_profile?type=${leng}`,
  getCountry: leng => `/doctor/get_country?type=${leng}`,
  bankform: '/doctor/addBankDetails',
  getContractUrl: userId => `/doctor/download_contract?doctorId=${userId}&type=${"DOCTOR"}`,
  // uploadContract: '/doctor/upload_contract_file',
  sendContract: data => `/doctor/send_contract?doctorId=${data.doctorId}&contract=${data.contractURL}&type=${data.type}`,
  getDoctorDetail: Id => `/doctor/doctorDetailsById?doctorId=${Id}`,
  getClinics: doctorId => `/doctor/findAllClinicByDoctorId?doctorId=${doctorId}`,
  addAvailability:'/doctor/add_Availability',
};