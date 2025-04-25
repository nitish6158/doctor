import React, { useState, useMemo, useEffect } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    ImageBackground,
    KeyboardAvoidingView,
    Image,
    ScrollView,
    Alert,
    Platform,
    Linking,
} from 'react-native';
import { SignupStyles } from './SignupStyles';
import { AddressInput, CustomTextInput, MobileNumberInput } from '../../../components/input';
import { LoginStyles } from '../login/LoginStyles';
import { ResponsiveFont, Colors, Images } from '../../../assets';
import { CustomButton, UploadFileButton } from '../../../components/button';
import { ProgressBar } from 'react-native-paper';
import { CustomDropdown } from '../../../components/dropdown';
import { SuccessModal, Loader } from '../../../components/modal';
import { connect } from 'react-redux';
import { useTranslation } from '../../../components/customhooks';
import { ToastMsg } from '../../../components/Toast';
import { END_POINT } from '../../../Redux/config';
import { getRequest } from '../../../Redux/config';
import {
    validateFirstName,
    validateLastName,
    validateEmail,
    validatePhoneNumber,
    validatePassword,
} from '../../../utility/Validator';
import { useFileUpload } from '../../../components/customhooks';
import { PRIVACY_POLICY,TERM_CONDITIONS,SERVER_URL } from '../../../Redux/config';

// import { SignupAction, ClearStatusSignup } from '../../../Redux/actions/auth';
import {
    SignupAction,
    ClearStatusSignup,
} from '../../../Redux/actions';

const NexttextStyle = {
    fontSize: ResponsiveFont(18),
    lineHeight: ResponsiveFont(49),
}
const ProfileOptions = [
    'profile 1 ',
    'profile 2',
    'profile 3',
    'profile 4',
    'profile 5',
];
const SpecializationOptions = [
    "Ophthalmologist",
    "Dermatologisttt",
    "Rheumatology",
    "Cardiologist",
    "GYNOLOGIST0",
];
const ContryOptions = [
    'India',
    'Saudi Arabia',
    'France',
    'United States',
];

const formatUri = (uri) => {
    if (Platform.OS === "android" && uri.startsWith("content://")) {
        return uri.replace("content://", "file://");
    }
    return uri;
};
const SignupScreen = (props) => {
    const t = useTranslation()
    const lang = props?.appLanguage?.toLowerCase()
    const [specializationArr, setSpecializationArr] = useState(null)
    const [profileArr, setProfileArr] = useState(null)
    const [responseData, setResponseData] = useState(null);
    const [countryArr, setCountryArr] = useState([])
    const [step, setStep] = useState(1);
    const [password, setPassword] = useState('');
    const [userName, setUserName] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    // const [selectedCode, setSelectedCode] = useState(countryArr?.[0] || {
    //     "name": "SAUDI ARABIA",
    //     "code": "+966"
    // }
    // );
    const [selectedCode, setSelectedCode] = useState('select');
     // default to first from API
    const { uploadFile, loading, fileUrl, error } = useFileUpload(END_POINT.fileUpload);
    const [uploadedFile, setUploadedFile] = useState(null);
    const [profile, setProfile] = useState('');
    const [specialization, setSpecialization] = useState('');
    const [country, setCountry] = useState('');
    const [address, setAddress] = useState('');
    const [termsAccepted, setTermsAccepted] = useState(false);
    const [isModal, setIsmodal] = useState(false);
    const [selectedGender, setSelectedGender] = useState('');

    const genderOptions = [
        { label: 'Male', icon: Images.male },
        { label: 'Female', icon: Images.female },
        { label: 'Other', icon: Images.other },
    ];
    const handleGoBack = () => {
        props.navigation.goBack();
    }
    const handleNavigation = (target) => {
        props.navigation.navigate(target);
    }
    const handleSubmit = async () => {

        if (!uploadedFile) {
            ToastMsg(t('PleaseUploadCV'), 'bottom');
            return false;
        }
        if (profile == '') {
            ToastMsg(t('PleaseSelectProfile'), 'bottom');
            return false;
        }

        if (specialization == '') {
            ToastMsg(t('SelectSpecialization'), 'bottom');
            return false;
        }

        if (!termsAccepted) {
            ToastMsg(t('AcceptTerms'), 'bottom');
            return false;
        }


        const cleanedPhone = phone.replace(/^0+/, ''); // remove leading zeros


        const reqParams = {
            "userName": userName,
            "password": password,
            "firstName": firstName,
            "lastName": lastName,
            "email": email,
            "mobileNo": cleanedPhone,
            "profile": profile,
            "cv": uploadedFile,
            "specialization": specialization,
            "country": country,
            "address": address,
            "language": props.appLanguage?.toLowerCase(),
            "gender": selectedGender,
            "fees": "",
            "code": selectedCode?.code,
        }
        await props.SignupAction(reqParams);
    }

    const handleNext = () => {
        if (!firstName) {
            ToastMsg(t('PleaseFirstName'), 'bottom');
            return false;
        }
        if (!validateFirstName(firstName)) {
            ToastMsg(t('ValidFirstName'), 'bottom');
            return false;
        }

        if (!lastName) {
            ToastMsg(t('PleaseLastName'), 'bottom');
            return false;
        }
        if (!validateLastName(lastName)) {
            ToastMsg(t('ValidLastName'), 'bottom');
            return false;
        }

        if (!email) {
            ToastMsg(t('PleaseEmailId'), 'bottom');
            return false;
        }
        if (!validateEmail(email)) {
            ToastMsg(t('ValidEmailId'), 'bottom');
            return false;
        }

        if (country == '') {
            ToastMsg(t('PleaseSelectCountry'), 'bottom');
            return false;
        }

        if (!phone) {
            ToastMsg(t('PleaseMobileNumber'), 'bottom');
            return false;
        }
        const cleanedPhone = phone.replace(/^0+/, ''); // remove leading zeros
        if (!validatePhoneNumber(selectedCode?.code, cleanedPhone)) {
            ToastMsg(t('ValidMobileNumber'), 'bottom');
            return false;
        }

        if (!password) {
            ToastMsg(t('PleasePassword'), 'bottom');
            return false;
        }
        if (!validatePassword(password)) {
            ToastMsg(t('PasswordCriteria'), 'bottom');
            return false;
        }
        if (!selectedGender) {
            ToastMsg(t('PleaseSelectGender'), 'bottom');
            return false;
        }

        if (step < 2) setStep(step + 1);
    };

    const handleSignup = () => {
        setIsmodal(true);
        setTimeout(() => {
            setIsmodal(false)
            props.navigation.navigate('BottomTabNavigator');
        }, 2500)
    };
    const ClearReducer = async () => {
        await props.ClearStatusSignup()
    }


    useEffect(() => {
        if (props.responseCode == 200) {
            handleSignup()
        }
        else {
            if (props.errMsg !== null) {
                ToastMsg(props.errMsg, 'bottom');
            }
        }
        if (props.errMsg !== null) {
            ClearReducer();
        }
    }, [props.responseCode]);


    const totalFields = 11;
    const filledFields = useMemo(() => {
        let count = 0;
        if (firstName) count++;
        if (lastName) count++;
        if (email) count++;
        if (phone) count++;
        if (password) count++;
        if (uploadedFile) count++;
        if (profile) count++;
        if (specialization) count++;
        if (country) count++;
        if (address) count++;
        if (termsAccepted) count++;
        return count;
    }, [
        firstName,
        lastName,
        email,
        phone,
        password,
        uploadedFile,
        profile,
        specialization,
        country,
        address,
        termsAccepted
    ]);
    const progress = filledFields / totalFields;

    useEffect(() => {
        fetchDoctorProfile();
        fetchDoctorSpecialization();
        fetchDoctorCountry();
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

    const handleFileUpload = async () => {
        const response = await uploadFile();
        if (response?.success) {
            setUploadedFile(response?.fileUrl); // Store uploaded file URL
        }
    };



    return (
        <ImageBackground
            source={Images.login_background_scroll}
            style={LoginStyles.background}
            resizeMode="cover"
        >
            <KeyboardAvoidingView
                style={LoginStyles.container}
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            >
                <ScrollView
                    keyboardShouldPersistTaps="handled"
                    contentContainerStyle={LoginStyles.scrollContainer}
                    nestedScrollEnabled={true}
                    showsVerticalScrollIndicator={false}

                >
                    <View style={LoginStyles.topView}>
                        <View style={LoginStyles.arrowContainer}></View>

                        <View style={LoginStyles.textContainer}>
                            <Text style={LoginStyles.boldText}>{t('sign')} </Text>
                            <Text style={LoginStyles.heading}>{t('up')}</Text>
                        </View>

                        <View style={LoginStyles.textContainer}>
                            <Text style={LoginStyles.subHeading}>{t('alreadyHaveAnAccount')} </Text>
                            <TouchableOpacity onPress={() => { handleNavigation('LoginScreen') }}>
                                <Text style={LoginStyles.subBoldText}>{t('login')}</Text>
                            </TouchableOpacity>
                        </View>


                        <View style={SignupStyles.pageContainer}>
                            <TouchableOpacity onPress={() => setStep(1)} style={SignupStyles.headingName}>
                                <Text style={{ ...SignupStyles.pageName, color: Colors.blue }}>{t('personnel')}</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => handleNext()}>
                                <Text style={
                                    {
                                        ...SignupStyles.pageName,
                                        color: step === 2 || step === 3 ? Colors.blue : Colors.gray,
                                    }}>{t('professional')}</Text>
                            </TouchableOpacity>
                        </View>

                        <View style={SignupStyles.progressBarContainer}>
                            <ProgressBar
                                progress={progress}
                                color={Colors.blue}
                                style={SignupStyles.progressBar}
                            />
                        </View>

                    </View>
                    <View style={SignupStyles.bottomView}>

                        {step === 1 && (
                            <>

                                <CustomTextInput
                                    heading={t('firstName')}
                                    placeholder={t('EnterFirstName')}
                                    value={firstName}
                                    onChangeText={setFirstName}
                                    type="text"
                                    width='100%'
                                    required={true}
                                />
                                <CustomTextInput
                                    heading={t('lastName')}
                                    placeholder={t('EnterlastName')}
                                    value={lastName}
                                    onChangeText={setLastName}
                                    type="text"
                                    width='100%'
                                    required={true}
                                />
                                <CustomTextInput
                                    heading={t('Email')}
                                    placeholder={t('enterEmail')}
                                    value={email}
                                    onChangeText={setEmail}
                                    type="email"
                                    width='100%'
                                    required={true}
                                />
                                <CustomDropdown
                                    heading={t('SelectCountry')}
                                    placeholder={t('Select')}
                                    selectedValue={country}
                                    // onValueChange={setCountry}
                                    onValueChange={(value) => {
                                        setCountry(value);
                                        const selected = countryArr.find(item => item.name === value)
                                        if (selected?.code) {
                                            setSelectedCode(selected);
                                        }
                                    }}                                    
                                    options={countryArr}
                                    width='100%'
                                    type="country"
                                    required={true}
                                />
                                <MobileNumberInput
                                    heading={t('mobileNo')}
                                    value={phone}
                                    onChangePhone={setPhone}
                                    selectedCode={selectedCode}
                                    onChangeCode={setSelectedCode}
                                    countries={countryArr}
                                    required={true}
                                    codeDisable={true}
                                />
                                <CustomTextInput
                                    heading={t('password')}
                                    placeholder={t('enterPassword')}
                                    value={password}
                                    onChangeText={setPassword}
                                    type="password"
                                    width='100%'
                                    required={true}
                                />
                                <View style={{ marginVertical: '1%' }}>
                                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                        <Text style={SignupStyles.label}>
                                            {t('SelectGender')}
                                        </Text>
                                        <Text style={SignupStyles.label3}>*</Text>
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
                        )}

                        {step === 2 && (
                            <>
                                <UploadFileButton
                                    heading={t('CV')}
                                    title={t('UploadCV')}
                                    onPress={handleFileUpload}
                                    width='100%'
                                    fileurl={uploadedFile}
                                    required={true}
                                />
                                <CustomDropdown
                                    heading={t('SelectProfile')}
                                    placeholder={t('Select')}
                                    selectedValue={profile}
                                    onValueChange={setProfile}
                                    options={profileArr}
                                    width='100%'
                                    type="profile"
                                    required={true}
                                />
                                <CustomDropdown
                                    heading={t('EnterSpecialization')}
                                    placeholder={t('Select')}
                                    selectedValue={specialization}
                                    onValueChange={setSpecialization}
                                    options={specializationArr}
                                    width='100%'
                                    type="specialization"
                                    required={true}
                                />

                                <AddressInput
                                    heading={t('Address')}
                                    placeholder={t('EnterAddress')}
                                    value={address}
                                    onChangeText={setAddress}
                                    width='100%'
                                />

                                {/* <TouchableOpacity
                                    onPress={() => setTermsAccepted(!termsAccepted)}
                                    style={SignupStyles.iconContainer}
                                >
                                    <Image
                                        style={SignupStyles.iconStyle}
                                        source={termsAccepted ?
                                            Images.icon_checkbox_enable :
                                            Images.icon_checkbox
                                        }
                                    />
                                    <Text style={SignupStyles.termText}>{t('termscondition')}</Text>
                                </TouchableOpacity> */}

                                <TouchableOpacity
                                    onPress={() => setTermsAccepted(!termsAccepted)}
                                    style={SignupStyles.iconContainer}
                                >
                                    <Image
                                        style={SignupStyles.iconStyle}
                                        source={termsAccepted ? Images.icon_checkbox_enable : Images.icon_checkbox}
                                    />
                                    <Text style={SignupStyles.termText}>
                                    {t('IAccept')}&nbsp;
                                        <Text
                                            style={{ color: Colors.blue, textDecorationLine: 'underline' }}
                                            onPress={() => Linking.openURL(`${SERVER_URL}${TERM_CONDITIONS}`)}
                                        >
                                            {t('TermsAndConditions')}
                                        </Text>
                                        &nbsp;{t('And')}&nbsp;
                                        <Text
                                            style={{ color: Colors.blue, textDecorationLine: 'underline' }}
                                            onPress={() => Linking.openURL(`${SERVER_URL}${PRIVACY_POLICY}`)}
                                        >
                                            {t('PrivacyPolicy')}
                                        </Text>
                                    </Text>
                                </TouchableOpacity>

                            </>
                        )}


                        <CustomButton
                            // title={step < 2 ? "Next" : "Sign Up"}
                            title={step < 2 ? t('Next') : t('signup')}
                            onPress={() => {
                                if (step < 2) {
                                    handleNext()
                                } else {
                                    handleSubmit()
                                }
                            }}
                            backgroundColor={Colors.blue}
                            textColor={Colors.white}
                            textStyle={NexttextStyle}
                            width='100%'
                            paddingVertical='0%'
                        />
                        <SuccessModal
                            heading={t('SignUpSuccessful')}
                            subHeading={t('welcomeToMedicineApp')}
                            isModalOpen={isModal}
                            onClose={() => {
                                setIsmodal(false)
                            }}
                        />

                        {responseData && (
                            <View style={{ marginTop: 20, padding: 10, backgroundColor: "#f0f0f0", borderRadius: 8 }}>
                                <Text style={{ fontWeight: "bold" }}>Response Data:</Text>
                                <Text>{JSON.stringify(responseData, null, 2)}</Text>
                            </View>
                        )}

                    </View>
                    <Loader
                        visible={props.loading || loading}
                    />
                </ScrollView>
            </KeyboardAvoidingView>
        </ImageBackground>
    )
};

const mapStateToProps = state => {
    return {
        loading: state.authReducer.loading,
        errMsg: state.authReducer.errMsg,
        responseCode: state.authReducer.responseCode,
        appLanguage: state.authReducer.appLanguage
    };
};

const mapDispatchToProps = {
    SignupAction,
    ClearStatusSignup,
};
export default connect(mapStateToProps, mapDispatchToProps)(SignupScreen);
