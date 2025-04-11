//import liraries
import React, { useEffect, useState } from 'react';
import { View, Text, ImageBackground, Image, KeyboardAvoidingView, ScrollView, Platform, TouchableOpacity } from 'react-native';
import { Images, Colors, ResponsiveFont } from '../../../assets';
import { CustomButton } from '../../../components/button';
import { CustomTextInput } from '../../../components/input';
import { LoginStyles } from '../login/LoginStyles';
import { ForgotPasswordStyles } from './ForgotPasswordStyles';
import { connect } from 'react-redux';
import { Loader, SuccessModal } from '../../../components/modal';
import { useTranslation } from '../../../components/customhooks';
import { ToastMsg } from '../../../components/Toast';
import { validateEmail } from '../../../utility/Validator';

// import { ForgotPasswordAction,ClearErrorStatusForgotPassword } from '../../../Redux/actions/auth';
import {
    ForgotPasswordAction,
    ClearErrorStatusForgotPassword,
} from '../../../Redux/actions';

const LogintextStyle = {
    fontSize: ResponsiveFont(18),
    lineHeight: ResponsiveFont(49),
}
const ForgotPasswordScreen = (props) => {
    const t = useTranslation();
    const [email, setEmail] = useState('');
    const [isSuccessModalVisible, setIsSuccessModalVisible] = useState(false);

    const handleGoBack = () => {
        props.navigation.goBack();
        console.log("back")
    }
    const handleGetLink = async () => {
        if (!email) {
            ToastMsg('Please Enter Email Id', 'bottom');
            return false;
        }
        if (!validateEmail(email)) {
            ToastMsg('Please Enter Valid Email Id', 'bottom');
            return false;
        }
        await props.ForgotPasswordAction(email);
    }

    const ClearReducer = async () => {
        await props.ClearErrorStatusForgotPassword()
    }


    useEffect(() => {
        if (props.responseCode == 200) {
            setIsSuccessModalVisible(true);
            setTimeout(() => {
                setIsSuccessModalVisible(false);
                props.navigation.navigate("LoginScreen")
                setEmail("")
            }, 1500)
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
                        <TouchableOpacity onPress={() => { handleGoBack() }} style={LoginStyles.arrowContainer} >
                            <Image
                                source={Images.icon_arrow_back}
                                style={LoginStyles.backArrow}
                            />
                        </TouchableOpacity>
                        <View style={LoginStyles.textContainer}>
                            <Text style={LoginStyles.heading}>{t('forgetPassword')}</Text>
                        </View>

                        <View style={LoginStyles.textContainer}>
                            <Text style={ForgotPasswordStyles.subHeading}>{t('forgetPasswordSubHeading')}</Text>
                        </View>
                    </View>
                    <View style={LoginStyles.bottomView}>
                        <CustomTextInput
                            heading={t('Email')}
                            placeholder={t('enterEmail')}
                            value={email}
                            onChangeText={setEmail}
                            type="email"
                            width='100%'
                        />

                        <CustomButton
                            title={t('GetLink')}
                            onPress={() => { handleGetLink() }}
                            backgroundColor={Colors.blue}
                            textColor={Colors.white}
                            textStyle={LogintextStyle}
                            width='100%'

                        />
                    </View>
                    <Loader
                        visible={props.loading}
                    />
                    <SuccessModal
                        heading={'Check your mail'}
                        subHeading={'Reset Password Link Sent to Your Registered Email'}
                        isModalOpen={isSuccessModalVisible}
                        onClose={() => {
                            setIsSuccessModalVisible(false)
                        }}
                    />
                </ScrollView>
            </KeyboardAvoidingView>

        </ImageBackground>
    );
};

const mapStateToProps = state => {
    return {
        loading: state.forgotPasswordReducer.loading,
        errMsg: state.forgotPasswordReducer.errMsg,
        responseCode: state.forgotPasswordReducer.responseCode,
    };
};

const mapDispatchToProps = {
    ForgotPasswordAction,
    ClearErrorStatusForgotPassword
};
export default connect(mapStateToProps, mapDispatchToProps)(ForgotPasswordScreen);