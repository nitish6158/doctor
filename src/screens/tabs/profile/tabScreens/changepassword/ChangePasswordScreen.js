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
            ToastMsg('Please enter current password', 'bottom');
            return;
        }
        if (!newPassword) {
            ToastMsg('Please enter new password', 'bottom');
            return;
        }
        if (!validatePassword(newPassword)) {
            ToastMsg('Password must be at least 8 characters long, contain at least one uppercase letter, one lowercase letter, and one special character (.@#$%^&+=)', 'bottom');
            return false;
        }
        if (!confirmPassword) {
            ToastMsg('Please enter confirm password', 'bottom');
            return;
        }

        if (newPassword !== confirmPassword) {
            ToastMsg('New password and confirm password should be same', 'bottom');
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
                    <Text style={ChangePasswordStyles.tabName}>Change Password</Text>
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
                            <Text style={ChangePasswordStyles.changePasswordText}>Change Password</Text>

                            <View style={ChangePasswordStyles.inputWrapper}>
                                <CustomTextInput
                                    heading="Current Password"
                                    placeholder="Enter Current Password"
                                    value={currentPassword}
                                    onChangeText={setCurrentPassword}
                                    type="password"
                                    width="100%"
                                />
                            </View>

                            <View style={ChangePasswordStyles.inputWrapper}>
                                <CustomTextInput
                                    heading="New Password"
                                    placeholder="Enter New Password"
                                    value={newPassword}
                                    onChangeText={setNewPassword}
                                    type="password"
                                    width="100%"
                                />
                            </View>

                            <View style={ChangePasswordStyles.inputWrapper}>
                                <CustomTextInput
                                    heading="Confirm New Password"
                                    placeholder="Confirm New Password"
                                    value={confirmPassword}
                                    onChangeText={setConfirmPassword}
                                    type="password"
                                    width="100%"
                                />
                            </View>

                            <CustomButton
                                title="Change Password"
                                onPress={()=>{handleChangePassword()}}
                                backgroundColor={Colors.blue}
                                textColor={Colors.white}
                                width="100%"
                                marginVertical="5%"
                            />

                            <SuccessModal
                                heading={'change password'}
                                subHeading={'Password change successfully'}
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

