import React, { useState, useMemo, useEffect, } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    ImageBackground,
    KeyboardAvoidingView,
    ScrollView,
    Platform,
} from 'react-native';

import { SignupStyles } from '../../auth/signup/SignupStyles';
import { LoginStyles } from '../../auth/login/LoginStyles';
import { BankFormStyles } from './BankFormStyles';
import { CustomTextInput, AddressInput } from '../../../components/input';
import { ResponsiveFont, Colors, Images, WindowWidth as wp } from '../../../assets';
import { CustomButton, UploadFileButton, DownloadButton } from '../../../components/button';
import { ProgressBar } from 'react-native-paper';
import { SuccessModal, Loader } from '../../../components/modal';
import { CustomDropdown } from '../../../components/dropdown';
import { FloatingBackgroundCard } from '../../../components/card';
import { connect } from 'react-redux';
import { BankFormAction } from '../../../Redux/actions/bankActions';
import { UpdateUserInfo } from '../../../Redux/actions/auth'

import {
    useTranslation,
    usePdfDownloader,
    useFileUpload,
} from '../../../components/customhooks';

import { getRequest } from '../../../Redux/config';
import { END_POINT } from '../../../Redux/config';
import { ToastMsg } from '../../../components/Toast';
import {
    validateEmail,
    validatePhoneNumber,
} from '../../../utility/Validator';


const NexttextStyle = {
    fontSize: ResponsiveFont(18),
    lineHeight: ResponsiveFont(49),
}

const BankFormScreen = (props) => {
    const t = useTranslation()
    const {
        downloadFile,
        loading: downloadLoading,
        error: downloadError,
        success
    } = usePdfDownloader();

    const {
        uploadFile,
        loading: uploadLoading,
        fileUrl,
        error: uploadError
    } = useFileUpload(END_POINT.uploadContract, {
        doctorId: props.userId,
        type: "DOCTOR"
    });

    const [isModal, setIsmodal] = useState(false);
    const [step, setStep] = useState(1);
    const [fullName, setFullName] = useState('');
    const [bankAccountNumber, setBankAccountNumber] = useState('');
    const [bankName, setBankName] = useState('');
    const [bankAccountType, setBankAccountType] = useState('');
    const [nationalId, setNationalId] = useState('');
    const [address, setAddress] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [pdfUrl, setPdfUrl] = useState(null)
    const [country, setCountry] = useState('')
    const [bankCode, setBankCode] = useState('');
    const [branchName, setBranchName] = useState('');
    const [uploadedFile, setUploadedFile] = useState(null);

    const totalFields = 9;
    const filledFields = useMemo(() => {
        let count = 0;
        if (fullName) count++;
        if (bankAccountNumber) count++;
        if (email) count++;
        if (phone) count++;
        if (bankName) count++;
        if (uploadedFile) count++;
        if (bankAccountType) count++;
        if (nationalId) count++;
        if (address) count++;
        return count;
    }, [
        fullName,
        bankAccountNumber,
        email,
        phone,
        bankName,
        uploadedFile,
        bankAccountType,
        nationalId,
        address,
    ]);
    const progress = filledFields / totalFields;

    const handleNext = () => {
        if (step < 2) setStep(step + 1);
    };

    const handleFileUpload = async () => {
        const response = await uploadFile();
        if (response?.success) {
            setUploadedFile(response?.fileUrl);
        }
    };

    const handleVerifyDetails = async () => {

        if (!email) {
            ToastMsg('Please Enter Email Id', 'bottom');
            return false;
        }
        if (!validateEmail(email)) {
            ToastMsg('Please Enter Valid Email Id', 'bottom');
            return false;
        }

        if (!phone) {
            ToastMsg('Please Enter Mobile Number', 'bottom');
            return false;
        }

        if (!validatePhoneNumber(phone)) {
            ToastMsg('Please Enter Valid Mobile Number', 'bottom');
            return false;
        }

        let reqParam = {
            "doctorName": fullName,
            "accountNumber": bankAccountNumber,
            "bankName": bankName,
            "accountType": bankAccountType,
            "nationalId": 100,
            "bankAddress": address,
            "email": email,
            "mobileNumber": phone,
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
        // props.navigation.navigate('BottomTabNavigator');
    }

    useEffect(() => {
        if (props.responseCode == 200) {
            handleSuccessCase()
        }
    }, [props.responseCode])

    useEffect(() => {
        fetchPdfUrl()
    }, [])

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

    return (
        <ImageBackground
            source={Images.backgroundImage}
            style={LoginStyles.background}
            resizeMode="cover"
        >

            <View style={BankFormStyles.topView}>
                <Text style={BankFormStyles.tabName}>{t('BankAndContract')}</Text>
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
                    >

                        <View style={LoginStyles.topView}>

                            <View style={SignupStyles.pageContainer}>
                                <TouchableOpacity onPress={() => setStep(1)} style={SignupStyles.headingName}>
                                    <Text style={{ ...SignupStyles.pageName, color: Colors.blue }}>{t('Contract')}</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => setStep(2)}>
                                    <Text style={
                                        {
                                            ...SignupStyles.pageName,
                                            color: step === 2 || step === 3 ? Colors.blue : Colors.gray,
                                        }}>{t('BankInfo')}</Text>
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
                                    <DownloadButton
                                        heading={t('SignDownloadContract')}
                                        title={t('DownloadContract')}
                                        onPress={() => downloadFile(pdfUrl)}
                                        width='100%'
                                        textStyle={BankFormStyles.textStyle}
                                        disabled={downloadLoading}
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
                                </>
                            )}

                            {step === 2 && (
                                <>

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
                                    <CustomTextInput
                                        heading={t('mobileNo')}
                                        placeholder={t('EnterMobileNumber')}
                                        value={phone}
                                        onChangeText={setPhone}
                                        type="phone"
                                        width='100%'
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

                                </>
                            )}
                            <CustomButton
                                title={step < 2 ? t('Next') : t('FinishSetup')}

                                onPress={() => {
                                    if (step < 2) {
                                        handleNext()
                                    } else {
                                        // handleVerifyDetails()
                                        handleSuccessCase()
                                    }
                                }}
                                backgroundColor={Colors.blue}
                                textColor={Colors.white}
                                textStyle={NexttextStyle}
                                width='100%'
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
                    downloadLoading ||
                    uploadLoading ||
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
        userName: state.authReducer.userName,
        appLanguage: state.authReducer.appLanguage,
    };
};

const mapDispatchToProps = {
    BankFormAction,
    UpdateUserInfo,
};
export default connect(mapStateToProps, mapDispatchToProps)(BankFormScreen);
