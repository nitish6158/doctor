//import liraries
import React, { useState, useEffect } from 'react';
import { View, Text, ImageBackground, Image, KeyboardAvoidingView, ScrollView, Platform, Button, TouchableOpacity } from 'react-native';
import { LoginStyles } from './LoginStyles';
import { Images, Colors, ResponsiveFont } from '../../../assets';
import { CustomTextInput } from '../../../components/input';
import { CustomButton } from '../../../components/button';
import { connect } from 'react-redux';
import { Loader, SuccessModal } from '../../../components/modal';
import { useTranslation } from '../../../components/customhooks';
import { ToastMsg } from '../../../components/Toast';
import { validateEmail, validatePassword } from '../../../utility/Validator';

// import { LoginAction, ClearErrorStatus } from '../../../Redux/actions/auth';
import {
    LoginAction,
    ClearErrorStatus,
} from '../../../Redux/actions';

const LogintextStyle = {
    fontSize: ResponsiveFont(18),
    // lineHeight: ResponsiveFont(49),
}
const LoginScreen = (props) => {
    const t = useTranslation();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isModal, setIsmodal] = useState(false);

    const handleGoBack = () => {
        props.navigation.goBack();
    }

    const handleLogin = async () => {
        if (!email) {
            ToastMsg(t('PleaseEmailId'), 'bottom');
            return false;
        }
        if (!validateEmail(email)) {
            ToastMsg(t('ValidEmailId'), 'bottom');
            return false;
        }
        if (!password) {
            ToastMsg(t('PleasePassword'), 'bottom');
            return false;
        }
        const reqParams = {
            "email": email,
            "password": password,
        }
        await props.LoginAction(reqParams);
    }

    const handleNavigation = (target) => {
        props.navigation.navigate(target)
    }

    const ClearReducer = async () => {
        await props.ClearErrorStatus()
    }

    useEffect(() => {
        if (props.responseCode === 200) {
            setIsmodal(true)
            setTimeout(() => {
                setIsmodal(false)
            }, 2500)
            handleNavigation('BottomTabNavigator');
        }
        else {
            if (props.errMsg !== null) {
                ToastMsg(props.errMsg, 'bottom')
            }
        }
        if (props.errMsg !== null) {
            ClearReducer();
        }
    }, [props.responseCode])

    return (
        <ImageBackground
            source={Images.login_background}
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
                >

                    <View style={LoginStyles.topView}>
                        <View style={LoginStyles.arrowContainer}></View>
                        <View style={LoginStyles.textContainer}>
                            <Text style={LoginStyles.boldText}>{t('login')} </Text>
                            <Text style={LoginStyles.heading}>{t('toYourAccount')}</Text>
                        </View>

                        <View style={LoginStyles.textContainer}>
                            <Text style={LoginStyles.subHeading}>{t('NewtoMedicineApp')} </Text>
                            <TouchableOpacity onPress={() => { handleNavigation('SignupScreen') }}>
                                <Text style={LoginStyles.subBoldText}>{t('register')}</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={LoginStyles.bottomView}>
                        <CustomTextInput
                            heading={t('email')}
                            placeholder={t('enterEmail')}
                            value={email}
                            onChangeText={setEmail}
                            type="email"
                            width='100%'
                        />
                        <CustomTextInput
                            heading={t('password')}
                            placeholder={t('enterPassword')}
                            value={password}
                            onChangeText={setPassword}
                            type="password"
                            width='100%'
                        />
                        <TouchableOpacity
                            onPress={() => { handleNavigation('ForgotPasswordScreen') }}
                            style={LoginStyles.forgotText}>
                            <Text style={LoginStyles.subBoldText}>{t('forgetPassword')}</Text>
                        </TouchableOpacity>
                        <CustomButton
                            title={t('login')}
                            onPress={() => { handleLogin() }}
                            backgroundColor={Colors.blue}
                            textColor={Colors.white}
                            textStyle={LogintextStyle}
                            width='100%'
                        />
                    </View>
                    <SuccessModal
                        heading={t('loginSuccessful')}
                        subHeading={t('welcomeToMedicineApp')}
                        isModalOpen={isModal}
                        onClose={() => {
                            setIsmodal(false)
                        }}
                    />
                    <Loader
                        visible={props.loading}
                    />
                </ScrollView>
            </KeyboardAvoidingView>

        </ImageBackground>
    );
};

const mapStateToProps = state => {
    return {
        loading: state.authReducer.loading,
        errMsg: state.authReducer.errMsg,
        responseCode: state.authReducer.responseCodeLogin,
    };
};

const mapDispatchToProps = {
    LoginAction,
    ClearErrorStatus
};
export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen);