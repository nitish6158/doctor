import React, { useState, useMemo, useEffect, } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    ImageBackground,
    KeyboardAvoidingView,
    Image,
    ScrollView
} from 'react-native';
import { SignupStyles } from '../../auth/signup/SignupStyles';
import { LoginStyles } from '../../auth/login/LoginStyles';
import { BankFormStyles } from './BankFormStyles';
import { CustomTextInput, AddressInput } from '../../../components/input';
import { ResponsiveFont, Colors, Images, WindowWidth as wp } from '../../../assets';
import { CustomButton, DownloadButton, UploadFileButton } from '../../../components/button';
import { ProgressBar } from 'react-native-paper';
import { SuccessModal, Loader } from '../../../components/modal';
import { CustomDropdown } from '../../../components/dropdown';
import { FloatingBackgroundCard } from '../../../components/card';
import { connect } from 'react-redux';
import { UpdateBankAccountVarifiedStatus } from '../../../Redux/actions/auth/LoginActions';
import { BankFormAction } from '../../../Redux/actions/bankActions';
import { useTranslation } from '../../../components/customhooks';
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
    'specialization 1 ',
    'specialization 2',
    'specialization 3',
    'specialization 4',
    'specialization 5',
];
const ContryOptions = [
    'country 1 ',
    'country 2',
    'country 3',
    'country 4',
    'country 5',
];

const BankFormScreen = (props) => {
    const t = useTranslation()
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
    const [contract, setContract] = useState(null);

    const [bankCode, setBankCode] = useState('');
    const [branchName, setBranchName] = useState('');

    
    const totalFields = 9;
    const filledFields = useMemo(() => {
        let count = 0;
        if (fullName) count++;
        if (bankAccountNumber) count++;
        if (email) count++;
        if (phone) count++;
        if (bankName) count++;
        if (contract) count++;
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
        contract,
        bankAccountType,
        nationalId,
        address,
    ]);
    const progress = filledFields / totalFields;

    const handleNext = () => {
        if (step < 2) setStep(step + 1);
    };

    const handleFileUpload = () => {
        console.log('file upload')
    }

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
            "bankName": bankName,
            "accountNumber": bankAccountNumber,
            "accountType": bankAccountType,
            "bankAddress": address,
            "nationalId": nationalId,
            "branchName": branchName,
            "bankCode": bankCode,
            "languageType": props.appLanguage,
            "doctorId": props.userId,
            "doctorName": fullName,
            "email": email,
            "mobileNumber": phone,
            "countryName":  "India",
        }

        await props.BankFormAction(reqParam);
    }

    const handleSuccessCase = async () => {
        await props.UpdateBankAccountVarifiedStatus();
        props.navigation.navigate('BottomTabNavigator');
    }

    useEffect(() => {
        if (props.responseCode == 200) {
            handleSuccessCase()
        }
    }, [props.responseCode])

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
                                    <Text style={{ ...SignupStyles.pageName, color: Colors.blue }}>{t('BankInfo')}</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => setStep(2)}>
                                    <Text style={
                                        {
                                            ...SignupStyles.pageName,
                                            color: step === 2 || step === 3 ? Colors.blue : Colors.gray,
                                        }}>{t('Contract')}</Text>
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

                                    <CustomDropdown
                                        heading={t('AccountType')}
                                        placeholder={t('EnterAccountType')}
                                        selectedValue={bankAccountType}
                                        onValueChange={setBankAccountType}
                                        options={ProfileOptions}
                                        width='100%'
                                        type="accountType"
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
                                </>
                            )}

                            {step === 2 && (
                                <>
                                    <DownloadButton
                                        heading={t('SignDownloadContract')}
                                        title={t('DownloadContract')}
                                        onPress={() => {
                                            handleFileUpload()
                                        }}
                                        width='100%'
                                        textStyle={BankFormStyles.textStyle}
                                    />
                                    <UploadFileButton
                                        heading={t('UploadSignedContract')}
                                        title={t('UploadContract')}
                                        onPress={() => {
                                            handleFileUpload()
                                        }}
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
                                        handleVerifyDetails()
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
                visible={props.loading}
            />
        </ImageBackground>
    )
};



const mapStateToProps = state => {
    return {
        loading: state.bankReducer.loading,
        responseCode: state.bankReducer.responseCode,
        userId: state.authReducer.userId,
        userName: state.authReducer.userName,
        appLanguage: state.authReducer.appLanguage,
    };
};

const mapDispatchToProps = {
    BankFormAction,
    UpdateBankAccountVarifiedStatus
};
export default connect(mapStateToProps, mapDispatchToProps)(BankFormScreen);
