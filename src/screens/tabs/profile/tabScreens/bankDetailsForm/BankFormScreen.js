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
    Image,
    TouchableOpacity
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import {
    CustomTextInput,
    AddressInput,
    MobileNumberInput
} from '../../../../../components/input';
import {
    ResponsiveFont,
    Colors,
    Images,
} from '../../../../../assets';
import {
    CustomButton,
} from '../../../../../components/button';
import {
    SuccessModal,
    Loader
} from '../../../../../components/modal';
import {
    BankFormAction,
    UpdateUserInfo,
    ClearBankStatus
} from '../../../../../Redux/actions';
import {
    useTranslation,
} from '../../../../../components/customhooks';
import {
    validateEmail,
    validatePhoneNumber,
} from '../../../../../utility/Validator';
import { ToastMsg } from '../../../../../components/Toast';
import { SignupStyles } from '../../../../auth/signup/SignupStyles';
import { LoginStyles } from '../../../../auth/login/LoginStyles';
import { BankFormStyles } from './BankFormStyles';
import { FloatingBackgroundCard } from '../../../../../components/card';
import { connect } from 'react-redux';
import { END_POINT } from '../../../../../Redux/config';
import { getRequest } from '../../../../../Redux/config';
const NexttextStyle = {
    fontSize: ResponsiveFont(18),
    lineHeight: ResponsiveFont(49),
}
const BankFormScreen = (props) => {
    const t = useTranslation()
    const [isModal, setIsmodal] = useState(false);
    const [fullName, setFullName] = useState(props?.bankDetailsResponse?.doctorName);
    const [bankAccountNumber, setBankAccountNumber] = useState(props?.bankDetailsResponse?.accountNumber);
    const [bankName, setBankName] = useState(props?.bankDetailsResponse?.bankName);
    const [bankAccountType, setBankAccountType] = useState(props?.bankDetailsResponse?.accountType);
    const [nationalId, setNationalId] = useState(props?.bankDetailsResponse?.nationalId);
    const [address, setAddress] = useState(props?.bankDetailsResponse?.bankAddress);
    const [email, setEmail] = useState(props?.bankDetailsResponse?.email);
    const [selectedCode, setSelectedCode] = useState({
        "code": props?.userData?.code,
        "name": 'Select',
    } || {}); 
    const [phone, setPhone] = useState(props?.bankDetailsResponse?.mobileNumber);
    const [country, setCountry] = useState(props?.bankDetailsResponse?.countryName)
    const [bankCode, setBankCode] = useState(props?.bankDetailsResponse?.bankCode);
    const [branchName, setBranchName] = useState(props?.bankDetailsResponse?.branchName);
    const [iban, setIban] = useState(props?.bankDetailsResponse?.iban);
    const [swiftBicCode, setSwiftBicCode] = useState(props?.bankDetailsResponse?.swiftBicCode);
    const [sirenNo, setSirenNo] = useState(props?.bankDetailsResponse?.sirenNo);
    const [countryArr, setCountryArr] = useState([])

    const getVisibleFields = (countryName = '') => {
        const upperCountry = countryName.trim().toUpperCase();

        return {
            showIban: ['FRANCE', 'GERMANY'].includes(upperCountry),
            showSirenNo: upperCountry === 'FRANCE',
            showNationalId: ['SAUDI ARABIA', 'UNITED ARAB EMIRATES'].includes(upperCountry),
            showBankCode: ['FRANCE', 'GERMANY'].includes(upperCountry), // optional for Gulf
        };
    };

    const { showIban, showSirenNo, showNationalId, showBankCode } = getVisibleFields(country);


    const isFormValid = () => {
        const cleanedPhone = phone.replace(/^0+/, '');

        return (
            fullName.trim() &&
            bankAccountNumber.trim() &&
            bankName.trim() &&
            bankAccountType.trim() &&
            (!showNationalId || nationalId.trim()) &&
            // nationalId.trim() &&
            address.trim() &&
            email.trim() &&
            validateEmail(email) &&
            phone.trim() &&
            validatePhoneNumber(selectedCode?.code, cleanedPhone) &&
            country.trim() &&
            branchName.trim() &&
            bankCode.trim()
                (!showBankCode || bankCode.trim())
        );
    };

    // useEffect(() => {
    //     if (countryArr.length > 0 && !selectedCode?.code) {
    //         setSelectedCode(countryArr[0]);
    //     }
    // }, [countryArr]);

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
            "iban": iban,
            "swiftBicCode": swiftBicCode,
            "sirenNo": sirenNo,
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
            {/* <View style={BankFormStyles.topView}>
                <Text style={BankFormStyles.tabName}>{t('AddBankDetails')}</Text>
            </View> */}

               <View style={BankFormStyles.topView}>
                    <TouchableOpacity
                      style={BankFormStyles.tabNameContainer1}
                      onPress={() => props.navigation.goBack()}
                    >
                      <Image
                        source={Images.back_Icon}
                        style={BankFormStyles.backIcon}
                      />
                    </TouchableOpacity>
                    <View style={BankFormStyles.tabNameContainer}>
                      <Text style={BankFormStyles.tabName}>{t('AddBankDetails')}</Text>
                    </View>
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
                                editable={false}
                            />
                            <CustomTextInput
                                heading={t('AccountNumber')}
                                placeholder={t('EnterAccountNumber')}
                                value={bankAccountNumber}
                                onChangeText={setBankAccountNumber}
                                type="phone"
                                width='100%'
                                editable={false}
                            />
                            <CustomTextInput
                                heading={t('BankName')}
                                placeholder={t('EnterBankName')}
                                value={bankName}
                                onChangeText={setBankName}
                                type="text"
                                width='100%'
                                editable={false}
                            />

                            <CustomTextInput
                                heading={t('AccountType')}
                                placeholder={t('EnterAccountType')}
                                value={bankAccountType}
                                onChangeText={setBankAccountType}
                                type="text"
                                width='100%'
                                editable={false}
                            />

                            {showNationalId && <CustomTextInput
                                heading={t('NationalID')}
                                placeholder={t('EnterNationalIDNumber')}
                                value={nationalId}
                                onChangeText={setNationalId}
                                type="phone"
                                width='100%'
                                editable={false}
                            />}
                            <AddressInput
                                heading={t('Address')}
                                placeholder={t('EnterAddress')}
                                value={address}
                                onChangeText={setAddress}
                                width='100%'
                                editable={false}
                                editIcon={false}
                            />

                            <CustomTextInput
                                heading={t('email')}
                                placeholder={t('enterEmail')}
                                value={email}
                                onChangeText={setEmail}
                                type="email"
                                width='100%'
                                editable={false}
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
                                codeDisable={false}
                            />

                            <CustomTextInput
                                heading={t('Country')}
                                placeholder={t('EnterCountryName')}
                                value={country}
                                onChangeText={setCountry}
                                type="text"
                                width='100%'
                                editable={false}
                            />
                            <CustomTextInput
                                heading={t('BranchName')}
                                placeholder={t('EnterBranchName')}
                                value={branchName}
                                onChangeText={setBranchName}
                                type="text"
                                width='100%'
                                editable={false}
                            />
                            {showBankCode && <CustomTextInput
                                heading={t('BankCode')}
                                placeholder={t('EnterBankCode')}
                                value={bankCode}
                                onChangeText={setBankCode}
                                type="phone"
                                width='100%'
                                editable={false}
                            />}
                            {showIban && (
                                <CustomTextInput
                                    heading={t('IBAN')}
                                    placeholder={t('EnterIBAN')}
                                    value={iban}
                                    onChangeText={setIban}
                                    type="text"
                                    width='100%'
                                    editable={false}
                                />
                            )}

                            {showSirenNo && (
                                <CustomTextInput
                                    heading={t('SirenNo')}
                                    placeholder={t('EnterSirenNo')}
                                    value={sirenNo}
                                    onChangeText={setSirenNo}
                                    type="text"
                                    width='100%'
                                    editable={false}
                                />
                            )}
                            {/* <CustomButton
                                title={t('FinishSetup')}
                                onPress={handleVerifyDetails}
                                backgroundColor={Colors.blue}
                                textColor={Colors.white}
                                textStyle={NexttextStyle}
                                width='100%'
                            /> */}
                            {/* <CustomButton
                                title={t('FinishSetup')}
                                onPress={handleVerifyDetails}
                                backgroundColor={Colors.blue}
                                textColor={Colors.white}
                                textStyle={NexttextStyle}
                                width='100%'
                            // disabled={!isFormValid()} // cleaner and easier to read

                            /> */}

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
        bankDetailsResponse: state.authReducer.userData?.bankDetailsResponse,
        userData: state.authReducer?.userData,
    };
};

const mapDispatchToProps = {
    BankFormAction,
    UpdateUserInfo,
    ClearBankStatus
};
export default connect(mapStateToProps, mapDispatchToProps)(BankFormScreen);

