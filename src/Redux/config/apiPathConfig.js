export const BASE_URL = 'http://151.106.34.159:4000/api/v1';

export const END_POINT = {
  login: '/authController/login',
  signup: '/doctor/doctorProfileRegister',
  forgotpassword:'/authController/forgotPassword',
  fileUpload:'/authController/uploadPost',
  specilization:lang=>`/admin/getSpecializationByType?lang=${lang}`,
  getDoctorProfile:'/doctor/get_doctor_profile',
  bankform:'/doctor/addBankDetails',
  getContractUrl: userId=> `/doctor/download_contract?doctorId=${userId}&type=${"DOCTOR"}`,

  uploadContract:'/doctor/upload_contract_file',
  
};
