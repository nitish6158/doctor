import React, { useState, useEffect, } from 'react';
import {
  View,
  Text,
  TextInput,
  ImageBackground,
  TouchableOpacity,
  KeyboardAvoidingView,
  Image,
  ScrollView,
  Alert,
} from 'react-native';
import { Images } from '../../../../../assets';
import { Cameragallery, Loader, SuccessModal } from '../../../../../components/modal';
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
  AddressInput,
  CustomDateOfBirth,
  DateOfBirth
} from '../../../../../components/input';
import { WindowWidth as wp } from '../../../../../assets';
import { CustomDropdown } from '../../../../../components/dropdown';
import { useTranslation } from '../../../../../components/customhooks';
import { useFileUpload } from '../../../../../components/customhooks';
import { END_POINT } from '../../../../../Redux/config';
import { SignupStyles } from '../../../../auth/signup/SignupStyles';
import { Colors, ResponsiveFont, Fonts } from '../../../../../assets';
import { usePdfDownloader, useApi } from '../../../../../components/customhooks';
import { FILE_BASE_URL } from '../../../../../Redux/config';
import { BankFormStyles } from '../bankDetailsForm/BankFormStyles';
import {
  BankFormAction,
  ClearBankStatus,
  ClearContractStatus,
  ClearUpdateUerStatus,
  ImageAction,
  SendContract,
  UpdateIsVerifiedAction,
  UpdateUserProfileAction,
} from '../../../../../Redux/actions';
import { connect } from 'react-redux';
import { getRequest } from '../../../../../Redux/config';
import { handleMediaSelection } from '../../../../../utility/Helperfunction';
import { useMediaSelectorAndUploader } from '../../../../../components/customhooks';
import { ToastMsg } from '../../../../../components/Toast';
import { validatePhoneNumber } from '../../../../../utility/Validator';
import { DateOfBirthPicker } from '../../../../../components/input/DateOfBirthPicker';


const NexttextStyle = {
  fontSize: ResponsiveFont(18),
  lineHeight: ResponsiveFont(49),
}


const AccountScreen = (props) => {
  const [successModalVisible, setSuccessModalVisible] = useState(false)
  const t = useTranslation();

  const genderOptions = [
    { label: t('Male'), icon: Images.male },
    { label: t('Female'), icon: Images.female },
    { label: t('Other'), icon: Images.other },
  ];

  const {
    downloadFile,
    loading: downloadLoading,
    error: downloadError,
    success
  } = usePdfDownloader();
  const [apiStatus, setApiStatus] = useState({
    user: null,
    bank: null,
    contract: null,
  });


  const [selectedStep, setSelectedStep] = useState(0);

  const lang = props?.appLanguage?.toLowerCase()
  const [specializationArr, setSpecializationArr] = useState(null)
  const [profileArr, setProfileArr] = useState(null)
  const [countryArr, setCountryArr] = useState([])
  const [firstName, setFirstName] = useState(props?.userData?.firstName);
  const [lastName, setLastName] = useState(props?.userData?.lastName);
  const [email, setEmail] = useState(props?.userData?.email);
  const [phone, setPhone] = useState(props?.userData?.mobileNo);
  const [showDate, setShowDate] = useState('');
  const [dob, setDob] = useState('');
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
  const [language, setLanguage] = useState();
  const [description, setDescription] = useState(props?.userData?.description);
  const [selectedGender, setSelectedGender] = useState(props?.userData?.gender);
  const [profileImage, setProfileImage] = useState(props?.profileImageUrl);
  const [cv, setCv] = useState(props?.userData?.cv)
  const [pdfUrl, setPdfUrl] = useState(null)
  //
  const [fullName, setFullName] = useState(props?.userData?.bankDetailsResponse?.doctorName);
  const [bankAccountNumber, setBankAccountNumber] = useState(props?.userData?.bankDetailsResponse?.accountNumber);
  const [bankName, setBankName] = useState(props?.userData?.bankDetailsResponse?.bankName);
  const [bankAccountType, setBankAccountType] = useState(props?.userData?.bankDetailsResponse?.accountType);
  const [nationalId, setNationalId] = useState(props?.userData?.bankDetailsResponse?.nationalId);
  const [address, setAddress] = useState(props?.userData?.bankDetailsResponse?.bankAddress);
  const [bankCode, setBankCode] = useState(props?.userData?.bankDetailsResponse?.bankCode);
  const [branchName, setBranchName] = useState(props?.userData?.bankDetailsResponse?.branchName);
  const [iban, setIban] = useState(props?.userData?.bankDetailsResponse?.iban);
  const [swiftBicCode, setSwiftBicCode] = useState(props?.userData?.bankDetailsResponse?.swiftBicCode);
  const [sirenNo, setSirenNo] = useState(props?.userData?.bankDetailsResponse?.sirenNo);

  const setProfileImageInReducer = async (data) => {
    await props.ImageAction(data);
  };
  const { handleImageUpload,
    isUploading
  } = useMediaSelectorAndUploader(
    (uploadedUrl) => {
      setProfileImage(uploadedUrl);
      setProfileImageInReducer(uploadedUrl);
    },
    () => setmediamodal(false)
  );
  const [mediamodal, setmediamodal] = useState(false)

  const handleUploadPicture = async () => {
    // setmediamodal(true);
    handleImageUpload(false)
  };


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
  const SetIsVerified = async () => {
    await props.UpdateIsVerifiedAction(5)
  }
  const ClearAllStatus = async () => {
    await props.ClearContractStatus()
    await props.ClearBankStatus()
    await props.ClearUpdateUerStatus()
  }

  const handleFileUpload = async () => {
    const response = await uploadFile();
    if (response?.success) {
      setUploadedFile(response?.fileUrl);
    }
  };

  const handleFinishSetup = async () => {
    if (!phone) {
      ToastMsg(t('PleaseMobileNumber'), 'bottom');
      return false;
    }
    const cleanedPhone = phone.replace(/^0+/, ''); // remove leading zeros
    if (!validatePhoneNumber(selectedCode?.code, cleanedPhone)) {
      ToastMsg(t('ValidMobileNumber'), 'bottom');
      return false;
    }

    if (profileImage == '' || !profileImage) {
      ToastMsg("Please Upload Your Picture", 'bottom');
      return false;
    }


    if (fees == '' || !fees) {
      ToastMsg(t('EnterYourFees'), 'bottom');
      return false;
    }

    if (experience == '' || !experience) {
      ToastMsg(t('EnterExperience'), 'bottom');
      return false;
    }

    if (language == '' || !language) {
      ToastMsg("Please Enter Language", 'bottom');
      return false;
    }

    if (description == '' || !description) {
      ToastMsg(t('EnterDescription'), 'bottom');
      return false;
    }


    if (uploadedFile == null || !uploadedFile || uploadedFile == '') {
      ToastMsg(t('UploadSignedContract'), 'bottom');
      return false;
    }

    if (fullName == '' || !fullName) {
      ToastMsg(t('EnterAccountHolderName'), 'bottom');
      return false;
    }
    if (bankAccountNumber == '' || !bankAccountNumber) {
      ToastMsg(t('EnterBankAccountNumber'), 'bottom');
      return false;
    }
    if (bankName == '' || !bankName) {
      ToastMsg(t('EnterBankName'), 'bottom');
      return false;
    }
    if (bankAccountType == '' || !bankAccountType) {
      ToastMsg(t('EnterBankAccountType'), 'bottom');
      return false;
    }
    if (address == '' || !address) {
      ToastMsg(tr('EnterAddress'), 'bottom');
      return false;
    }
    if (branchName == '' || !branchName) {
      ToastMsg(t('EnterBranchName'), 'bottom');
      return false;
    }
    handleActions()
  };

  const handleActions = async () => {
    setApiStatus({ user: null, bank: null, contract: null });
    handleBankDetails();
    handleUserDetail();
    sendContract();
  }

  const handleUserDetail = async () => {
    const reqParams = {
      "id": props.userId,
      "firstName": firstName,
      "lastName": lastName,
      "dateOfBirth": "",
      "profile": profile,
      "cv": cv,
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
      "email": email,
      "mobileNo": phone,
    }
    await props.UpdateUserProfileAction(reqParams);

  }

  const handleBankDetails = async () => {
    const cleanedPhone = phone.replace(/^0+/, '');
    const bankId =
      props.userData?.bankDetailsResponse?.id !== null &&
        props.userData?.bankDetailsResponse?.id !== undefined &&
        props.userData?.bankDetailsResponse?.id !== 0
        ? props.userData.bankDetailsResponse.id
        : 0;


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
      "id": bankId
    }
    await props.BankFormAction(reqParam);

  }

  const sendContract = async () => {
    const contractData = {
      doctorId: props.userId,
      contractURL: uploadedFile,
      type: "DOCTOR"
    };
    props.SendContract(contractData)

  };

  const handleSuccess = () => {
    setSuccessModalVisible(true)
    SetIsVerified();
    setTimeout(() => {
      setSuccessModalVisible(false)
      props.navigation.navigate("BottomTabNavigator")
      if (!props.contractLoading &&
        !props.loading &&
        !props.Bankloading) {
        ClearAllStatus()
      }
    }, 1500)
  }
  const handleFailer = () => {
    if (
      props?.BankResponseCode != 200
      && props?.BankErrMsg
      && props?.BankErrMsg != null
      && !props.Bankloading
    ) {
      ToastMsg(props?.BankErrMsg, 'bottom')
    } else if (
      props?.updateUseResponseCode != 200
      && props?.errMsg
      && props?.errMsg != null
      && !props.loading
    ) {
      ToastMsg(props?.errMsg, 'bottom')
    } else if (
      props?.contractStatus != 200
      && props?.ContractErrMsg
      && props?.ContractErrMsg != null
      && !props.contractLoading
    ) {
      ToastMsg(props?.ContractErrMsg, 'bottom')
    }
    if (!props.contractLoading &&
      !props.loading &&
      !props.Bankloading) {
      ClearAllStatus()
    }
  }

  useEffect(() => {
    const { user, bank, contract } = apiStatus;
    const allLoaded = [user, bank, contract].every(status => status !== null);
    const allSuccessful = user === 200 && bank === 200 && contract === 200;

    if (allLoaded) {
      if (allSuccessful) {
        handleSuccess();
      } else {
        handleFailer();
      }
    }
  }, [apiStatus]);
  useEffect(() => {
    setApiStatus({
      user: props.updateUseResponseCode,
      bank: props.BankResponseCode,
      contract: props.contractStatus
    });
  }, [
    props.updateUseResponseCode,
    props.BankResponseCode,
    props.contractStatus
  ]);



  useEffect(() => {
    console.log("contract", props.contractStatus, props.ContractErrMsg)
  }, [props.contractStatus])


  useEffect(() => {
    console.log("bank", props.BankResponseCode, props.BankErrMsg)
  }, [props.BankResponseCode])


  useEffect(() => {
    console.log("update", props.updateUseResponseCode, props.errMsg)
  }, [props.updateUseResponseCode])

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
              props.navigation.navigate("BottomTabNavigator")
            }}>
            <Image
              source={Images.back_Icon}
              style={AccountStyle.backIcon}
            />
          </TouchableOpacity>
          <Text style={AccountStyle.tabName}>{t('MyProfile')}</Text>
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
            <KeyboardAvoidingView
              style={AccountStyle.keyboardContainer}
              behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            >
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
                        // editable={false}
                        codeDisable={false}
                      />
                    </View>
                    {/* <View style={{ width: '100%', marginVertical: '1%',backgroundColor:'red'}}> */}
                    <DateOfBirth
                      onDateChange={(dobString) => console.log('Selected DOB:', dobString)}
                    />
                    {/* </View> */}

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

                        <Text style={AccountStyle.thumbnail}>{t('ThumbnailImage')}</Text>

                        <View style={AccountStyle.pointsCover}>
                          <View style={AccountStyle.markCover}>
                            <Image
                              source={Images.exclamation}
                              style={AccountStyle.exclamation}
                              resizeMode='contain'
                            />
                          </View>
                          <Text style={AccountStyle.shortThumbnail}>{t('ImageShouldBeIn')}</Text>
                          <Text style={AccountStyle.shortThumbnail2}>{t('ImageDimensions')}</Text>
                        </View>
                        <View style={AccountStyle.pointsCover}>
                          <View style={AccountStyle.markCover}>
                            <Image
                              source={Images.exclamation}
                              style={AccountStyle.exclamation}
                              resizeMode='contain'
                            />
                          </View>
                          <Text style={AccountStyle.shortThumbnail}>{t('ImageWithTransparentBackground')}</Text>
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
                      heading={t('specialization')}
                      placeholder={t('Select')}
                      selectedValue={specialization}
                      onValueChange={setSpecialization}
                      options={specializationArr}
                      width='100%'
                      type="specialization"
                    />
                    <CustomTextInput
                      heading={t('Fees')}
                      placeholder={t('EnterFees')}
                      value={fees}
                      onChangeText={setFees}
                      type="fees"
                      width='100%'
                      editIcon={true}
                      isEditable={false}
                    />
                    <CustomTextInput
                      heading={t('YearsOfExperience')}
                      placeholder={t('EnterExperience')}
                      value={experience}
                      onChangeText={setExperience}
                      type="experience"
                      width='100%'
                      editIcon={true}
                      isEditable={false}
                    />
                    <View style={{ width: '100%', marginVertical: '1%' }}>
                      <AddressInput
                        heading={t('LanguageKnown')}
                        placeholder={t('EnterLanguages')}
                        value={language}
                        onChangeText={setLanguage}
                        width='100%'
                        autocapitalize="words"
                        editIcon={true}
                      />
                    </View>
                    <View style={{ width: '100%', marginVertical: '1%' }}>
                      <AddressInput
                        heading={t('ProfileDescription')}
                        placeholder={t('EnterDescription')}
                        value={description}
                        onChangeText={setDescription}
                        width='100%'
                        autocapitalize="sentence"
                      />
                    </View>
                    {props?.isVerified == 1 &&
                      <DownloadButton
                        heading={t('CV')}
                        title={t('CVPDF')}
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
                      fileurl={uploadedFile}
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
                      heading={t('AccountHolderName')}
                      placeholder={t('EnterAccountHolderName')}
                      value={fullName}
                      onChangeText={setFullName}
                      type="text"
                      width='90%'
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

                    <AddressInput
                      heading={t('Address')}
                      placeholder={t('EnterAddress')}
                      value={address}
                      onChangeText={setAddress}
                      width='90%'
                    />

                    <CustomTextInput
                      heading={t('BranchName')}
                      placeholder={t('EnterBranchName')}
                      value={branchName}
                      onChangeText={setBranchName}
                      type="text"
                      width='90%'
                    />

                    {showBankCode &&
                      <CustomTextInput
                        heading={t('BankCode')}
                        placeholder={t('EnterBankCode')}
                        value={bankCode}
                        onChangeText={setBankCode}
                        type="text"
                        width='90%'
                      />}
                    {showNationalId &&
                      <CustomTextInput
                        heading={t('NationalID')}
                        placeholder={t('EnterNationalIDNumber')}
                        value={nationalId}
                        onChangeText={setNationalId}
                        type="phone"
                        width='90%'
                      />
                    }
                    {showIban && (
                      <CustomTextInput
                        heading={t('IBAN')}
                        placeholder={t('EnterIBAN')}
                        value={iban}
                        onChangeText={setIban}
                        type="text"
                        width='90%'
                      />
                    )}
                    {showSirenNo && (
                      <CustomTextInput
                        heading={t('SirenNo')}
                        placeholder={t('EnterSirenNo')}
                        value={sirenNo}
                        onChangeText={setSirenNo}
                        type="text"
                        width='90%'
                      />
                    )}

                  </View>
                }

              </ScrollView>
            </KeyboardAvoidingView>
            <View style={AccountStyle.buttonContainer}>
              {
                (selectedStep <= 2) ?
                  <CustomButton
                    title={t('Next')}
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
                source={{
                  uri: profileImage && profileImage != ""
                    ?
                    FILE_BASE_URL + profileImage
                    :
                    FILE_BASE_URL + dummyImage
                }}
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
          || loading
          || props.loading
          || props.Bankloading
          || props.userProfileUpdateLoading
          || props.contractLoading
        }
      />
      <SuccessModal
        heading={t('Success')}
        subHeading={t('ProfileUpdatedSuccessfully')}
        isModalOpen={successModalVisible}
        onClose={() => {
          setSuccessModalVisible(false)
        }}
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
    ContractErrMsg: state.ContractReducer.errMsg,

    profileImageUrl: state.authReducer.profileImageUrl,
  };
};
const mapDispatchToProps = {
  BankFormAction,
  ClearBankStatus,
  SendContract,
  ClearContractStatus,
  UpdateUserProfileAction,
  ClearUpdateUerStatus,
  UpdateIsVerifiedAction,
  ImageAction
};

export default connect(mapStateToProps, mapDispatchToProps)(AccountScreen);



const dummyImage = '/doctorandpatient/21366e84-ccbf-4aab-88b9-144eb6731bf2.png'