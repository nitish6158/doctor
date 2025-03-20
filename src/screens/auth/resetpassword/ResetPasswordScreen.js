//import liraries
import React, { useState } from 'react';
import { View, Text, ImageBackground, Image, KeyboardAvoidingView, ScrollView, Platform, TouchableOpacity } from 'react-native';
import { Images, Colors, ResponsiveFont } from '../../../assets';
import { CustomButton } from '../../../components/button';
import { CustomTextInput } from '../../../components/input';
import { LoginStyles } from '../login/LoginStyles';
import { ResetPasswordStyles } from './ResetPasswordStyles';

const LogintextStyle = {
    fontSize: ResponsiveFont(18),
    lineHeight: ResponsiveFont(49),
}
const ResetPasswordScreen = (props) => {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');


    const handleGoBack = () => {
        props.navigation.goBack();
        console.log("back")
    }
    const handleNavigation = (target) => {
        props.navigation.navigate(target);
    }

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
                            <Text style={LoginStyles.heading}>Reset Password</Text>
                        </View>

                        <View style={LoginStyles.textContainer}>
                            <Text style={ResetPasswordStyles.subHeading}>Enter New Password</Text>
                        </View>
                    </View>
                    <View style={LoginStyles.bottomView}>
                        <CustomTextInput
                            heading='New Password '
                            placeholder="Enter Password"
                            value={password}
                            onChangeText={setPassword}
                            type="password"
                            width='100%'
                        />
                        <CustomTextInput
                            heading='Confirm New Password '
                            placeholder="Enter Password"
                            value={confirmPassword}
                            onChangeText={setConfirmPassword}
                            type="password"
                            width='100%'
                        />

                        <CustomButton
                            title='Reset Password'
                            onPress={() => { }}
                            backgroundColor={Colors.blue}
                            textColor={Colors.white}
                            textStyle={LogintextStyle}
                            width='100%'

                        />
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>

        </ImageBackground>
    );
};


export default ResetPasswordScreen;