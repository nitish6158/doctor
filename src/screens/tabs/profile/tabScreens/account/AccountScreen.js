import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
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
import { usePdfDownloader } from '../../../../../components/customhooks';
import { FILE_BASE_URL } from '../../../../../Redux/config';
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
      setUploadedFile(response?.fileUrl); // Store uploaded file URL
    }
  };

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1, backgroundColor: '#0D9EFF' }}>
      <View style={AccountStyle.header}>
        <View style={{ position: 'relative' }}>
          <Image
            source={{ uri: 'https://via.placeholder.com/100' }}
            style={AccountStyle.profilePic}
          />
          <TouchableOpacity style={AccountStyle.editIcon}>
            <Image source={Images.usericon} style={AccountStyle.inputIcon} />
          </TouchableOpacity>
        </View>
        <Text style={AccountStyle.profileName}>
          {`${props?.userData?.firstName?.charAt(0).toUpperCase() + props?.userData?.firstName?.slice(1).toLowerCase()} ${props?.userData?.lastName?.charAt(0).toUpperCase() + props?.userData?.lastName?.slice(1).toLowerCase()}`}
        </Text>
      </View>

      <FloatingBackgroundCard customStyles={AccountStyle.floatingCard}>

        <MultiStepToggle
          currentStep={selectedStep}
          onToggle={(index) => setSelectedStep(index)}
          steps={["Personnal", "Professional", "Contract", "Bank"]}
        />
        {selectedStep == 0 &&
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
        {selectedStep == 1 &&
          <>
            <DownloadButton
              heading={"CV"}
              title={"CV.pdf"}
              onPress={() => downloadFile(FILE_BASE_URL + "" + props?.userData?.cv)}
              width='100%'
              textStyle={AccountStyle.textStyle}
              disabled={downloadLoading}
            />
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
              heading={t('EnterSpecialization')}
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
              type="phone"
              width='100%'
              editIcon={true}
              isEditable={false}
            />
            <CustomTextInput
              heading={"Years of Experience"}
              placeholder={"Enter Experience"}
              value={experience}
              onChangeText={setExperience}
              type="phone"
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
          </>
        }
        {
          (selectedStep === 0
            ||
            selectedStep == 1)
          &&
          <CustomButton
            title={"Update Profile"}
            onPress={() => {
              // handleSubmit()
            }}
            backgroundColor={Colors.blue}
            textColor={Colors.white}
            textStyle={NexttextStyle}
            width='100%'
            paddingVertical='0%'
          />
        }
      </FloatingBackgroundCard>
    </ScrollView>
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
