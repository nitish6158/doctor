import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  ImageBackground,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';
import { Images } from '../../../../../assets';
import { AccountStyle } from './AccountStyles';
import { FloatingBackgroundCard } from '../../../../../components/card';
import { CustomButton, UploadFileButton, MultiStepToggle, DownloadButton } from '../../../../../components/button';
import { CustomTextInput, MobileNumberInput, AddressInput } from '../../../../../components/input';
import { CustomDropdown } from '../../../../../components/dropdown';
import { useTranslation } from '../../../../../components/customhooks';
import { connect } from 'react-redux';
import { useFileUpload } from '../../../../../components/customhooks';
import { END_POINT } from '../../../../../Redux/config';
import { SignupStyles } from '../../../../auth/signup/SignupStyles';
import { Colors, ResponsiveFont, Fonts } from '../../../../../assets';
import { usePdfDownloader, useApi } from '../../../../../components/customhooks';
import { FILE_BASE_URL } from '../../../../../Redux/config';
import { BankFormStyles } from '../../../../container/bankDetailsForm/BankFormStyles';
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
  const [selectedCode, setSelectedCode] = useState(props?.userData?.selectedCode || "");
  const { uploadFile, loading, fileUrl, error } = useFileUpload(END_POINT.fileUpload);
  const [uploadedFile, setUploadedFile] = useState(null);
  const [profile, setProfile] = useState(props?.userData?.profile);
  const [specialization, setSpecialization] = useState(props?.userData?.specialization);
  const [country, setCountry] = useState(props?.userData?.country);
  const [fees, setFees] = useState("")
  const [experience, setExperience] = useState(props?.userData?.experience)
  const [language, setLanguage] = useState('');
  const [description, setDescription] = useState('');
  const [selectedGender, setSelectedGender] = useState(props?.userData?.gender);

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

  const {
    apiData,
    loading: sendContractLoading,
    errors: sendContractErrors,
    request
  } = useApi();


  const [pdfUrl, setPdfUrl] = useState(null)
  const [uploadedFileURL, setUploadedFileURL] = useState(null);

  const [isModal, setIsmodal] = useState(false);


  ///


  const [fullName, setFullName] = useState('');
  const [bankAccountNumber, setBankAccountNumber] = useState('');
  const [bankName, setBankName] = useState('');
  const [bankAccountType, setBankAccountType] = useState('');
  const [nationalId, setNationalId] = useState('');
  const [address, setAddress] = useState('');
  const [bankCode, setBankCode] = useState('');
  const [branchName, setBranchName] = useState('');

  const handleVerifyDetails = async () => {
    
  }


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
                    isEditable={false}
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

                  />
                  <View style={{ width: '100%', marginVertical: '1%' }}>
                    <MobileNumberInput
                      heading={t('mobileNo')}
                      value={phone}
                      onChangePhone={setPhone}
                      selectedCode={selectedCode}
                      onChangeCode={setSelectedCode}
                      countries={countryArr}

                    />
                  </View>

                  <View style={{ marginVertical: '1%' }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                      <Text style={SignupStyles.label}>
                        {t('SelectGender')}
                      </Text>
                      <TouchableOpacity>
                        <Image
                          source={Images.editBlack}
                          style={AccountStyle.editIcon}
                          resizeMode='contain'
                        />
                      </TouchableOpacity>
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
                      <TouchableOpacity style={AccountStyle.editImageIcon2}>
                        <Image source={Images.editProfile} style={AccountStyle.inputIcon} />
                      </TouchableOpacity>
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
                  <DownloadButton
                    heading={"CV"}
                    title={"CV.pdf"}
                    onPress={() => downloadFile(FILE_BASE_URL + "" + props?.userData?.cv)}
                    width='100%'
                    textStyle={AccountStyle.textStyle}
                    disabled={downloadLoading}
                    paddingVertical="0%"
                  />
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
                    disabled={downloadLoading || pdfUrl == null} />

                  <UploadFileButton
                    heading={t('UploadSignedContract')}
                    title={t('UploadContract')}
                    onPress={() => {
                      handleFileUpload()
                    }}
                    width='100%'
                    fileurl={uploadedFileURL}

                  />
                  <CustomButton
                    title={t('FinishSetup')}
                    onPress={sendContract}
                    backgroundColor={Colors.blue}
                    textColor={Colors.white}
                    textStyle={NexttextStyle}
                    width='100%'
                    disabled={uploadedFileURL ? false : true}
                  />
                </>
              }

              {selectedStep == 3 &&
                <View style={AccountStyle.bankContainer}>
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

                  <CustomTextInput
                    heading={t('NationalID')}
                    placeholder={t('EnterNationalIDNumber')}
                    value={nationalId}
                    onChangeText={setNationalId}
                    type="phone"
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
                    heading={t('email')}
                    placeholder={t('enterEmail')}
                    value={email}
                    onChangeText={setEmail}
                    type="email"
                    width='90%'
                  />
                  <View style={AccountStyle.MobileNumberInput}>
                    <MobileNumberInput
                      heading={t('mobileNo')}
                      value={phone}
                      onChangePhone={setPhone}
                      selectedCode={selectedCode}
                      onChangeCode={setSelectedCode}
                      countries={countryArr}
                    />

                  </View>

                  <CustomTextInput
                    heading={t('Country')}
                    placeholder={t('EnterCountryName')}
                    value={country}
                    onChangeText={setCountry}
                    type="text"
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
                  <CustomTextInput
                    heading={t('BankCode')}
                    placeholder={t('EnterBankCode')}
                    value={bankCode}
                    onChangeText={setBankCode}
                    type="phone"
                    width='90%'
                  />

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
                (selectedStep === 0 || selectedStep == 1) ?
                  <CustomButton
                    title={"Update Profile"}
                    onPress={() => {
                      // handleSubmit()
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
                    onPress={handleVerifyDetails}
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
                source={{ uri: FILE_BASE_URL + dummyImage }}
                style={AccountStyle.profilePic}
              />
              <TouchableOpacity style={AccountStyle.editImageIcon}>
                <Image source={Images.editProfile} style={AccountStyle.inputIcon} />
              </TouchableOpacity>
            </View>
            <Text style={AccountStyle.profileName}>
              {`${props?.userData?.firstName?.charAt(0).toUpperCase() + props?.userData?.firstName?.slice(1).toLowerCase()} ${props?.userData?.lastName?.charAt(0).toUpperCase() + props?.userData?.lastName?.slice(1).toLowerCase()}`}
            </Text>
          </View>
        </View>
      </FloatingBackgroundCard>
    </ImageBackground>
  );
};


const mapStateToProps = state => {
  return {
    loading: state.authReducer.loading,
    errMsg: state.authReducer.errMsg,
    responseCode: state.authReducer.responseCode,
    appLanguage: state.authReducer.appLanguage,
    userData: state.authReducer.userData,
  };
};

const mapDispatchToProps = {

};
export default connect(mapStateToProps, mapDispatchToProps)(AccountScreen);


const dummyImage = '/doctorandpatient/0a3341af-32f9-4cfa-a27c-28a182bc50d2.jpeg'