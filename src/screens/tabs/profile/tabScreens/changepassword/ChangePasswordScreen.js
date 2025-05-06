import React, { useState,useEffect } from 'react';
import {
    View,
    Text,
    Image,
    ImageBackground,
    TouchableOpacity,
} from "react-native";
import {
    Images,
    Colors,
    WindowHeight as hp,
} from '../../../../../assets';
import { FloatingBackgroundCard } from '../../../../../components/card';
import { useTranslation } from '../../../../../components/customhooks';
import { CustomTextInput } from '../../../../../components/input';
import { CustomButton } from '../../../../../components/button';
import { ChangePasswordStyles } from './ChangePasswordStyles';
import { validatePassword } from '../../../../../utility/Validator';
import { ChangePassowordAction, ClearStatusChangePassword } from '../../../../../Redux/actions';
import { ToastMsg } from '../../../../../components/Toast';
import { connect } from 'react-redux';
import { SuccessModal } from '../../../../../components/modal';

const ChangePasswordScreen = (props) => {
    const t = useTranslation();

    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const [isModal, setIsmodal] = useState(false);

    const handleChangePassword = async () => {
        if (!currentPassword) {
            ToastMsg(t('EnterCurrentPassword'), 'bottom');
            return;
        }
        if (!newPassword) {
            ToastMsg(t('EnterNewPassword'), 'bottom');
            return;
        }
        if (!validatePassword(newPassword)) {
            ToastMsg(t('InvalidPassword'),'bottom');
            return false;
        }
        if (!confirmPassword) {
            ToastMsg(t('EnterConfirmPassword'), 'bottom');
            return;
        }

        if (newPassword !== confirmPassword) {
            ToastMsg(t('PasswordMismatch'), 'bottom');
            return;
        }

        const reqParams = {
            email: props.userData?.email,
            password: currentPassword,
            newPassword: newPassword,
            token: props?.authToken,
        };
        // const reqParam = {
        //     "email": data.email,
        //     "password": data.password,
        //     "newPassword": data.newPassword,
        //     "token": data.token,
        //     "userType": "DOCTOR"
        //   }
        console.log(reqParams, 'reqparam')
        await props.ChangePassowordAction(reqParams);
    };
    const handlePasswordChanged = () => {
        setIsmodal(true);
        setTimeout(() => {
            setIsmodal(false)
            props.navigation.navigate('BottomTabNavigator');
        }, 2500)
    };
    const ClearReducer = async () => {
        await props.ClearStatusChangePassword()
    }

    useEffect(() => {
        if (props.changePasswordResponseCode == 200) {
            handlePasswordChanged()
        }
        else {
            if ( props.errMsg && props.errMsg !== null) {
                ToastMsg(props.errMsg, 'bottom');
            }
        }
        if (props.errMsg && props.errMsg !== null) {
            ClearReducer();
        }
    }, [props.changePasswordResponseCode]);

    return (
        <ImageBackground
            source={Images.backgroundImage}
            style={ChangePasswordStyles.background}
            resizeMode="cover"
        >
            <View style={ChangePasswordStyles.topView}>
                <TouchableOpacity
                    style={ChangePasswordStyles.tabNameContainer1}
                    onPress={() => props.navigation.goBack()}
                >
                    <Image source={Images.back_Icon} style={ChangePasswordStyles.backIcon} />
                </TouchableOpacity>
                <View style={ChangePasswordStyles.tabNameContainer}>
                    <Text style={ChangePasswordStyles.tabName}>{t('ChangePassword')}</Text>
                </View>
            </View>

            <View style={ChangePasswordStyles.bottomView}>
                <FloatingBackgroundCard>
                    <View style={{ width: '100%' }}>
                        <View style={ChangePasswordStyles.innerContent}>
                            <Image
                                source={Images.changePasswordIcon}
                                style={ChangePasswordStyles.lockImage}
                            />
                            <Text style={ChangePasswordStyles.changePasswordText}>{t('ChangePassword')}</Text>

                            <View style={ChangePasswordStyles.inputWrapper}>
                                <CustomTextInput
                                    heading={t('CurrentPassword')}
                                    placeholder={t('EnterCurrentPassword')}
                                    value={currentPassword}
                                    onChangeText={setCurrentPassword}
                                    type="password"
                                    width="100%"
                                />
                            </View>

                            <View style={ChangePasswordStyles.inputWrapper}>
                                <CustomTextInput
                                    heading={t('NewPassword')}
                                    placeholder={t('EnterNewPassword')}
                                    value={newPassword}
                                    onChangeText={setNewPassword}
                                    type="password"
                                    width="100%"
                                />
                            </View>

                            <View style={ChangePasswordStyles.inputWrapper}>
                                <CustomTextInput
                                    heading={t('ConfirmNewPassword')}
                                    placeholder={t('EnterNewPassword')}
                                    value={confirmPassword}
                                    onChangeText={setConfirmPassword}
                                    type="password"
                                    width="100%"
                                />
                            </View>

                            <CustomButton
                                title={t('ChangePassword')}
                                onPress={()=>{handleChangePassword()}}
                                backgroundColor={Colors.blue}
                                textColor={Colors.white}
                                width="100%"
                                marginVertical="5%"
                            />

                            <SuccessModal
                                heading={t('ChangePassword')}
                                subHeading={t('PasswordChangedSuccessfully')}
                                isModalOpen={isModal}
                                onClose={() => {
                                    setIsmodal(false)
                                }}
                            />

                        </View>
                    </View>
                </FloatingBackgroundCard>
            </View>
        </ImageBackground>
    );
};

const mapStateToProps = (state) => ({
    loading: state.authReducer.loading,
    errMsg: state.authReducer.errMsg,
    changePasswordResponseCode: state.authReducer.changePasswordResponseCode,
    userData: state.authReducer.userData,
    authToken: state.authReducer.authToken,
});

const mapDispatchToProps = {
    ChangePassowordAction,
    ClearStatusChangePassword
};

export default connect(mapStateToProps, mapDispatchToProps)(ChangePasswordScreen);

