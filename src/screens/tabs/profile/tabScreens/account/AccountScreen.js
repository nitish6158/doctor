import React, { useState, useEffect, } from 'react';
import {
  View,
  Text,
  TextInput,
  ImageBackground,
  TouchableOpacity,
  Image,
  ScrollView,
  Alert,
} from 'react-native';
import { Images } from '../../../../../assets';
import { Cameragallery, Loader } from '../../../../../components/modal';
import { AccountStyle } from './AccountStyles';
import { FloatingBackgroundCard } from '../../../../../components/card';
import {
  CustomButton,
  UploadFileButton,
  MultiStepToggle,
  DownloadButton,
} from '../../../../../components/button';
import {
  CustomTextInput,
  MobileNumberInput,
  AddressInput
} from '../../../../../components/input';
import { CustomDropdown } from '../../../../../components/dropdown';
import { useTranslation } from '../../../../../components/customhooks';
import { useFileUpload } from '../../../../../components/customhooks';
import { END_POINT } from '../../../../../Redux/config';
import { SignupStyles } from '../../../../auth/signup/SignupStyles';
import { Colors, ResponsiveFont, Fonts } from '../../../../../assets';
import { usePdfDownloader, useApi } from '../../../../../components/customhooks';
import { FILE_BASE_URL } from '../../../../../Redux/config';
import { BankFormStyles } from '../../../../container/bankDetailsForm/BankFormStyles';
import {
  BankFormAction,
  ClearBankStatus,
  ClearContractStatus,
  SendContract,
  UpdateUserInfo,
  UpdateUserProfileAction,
} from '../../../../../Redux/actions';
import { connect } from 'react-redux';
import { getRequest } from '../../../../../Redux/config';
import { handleMediaSelection } from '../../../../../utility/Helperfunction';
import { useMediaSelectorAndUploader } from '../../../../../components/customhooks';

const genderOptions = [
  { label: 'Male', icon: Images.male },
  { label: 'Female', icon: Images.female },
  { label: 'Other', icon: Images.other },
];
const NexttextStyle = {
  fontSize: ResponsiveFont(18),
  lineHeight: ResponsiveFont(49),
}

const AccountScreen = (props) => {

  const t = useTranslation()
  const {
    downloadFile,
    loading: downloadLoading,
    error: downloadError,
    success
  } = usePdfDownloader();

  const [selectedStep, setSelectedStep] = useState(0);

  const lang = props?.appLanguage?.toLowerCase()
  const [specializationArr, setSpecializationArr] = useState(null)
  const [profileArr, setProfileArr] = useState(null)
  const [countryArr, setCountryArr] = useState([])
  const [firstName, setFirstName] = useState(props?.userData?.firstName);
  const [lastName, setLastName] = useState(props?.userData?.lastName);
  const [email, setEmail] = useState(props?.userData?.email);
  const [phone, setPhone] = useState(props?.userData?.mobileNo);
  const [selectedCode, setSelectedCode] = useState({
    "code": props?.userData?.code,
    "name": 'something',
  } || {});
  const { uploadFile, loading, fileUrl, error } = useFileUpload(END_POINT.fileUpload);
  const [uploadedFile, setUploadedFile] = useState(null);
  const [profile, setProfile] = useState(props?.userData?.profile);
  const [specialization, setSpecialization] = useState(props?.userData?.specialization);
  const [country, setCountry] = useState(props?.userData?.country);
  const [fees, setFees] = useState(props?.userData?.fees);
  const [experience, setExperience] = useState(props?.userData?.experience)
  const [language, setLanguage] = useState('');
  const [description, setDescription] = useState('');
  const [selectedGender, setSelectedGender] = useState(props?.userData?.gender);
  const [profileImage, setProfileImage] = useState(dummyImage);

  const { handleImageUpload,
    isUploading
  } = useMediaSelectorAndUploader(
    (uploadedUrl) => {
      setProfileImage(FILE_BASE_URL + uploadedUrl);     // set uploaded image to state
      // console.log("change", uploadedUrl)
    },
    () => setmediamodal(false)
  );
  const [mediamodal, setmediamodal] = useState(false)

  const handleUploadPicture = async () => {
    setmediamodal(true);
  };





  const [pdfUrl, setPdfUrl] = useState(null)
  const [uploadedFileURL, setUploadedFileURL] = useState(null);

  const [isModal, setIsmodal] = useState(false);

  const [fullName, setFullName] = useState('');
  const [bankAccountNumber, setBankAccountNumber] = useState('');
  const [bankName, setBankName] = useState('');
  const [bankAccountType, setBankAccountType] = useState('');
  const [nationalId, setNationalId] = useState('');
  const [address, setAddress] = useState('');
  const [bankCode, setBankCode] = useState('');
  const [branchName, setBranchName] = useState('');



  const [iban, setIban] = useState('');
  const [swiftBicCode, setSwiftBicCode] = useState('');
  const [sirenNo, setSirenNo] = useState('');

  const getVisibleFields = (countryName = '') => {
    const upperCountry = countryName.trim().toUpperCase();

    return {
      showIban: ['FRANCE', 'GERMANY'].includes(upperCountry),
      showSirenNo: upperCountry === 'FRANCE',
      showNationalId: ['SAUDI ARABIA', 'UNITED ARAB EMIRATES'].includes(upperCountry),
      showBankCode: ['FRANCE', 'GERMANY'].includes(upperCountry), // optional for Gulf
    };
  };

  const {
    showIban,
    showSirenNo,
    showNationalId,
    showBankCode
  } = getVisibleFields(country);



  useEffect(() => {
    fetchDoctorProfile();
    fetchDoctorSpecialization();
    fetchDoctorCountry();
    if (!pdfUrl) {
      fetchPdfUrl()
    }
  }, []);
  const fetchDoctorProfile = async () => {
    try {
      const data = await getRequest(END_POINT.getDoctorProfile(lang)); // No params needed
      console.log("Doctor profile Data:", data);
      setProfileArr(data?.data);
    } catch (err) {
      console.warn("Error fetching Profile :", err);
    }
  };
  const fetchDoctorSpecialization = async () => {
    try {
      const data = await getRequest(END_POINT.specilization(lang));
      if (data && data?.data) {
        setSpecializationArr(data.data)
      }
    } catch (err) {
      console.warn("Error fetching specializations:", err);
    }
  };
  const fetchDoctorCountry = async () => {
    try {
      const data = await getRequest(END_POINT.getCountry(props?.appLanguage?.toLowerCase()));
      if (data && data?.data) {
        setCountryArr(data?.data)
      }
    } catch (err) {
      console.warn("Error fetching specializations:", err);
    }
  };
  const fetchPdfUrl = async () => {
    try {
      const data = await getRequest(END_POINT.getContractUrl(props.userId));
      if (data && data?.data) {
        setPdfUrl(data.data)
      }
    } catch (err) {
      console.warn("Error fetching specializations:", err);
    }
  };
  const ClearcontractStatus = async () => {
    props.ClearContractStatus()
  }

  const handleFileUpload = async () => {
    const response = await uploadFile();
    if (response?.success) {
      setUploadedFile(response?.fileUrl);
    }
  };
  const sendContract = async () => {
    const contractData = {
      doctorId: props.userId,
      contractURL: uploadedFileURL,
      type: "DOCTOR"
    };
    props.SendContract(contractData)
  };


  const handleUserDetail = async () => {

    if (profile == '') {
      ToastMsg(t('PleaseSelectProfile'), 'bottom');
      return false;
    }

    if (specialization == '') {
      ToastMsg(t('SelectSpecialization'), 'bottom');
      return false;
    }
    const cleanedPhone = phone.replace(/^0+/, '');

    const reqParams = {
      "id": props.userId,
      "firstName": firstName,
      "lastName": lastName,
      "dateOfBirth": "",
      "profile": profile,
      "cv": uploadedFile,
      "specialization": specialization,
      "country": country,
      "address": address,
      "language": props.appLanguage?.toLowerCase(),
      "gender": selectedGender,
      "code": selectedCode?.code,
      "experience": experience,
      "review": "",
      "description": description,
      "image": profileImage,
      "fees": fees,
    }
    await props.UpdateUserProfileAction(reqParams);
  }

  const handleBankDetails = async () => {
    const cleanedPhone = phone.replace(/^0+/, '');
    let reqParam = {
      "doctorName": fullName,
      "accountNumber": bankAccountNumber,
      "bankName": bankName,
      "accountType": bankAccountType,
      "nationalId": nationalId,
      "bankAddress": address,
      "email": email,
      "mobileNumber": cleanedPhone,
      "countryName": country,
      "branchName": branchName,
      "bankCode": bankCode,
      "languageType": props.appLanguage?.toLowerCase(),
      "doctorId": props.userId,
      "iban": iban,
      "swiftBicCode": swiftBicCode,
      "sirenNo": sirenNo,
    }
    await props.BankFormAction(reqParam);
  }

  const handleFinishSetup = async () => {
    // await handleBankDetails();
    // await handleUserDetail();
    // await sendContract();
  };

  const handleSuccess = () => {

  }
  const handleFailer = () => {

  }

  useEffect(() => {
    if (props.contractStatus == 200 &&
      props.BankResponseCode == 200 &&
      props.updateUseResponseCode == 200) {
      handleSuccess()
    } else {
      handleFailer()
    }
  }, [
    props.contractStatus,
    props.BankResponseCode,
    props.updateUseResponseCode,

  ])


  return (
    <ImageBackground
      source={Images.backgroundImage}
      style={AccountStyle.background}
      resizeMode="cover"
    >
      <View style={AccountStyle.header}>
        <View style={{ flex: 2, }}>
        </View>
        <View style={AccountStyle.header5}>
          <TouchableOpacity
            style={AccountStyle.backIconContainer}
            onPress={() => {
              props.navigation.goBack()
            }}>
            <Image
              source={Images.back_Icon}
              style={AccountStyle.backIcon}
            />
          </TouchableOpacity>
          <Text style={AccountStyle.tabName}>My Profile</Text>
        </View>

      </View>


      <FloatingBackgroundCard customStyles={AccountStyle.floatingCard}>

        <View style={{ flex: 1, width: "100%", alignItems: 'center' }}>
          <View style={AccountStyle.blankSpace}></View>

          <View style={AccountStyle.workingSpace}>
            <MultiStepToggle
              currentStep={selectedStep}
              onToggle={(index) => setSelectedStep(index)}
              steps={["Personnal", "Professional", "Contract", "Bank"]}
              width='91%'
            />
            <ScrollView
              contentContainerStyle={AccountStyle.scroolContainer}
              showsVerticalScrollIndicator={false}
            >

              {
                selectedStep == 0 &&
                <>
                  <CustomTextInput
                    heading={t('firstName')}
                    placeholder={t('EnterFirstName')}
                    value={firstName}
                    onChangeText={setFirstName}
                    type="text"
                    width='100%'
                    editIcon={true}
                  />
                  <CustomTextInput
                    heading={t('lastName')}
                    placeholder={t('EnterlastName')}
                    value={lastName}
                    onChangeText={setLastName}
                    type="text"
                    width='100%'
                    editIcon={true}
                  />
                  <CustomTextInput
                    heading={t('Email')}
                    placeholder={t('enterEmail')}
                    value={email}
                    onChangeText={setEmail}
                    type="email"
                    width='100%'
                    editable={false}

                  />
                  <View style={{ width: '100%', marginVertical: '1%' }}>
                    <MobileNumberInput
                      heading={t('mobileNo')}
                      value={phone}
                      onChangePhone={setPhone}
                      selectedCode={selectedCode}
                      onChangeCode={setSelectedCode}
                      countries={countryArr}
                      editable={false}
                    />
                  </View>

                  <View style={{ marginVertical: '1%' }}>
                    <View style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'space-between'
                    }}>
                      <Text style={SignupStyles.label}>
                        {t('SelectGender')}
                      </Text>
                      <Image
                        source={Images.editBlack}
                        style={AccountStyle.editIcon}
                        resizeMode='contain'
                      />
                      {/* {editIcon && (
                        <TouchableOpacity onPress={onPressEditIcon}>
                          <Image source={Images.editBlack} style={styles.editIcon} resizeMode='contain' />
                        </TouchableOpacity>
                      )} */}
                    </View>

                    <View style={SignupStyles.genderContainer}>
                      {genderOptions.map((option, index) => (
                        <TouchableOpacity
                          key={index}
                          style={[
                            SignupStyles.selectGender,
                            selectedGender === option.label && SignupStyles.selectedGender,
                          ]}
                          onPress={() => setSelectedGender(option.label)}>
                          <Image source={option.icon} style={SignupStyles.icon} />
                          <Text style={SignupStyles.genderText}>{option.label}</Text>
                        </TouchableOpacity>
                      ))}
                    </View>
                  </View>
                </>
              }
              {
                selectedStep == 1 &&
                <>
                  <View style={AccountStyle.profilePicEditArea}>

                    <View style={AccountStyle.editImageContainer}>
                      <Image
                        source={Images.Thumbnail}
                        style={AccountStyle.thumbnailIMG}
                        resizeMode='contain'
                      />
                      {/* <TouchableOpacity 
                      onPress={()=>{handleUploadPicture()}}
                      style={AccountStyle.editImageIcon2}>
                        <Image source={Images.editProfile} style={AccountStyle.inputIcon} />
                      </TouchableOpacity> */}
                    </View>

                    <View style={AccountStyle.editImageDetail}>

                      <Text style={AccountStyle.thumbnail}>Thumbnail Image</Text>

                      <View style={AccountStyle.pointsCover}>
                        <View style={AccountStyle.markCover}>
                          <Image
                            source={Images.exclamation}
                            style={AccountStyle.exclamation}
                            resizeMode='contain'
                          />
                        </View>
                        <Text style={AccountStyle.shortThumbnail}>Image should in</Text>
                        <Text style={AccountStyle.shortThumbnail2}>290px - 345px</Text>
                      </View>
                      <View style={AccountStyle.pointsCover}>
                        <View style={AccountStyle.markCover}>
                          <Image
                            source={Images.exclamation}
                            style={AccountStyle.exclamation}
                            resizeMode='contain'
                          />
                        </View>
                        <Text style={AccountStyle.shortThumbnail}>Image With Transparent Background</Text>
                      </View>

                    </View>
                  </View>

                  <CustomDropdown
                    heading={t('SelectProfile')}
                    placeholder={t('Select')}
                    selectedValue={profile}
                    onValueChange={setProfile}
                    options={profileArr}
                    width='100%'
                    type="profile"
                  />
                  <CustomDropdown
                    heading={"Specialization"}
                    placeholder={t('Select')}
                    selectedValue={specialization}
                    onValueChange={setSpecialization}
                    options={specializationArr}
                    width='100%'
                    type="specialization"
                  />
                  <CustomTextInput
                    heading={"Fees"}
                    placeholder={"Enter Fees"}
                    value={fees}
                    onChangeText={setFees}
                    type="fees"
                    width='100%'
                    editIcon={true}
                    isEditable={false}
                  />
                  <CustomTextInput
                    heading={"Years of Experience"}
                    placeholder={"Enter Experience"}
                    value={experience}
                    onChangeText={setExperience}
                    type="experience"
                    width='100%'
                    editIcon={true}
                    isEditable={false}
                  />
                  <View style={{ width: '100%', marginVertical: '1%' }}>
                    <AddressInput
                      heading={"Language Known"}
                      placeholder={"English"}
                      value={language}
                      onChangeText={setLanguage}
                      width='100%'
                      autocapitalize="words"
                      editIcon={true}
                    />
                  </View>
                  <View style={{ width: '100%', marginVertical: '1%' }}>
                    <AddressInput
                      heading={"Profile Description"}
                      placeholder={"I am Doctor"}
                      value={description}
                      onChangeText={setDescription}
                      width='100%'
                    />
                  </View>
                  {props?.isVerified == 1 &&
                    <DownloadButton
                      heading={"CV"}
                      title={"CV.pdf"}
                      onPress={() => downloadFile(FILE_BASE_URL + "" + props?.userData?.cv)}
                      width='100%'
                      textStyle={AccountStyle.textStyle}
                      disabled={downloadLoading}
                      paddingVertical="0%"
                    />
                  }
                </>
              }

              {
                selectedStep == 2 &&
                <>
                  <DownloadButton
                    heading={t('SignDownloadContract')}
                    title={t('DownloadContract')}
                    onPress={() => downloadFile(FILE_BASE_URL + "" + pdfUrl)}
                    width='100%'
                    textStyle={BankFormStyles.textStyle}
                    disabled={downloadLoading || pdfUrl == null}
                  />
                  <UploadFileButton
                    heading={t('UploadSignedContract')}
                    title={t('UploadContract')}
                    onPress={() => {
                      handleFileUpload()
                    }}
                    width='100%'
                    fileurl={uploadedFileURL}
                  />
                  {/* <CustomButton
                    title={t('FinishSetup')}
                    onPress={sendContract}
                    backgroundColor={Colors.blue}
                    textColor={Colors.white}
                    textStyle={NexttextStyle}
                    width='100%'
                    disabled={uploadedFileURL ? false : true}
                  /> */}
                </>
              }

              {selectedStep == 3 &&
                <View style={AccountStyle.bankContainer}>
                  <CustomDropdown
                    heading={t('SelectCountry')}
                    placeholder={t('Select')}
                    selectedValue={country}
                    onValueChange={setCountry}
                    options={countryArr}
                    width='90%'
                    type="country"
                    required={true}
                  />
                  <CustomTextInput
                    heading={"Account Holder Name"}
                    placeholder={"Enter Account Holder Name"}
                    value={fullName}
                    onChangeText={setFullName}
                    type="text"
                    width='100%'
                    borderColor={Colors.borderColor2}
                  />
                  <CustomTextInput
                    heading={t('AccountNumber')}
                    placeholder={t('EnterAccountNumber')}
                    value={bankAccountNumber}
                    onChangeText={setBankAccountNumber}
                    type="phone"
                    width='90%'
                  />
                  <CustomTextInput
                    heading={t('BankName')}
                    placeholder={t('EnterBankName')}
                    value={bankName}
                    onChangeText={setBankName}
                    type="text"
                    width='90%'
                  />
                  <CustomTextInput
                    heading={t('AccountType')}
                    placeholder={t('EnterAccountType')}
                    value={bankAccountType}
                    onChangeText={setBankAccountType}
                    type="text"
                    width='90%'
                  />
                  {showNationalId && <CustomTextInput
                    heading={t('NationalID')}
                    placeholder={t('EnterNationalIDNumber')}
                    value={nationalId}
                    onChangeText={setNationalId}
                    type="phone"
                    width='90%'
                  />
                  }
                  <AddressInput
                    heading={t('Address')}
                    placeholder={t('EnterAddress')}
                    value={address}
                    onChangeText={setAddress}
                    width='90%'
                  />
                  <CustomTextInput
                    heading={"Account Holder Email Address"}
                    placeholder={t('enterEmail')}
                    value={email}
                    onChangeText={setEmail}
                    type="email"
                    width='90%'
                  />
                  <View style={AccountStyle.MobileNumberInput}>
                    <MobileNumberInput
                      heading={"Account Holder Mobile Number"}
                      value={phone}
                      onChangePhone={setPhone}
                      selectedCode={selectedCode}
                      onChangeCode={setSelectedCode}
                      countries={countryArr}
                    />
                  </View>
                  {/* <CustomTextInput
                    heading={t('Country')}
                    placeholder={t('EnterCountryName')}
                    value={country}
                    onChangeText={setCountry}
                    type="text"
                    width='90%'
                  /> */}

                  <CustomTextInput
                    heading={t('BranchName')}
                    placeholder={t('EnterBranchName')}
                    value={branchName}
                    onChangeText={setBranchName}
                    type="text"
                    width='90%'
                  />
                  <CustomTextInput
                    heading={t('BankCode')}
                    placeholder={t('EnterBankCode')}
                    value={bankCode}
                    onChangeText={setBankCode}
                    type="phone"
                    width='90%'
                  />

                  {showBankCode && <CustomTextInput
                    heading={t('BankCode')}
                    placeholder={t('EnterBankCode')}
                    value={bankCode}
                    onChangeText={setBankCode}
                    type="phone"
                    width='100%'
                  />}
                  {showIban && (
                    <CustomTextInput
                      heading='IBAN'
                      placeholder='Enter IBAN'
                      value={iban}
                      onChangeText={setIban}
                      type="text"
                      width='100%'
                    />
                  )}
                  {showSirenNo && (
                    <CustomTextInput
                      heading='Siren No'
                      placeholder='Enter Siren No'
                      value={sirenNo}
                      onChangeText={setSirenNo}
                      type="text"
                      width='100%'
                    />
                  )}

                  {/* <CustomButton
                    title={t('FinishSetup')}
                    onPress={handleVerifyDetails}
                    backgroundColor={Colors.blue}
                    textColor={Colors.white}
                    textStyle={NexttextStyle}
                    width='90%'
                  /> */}
                </View>
              }

            </ScrollView>

            <View style={AccountStyle.buttonContainer}>
              {
                (selectedStep <= 2) ?
                  <CustomButton
                    title={"Next"}
                    onPress={() => {
                      if (selectedStep < 3) {
                        setSelectedStep(prev => prev + 1);
                      }
                    }}
                    backgroundColor={Colors.blue}
                    textColor={Colors.white}
                    textStyle={NexttextStyle}
                    width='90%'
                    paddingVertical='0%'
                  />
                  :
                  selectedStep === 3 &&
                  <CustomButton
                    title={t('FinishSetup')}
                    onPress={handleFinishSetup}
                    backgroundColor={Colors.blue}
                    textColor={Colors.white}
                    textStyle={NexttextStyle}
                    width='90%'
                  />
              }
            </View>

          </View>

          <View style={AccountStyle.header1}>
            <View style={{ position: 'relative' }}>
              <Image
                // source={{ uri: FILE_BASE_URL + dummyImage }}
                source={{ uri: FILE_BASE_URL + profileImage }}
                style={AccountStyle.profilePic}
              />
              <TouchableOpacity
                onPress={handleUploadPicture}
                style={AccountStyle.editImageIcon}

              >
                <Image source={Images.editProfile} style={AccountStyle.inputIcon} />
              </TouchableOpacity>
            </View>
            <Text style={AccountStyle.profileName}>
              {`${props?.userData?.firstName?.charAt(0).toUpperCase() + props?.userData?.firstName?.slice(1).toLowerCase()} ${props?.userData?.lastName?.charAt(0).toUpperCase() + props?.userData?.lastName?.slice(1).toLowerCase()}`}
            </Text>
          </View>

        </View>
      </FloatingBackgroundCard>
      <Cameragallery
        mediamodal={mediamodal}
        Camerapopen={() => {
          handleImageUpload(true)

        }}
        Galleryopen={() => {
          handleImageUpload(false)

        }}
        Canclemedia={() => {
          setmediamodal(false);
        }}
      />
      <Loader
        visible={isUploading
          || props.loading
          || props.Bankloading
        }
      />
    </ImageBackground>
  );
};


const mapStateToProps = state => {
  return {
    loading: state.authReducer.loading,
    errMsg: state.authReducer.errMsg,
    responseCode: state.authReducer.responseCode,
    userData: state.authReducer.userData,
    isVerified: state.authReducer.isVerified,
    userId: state.authReducer.userId,
    authToken: state.authReducer.authToken,
    userName: state.authReducer.userName,
    appLanguage: state.authReducer.appLanguage,
    userProfileUpdateLoading: state.authReducer.updateLoading,
    updateUseResponseCode: state.authReducer.updateUseResponseCode,

    Bankloading: state.bankReducer.loading,
    updateLoading: state.bankReducer.updateLoading,
    BankResponseCode: state.bankReducer.responseCode,
    BankErrMsg: state.bankReducer.errMsg,


    contractLoading: state.ContractReducer.loading,
    contractStatus: state.ContractReducer.responseCode,

  };
};
const mapDispatchToProps = {
  BankFormAction,
  UpdateUserInfo,
  ClearBankStatus,
  SendContract,
  ClearContractStatus,
  UpdateUserProfileAction,
};

export default connect(mapStateToProps, mapDispatchToProps)(AccountScreen);



const dummyImage = '/doctorandpatient/0a3341af-32f9-4cfa-a27c-28a182bc50d2.jpeg'