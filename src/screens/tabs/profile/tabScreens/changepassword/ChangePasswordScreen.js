import React, { useState } from 'react';
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
    Fonts,
    ResponsiveFont
} from '../../../../../assets';
import { FloatingBackgroundCard } from '../../../../../components/card';
import { useTranslation } from '../../../../../components/customhooks';
import { CustomTextInput } from '../../../../../components/input';
import { CustomButton } from '../../../../../components/button';
import { ChangePasswordStyles } from './ChangePasswordStyles';
import { validatePassword } from '../../../../../utility/Validator';
const ChangePasswordScreen = (props) => {
    const t = useTranslation();

    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const [isCurrentValid, setIsCurrentValid] = useState(null);
    const [isNewValid, setIsNewValid] = useState(false);
    const [isConfirmMatch, setIsConfirmMatch] = useState(false);

  // Validation Handlers
const handleCurrentPassword = (text) => {
    setCurrentPassword(text);
    // Replace this with real check or API call if needed
    setIsCurrentValid(text === '123456'); // Dummy check
};

const handleNewPassword = (text) => {
    setNewPassword(text);
    const isValid = validatePassword(text);
    setIsNewValid(isValid);
    // Also update confirm match if confirm already has value
    if (confirmPassword.length > 0) {
        setIsConfirmMatch(text === confirmPassword);
    }
};

const handleConfirmPassword = (text) => {
    setConfirmPassword(text);
    setIsConfirmMatch(text === newPassword);
};


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
                    <Image source={Images.back_Icon} style={ChangePasswordStyles.backIcon}/>
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

                            {/* Current Password */}
                            <View style={ChangePasswordStyles.inputWrapper}>
                                <CustomTextInput
                                    heading="Current Password"
                                    placeholder="Enter Current Password"
                                    value={currentPassword}
                                    onChangeText={handleCurrentPassword}
                                    type="password"
                                    width="100%"
                                />
                            </View>

                            {/* New Password */}
                            <View style={ChangePasswordStyles.inputWrapper}>
                                <CustomTextInput
                                    heading="New Password"
                                    placeholder="Enter New Password"
                                    value={newPassword}
                                    onChangeText={handleNewPassword}
                                    type="password"
                                    width="100%"
                                />
                            </View>

                            {/* Confirm New Password */}
                            <View style={ChangePasswordStyles.inputWrapper}>
                                <CustomTextInput
                                    heading="Confirm New Password"
                                    placeholder="Confirm New Password"
                                    value={confirmPassword}
                                    onChangeText={handleConfirmPassword}
                                    type="password"
                                    width="100%"
                                />
                            </View>

                            <CustomButton
                                title="Change Password"
                                onPress={() => {
                                    // Add your API logic here
                                }}
                                backgroundColor={Colors.blue}
                                textColor={Colors.white}
                                width="100%"
                                marginVertical="5%"
                            // disabled={!isFormValid}
                            />
                        </View>
                    </View>

                </FloatingBackgroundCard>
            </View>
        </ImageBackground>
    );
};

export default ChangePasswordScreen;





// import React, { useState } from 'react';
// import {
//     View,
//     Text,
//     ImageBackground,
//     FlatList,
//     TouchableOpacity,
//     Image,
// } from "react-native";
// import {
//     Images,
//     Colors,
//     WindowHeight as hp,
//     Fonts,
//     ResponsiveFont
// } from '../../../../../assets';
// import { FloatingBackgroundCard } from '../../../../../components/card';
// import { useTranslation } from '../../../../../components/customhooks';
// import { ChangePasswordStyles } from './ChangePasswordStyles';

// const ChangePasswordScreen = (props) => {
//     const t = useTranslation();

//     return (
//         <ImageBackground
//             source={Images.backgroundImage}
//             style={ChangePasswordStyles.background}
//             resizeMode="cover"
//         >
//             <View style={ChangePasswordStyles.topView}>
//                 <TouchableOpacity
//                     style={ChangePasswordStyles.tabNameContainer1}
//                     onPress={() => props.navigation.goBack()}>
//                     <Image
//                         source={Images.back_Icon}
//                         style={ChangePasswordStyles.backIcon}
//                     />
//                 </TouchableOpacity>
//                 <View style={ChangePasswordStyles.tabNameContainer}>
//                     <Text style={ChangePasswordStyles.tabName}>Change Password</Text>
//                 </View>
//             </View>

//             <View style={ChangePasswordStyles.bottomView}>
//                 <FloatingBackgroundCard>
//                 </FloatingBackgroundCard>
//             </View>
//         </ImageBackground>
//     );
// };

// export default ChangePasswordScreen;


