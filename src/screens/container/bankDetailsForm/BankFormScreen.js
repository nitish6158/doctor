import React, {
    useState,
    useMemo,
    useEffect,
} from 'react';
import {
    View,
    Text,
    ImageBackground,
    KeyboardAvoidingView,
    ScrollView,
    Platform,
    BackHandler,
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import {
    CustomTextInput,
    AddressInput,
    MobileNumberInput
} from '../../../components/input';
import {
    ResponsiveFont,
    Colors,
    Images,
} from '../../../assets';
import {
    CustomButton,
} from '../../../components/button';
import {
    SuccessModal,
    Loader
} from '../../../components/modal';
import {
    BankFormAction,
    UpdateUserInfo,
    ClearBankStatus
} from '../../../Redux/actions';
import {
    useTranslation,
} from '../../../components/customhooks';
import {
    validateEmail,
    validatePhoneNumber,
} from '../../../utility/Validator';
import { ToastMsg } from '../../../components/Toast';
import { SignupStyles } from '../../auth/signup/SignupStyles';
import { LoginStyles } from '../../auth/login/LoginStyles';
import { BankFormStyles } from './BankFormStyles';
import { FloatingBackgroundCard } from '../../../components/card';
import { connect } from 'react-redux';
import { END_POINT } from '../../../Redux/config';
import { getRequest } from '../../../Redux/config';

const NexttextStyle = {
    fontSize: ResponsiveFont(18),
    lineHeight: ResponsiveFont(49),
}
const BankFormScreen = (props) => {
    const t = useTranslation()
    const [isModal, setIsmodal] = useState(false);
    const [fullName, setFullName] = useState('');
    const [bankAccountNumber, setBankAccountNumber] = useState('');
    const [bankName, setBankName] = useState('');
    const [bankAccountType, setBankAccountType] = useState('');
    const [nationalId, setNationalId] = useState('');
    const [address, setAddress] = useState('');
    const [email, setEmail] = useState('');
    const [selectedCode, setSelectedCode] = useState(countryArr?.[0] || {
        "name": "SAUDI ARABIA",
        "code": "+966"
    });
    const [phone, setPhone] = useState('');
    const [country, setCountry] = useState('')
    const [bankCode, setBankCode] = useState('');
    const [branchName, setBranchName] = useState('');
    const [countryArr, setCountryArr] = useState([])

    const isFormValid = () => {
        const cleanedPhone = phone.replace(/^0+/, '');

        return (
            fullName.trim() &&
            bankAccountNumber.trim() &&
            bankName.trim() &&
            bankAccountType.trim() &&
            nationalId.trim() &&
            address.trim() &&
            email.trim() &&
            validateEmail(email) &&
            phone.trim() &&
            validatePhoneNumber(selectedCode?.code, cleanedPhone) &&
            country.trim() &&
            branchName.trim() &&
            bankCode.trim()
        );
    };

    useEffect(() => {
        if (countryArr.length > 0 && !selectedCode?.code) {
            setSelectedCode(countryArr[0]);
        }
    }, [countryArr]);

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
    useEffect(() => {
        fetchDoctorCountry();
    }, []);
    const handleVerifyDetails = async () => {
        // if (!email) {
        //     ToastMsg(t('PleaseEmailId'), 'bottom');
        //     return false;
        // }
        // if (!validateEmail(email)) {
        //     ToastMsg(t('ValidEmailId'), 'bottom');
        //     return false;
        // }

        // if (!phone) {
        //     ToastMsg(t('PleaseMobileNumber'), 'bottom');
        //     return false;
        // }
        const cleanedPhone = phone.replace(/^0+/, ''); // remove leading zeros
        // if (!validatePhoneNumber(selectedCode?.code, cleanedPhone)) {
        //     ToastMsg(t('ValidMobileNumber'), 'bottom');
        //     return false;
        // }

        let reqParam = {
            "doctorName": fullName,
            "accountNumber": bankAccountNumber,
            "bankName": bankName,
            "accountType": bankAccountType,
            "nationalId": nationalId,
            "bankAddress": address,
            "email": email,
            "mobileNumber": selectedCode?.code + "" + cleanedPhone,
            "countryName": country,
            "branchName": branchName,
            "bankCode": bankCode,
            "languageType": props.appLanguage?.toLowerCase(),
            "doctorId": props.userId,
        }

        await props.BankFormAction(reqParam);
    }

    const handleSuccessCase = async () => {
        await props.UpdateUserInfo(props.userId);
        props.navigation.navigate('BottomTabNavigator');
    }

    const clearStatusReducer = async () => {
        await props.ClearBankStatus();
    }

    useEffect(() => {
        if (props?.responseCode === 200) {
            handleSuccessCase()
        }
        else if (props?.errMsg && props.errMsg !== null) {
            ToastMsg(props?.errMsg, 'bottom')
        }
        clearStatusReducer()
    }, [props.responseCode])

    // useFocusEffect(
    //     React.useCallback(() => {
    //         const backAction = () => {
    //             BackHandler.exitApp();
    //             return true;
    //         };
    //         const backHandler = BackHandler.addEventListener(
    //             'hardwareBackPress',
    //             backAction,
    //         );
    //         return () => backHandler.remove();
    //     }, []),
    // );


    return (
        <ImageBackground
            source={Images.backgroundImage}
            style={LoginStyles.background}
            resizeMode="cover"
        >
            <View style={BankFormStyles.topView}>
                <Text style={BankFormStyles.tabName}>{t('AddBankDetails')}</Text>
            </View>

            <FloatingBackgroundCard customStyles={BankFormStyles.bottomView} >
                <KeyboardAvoidingView
                    style={[LoginStyles.container, {
                        width: '100%'
                    }]}
                    behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                >
                    <ScrollView
                        keyboardShouldPersistTaps="handled"
                        contentContainerStyle={LoginStyles.scrollContainer}
                        showsVerticalScrollIndicator={false}
                    >
                        <View style={SignupStyles.bottomView}>
                            <CustomTextInput
                                heading={t('FullName')}
                                placeholder={t('EnterFullName')}
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
                                width='100%'
                            />
                            <CustomTextInput
                                heading={t('BankName')}
                                placeholder={t('EnterBankName')}
                                value={bankName}
                                onChangeText={setBankName}
                                type="text"
                                width='100%'
                            />

                            <CustomTextInput
                                heading={t('AccountType')}
                                placeholder={t('EnterAccountType')}
                                value={bankAccountType}
                                onChangeText={setBankAccountType}
                                type="text"
                                width='100%'
                            />

                            <CustomTextInput
                                heading={t('NationalID')}
                                placeholder={t('EnterNationalIDNumber')}
                                value={nationalId}
                                onChangeText={setNationalId}
                                type="phone"
                                width='100%'
                            />
                            <AddressInput
                                heading={t('Address')}
                                placeholder={t('EnterAddress')}
                                value={address}
                                onChangeText={setAddress}
                                width='100%'
                            />

                            <CustomTextInput
                                heading={t('email')}
                                placeholder={t('enterEmail')}
                                value={email}
                                onChangeText={setEmail}
                                type="email"
                                width='100%'
                            />
                            {/* <CustomTextInput
                                heading={t('mobileNo')}
                                placeholder={t('EnterMobileNumber')}
                                value={phone}
                                onChangeText={setPhone}
                                type="phone"
                                width='100%'
                            /> */}

                            <MobileNumberInput
                                heading={t('mobileNo')}
                                value={phone}
                                onChangePhone={setPhone}
                                selectedCode={selectedCode}
                                onChangeCode={setSelectedCode}
                                countries={countryArr}
                            />

                            <CustomTextInput
                                heading={t('Country')}
                                placeholder={t('EnterCountryName')}
                                value={country}
                                onChangeText={setCountry}
                                type="text"
                                width='100%'
                            />
                            <CustomTextInput
                                heading={t('BranchName')}
                                placeholder={t('EnterBranchName')}
                                value={branchName}
                                onChangeText={setBranchName}
                                type="text"
                                width='100%'
                            />
                            <CustomTextInput
                                heading={t('BankCode')}
                                placeholder={t('EnterBankCode')}
                                value={bankCode}
                                onChangeText={setBankCode}
                                type="phone"
                                width='100%'
                            />
                            {/* <CustomButton
                                title={t('FinishSetup')}
                                onPress={handleVerifyDetails}
                                backgroundColor={Colors.blue}
                                textColor={Colors.white}
                                textStyle={NexttextStyle}
                                width='100%'
                            /> */}
                            <CustomButton
                                title={t('FinishSetup')}
                                onPress={handleVerifyDetails}
                                backgroundColor={Colors.blue}
                                textColor={Colors.white}
                                textStyle={NexttextStyle}
                                width='100%'
                            // disabled={!isFormValid()} // cleaner and easier to read

                            />

                            <SuccessModal
                                heading={t('SignUpSuccessful')}
                                subHeading={t('welcomeToMedicineApp')}
                                isModalOpen={isModal}
                                onClose={() => {
                                    setIsmodal(false)
                                }}
                            />
                        </View>
                    </ScrollView>
                </KeyboardAvoidingView>
            </FloatingBackgroundCard>

            <Loader
                visible={
                    props.loading ||
                    props.updateLoading
                }
            />
        </ImageBackground>
    )
};


const mapStateToProps = state => {
    return {
        loading: state.bankReducer.loading,
        updateLoading: state.bankReducer.updateLoading,
        responseCode: state.bankReducer.responseCode,
        userId: state.authReducer.userId,
        authToken: state.authReducer.authToken,
        userName: state.authReducer.userName,
        appLanguage: state.authReducer.appLanguage,
        errMsg: state.bankReducer.errMsg,

    };
};

const mapDispatchToProps = {
    BankFormAction,
    UpdateUserInfo,
    ClearBankStatus
};
export default connect(mapStateToProps, mapDispatchToProps)(BankFormScreen);

