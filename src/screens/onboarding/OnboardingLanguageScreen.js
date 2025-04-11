import React, { useState, useMemo, useEffect } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    ImageBackground,
    KeyboardAvoidingView,
    Image,
    ScrollView,
    BackHandler,
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';


import { ResponsiveFont, Colors, Images, WindowWidth as wp } from '../../assets';
import { LoginStyles } from '../auth/login/LoginStyles';
import { OnboardingLanguageStyles } from './OnboardingLanguageStyles';
import { LanguageSelectionButton } from '../../components/button';
import { connect } from 'react-redux';

import { LanguageAction } from '../../Redux/actions';
import AsyncStorage from '@react-native-async-storage/async-storage';
const OnboardingLanguageScreen = (props) => {
    const [english, setEnglish] = useState('');
    const [franch, setFrance] = useState('');
    const [arabic, setArabic] = useState('');

    const handleGoBack = () => {
        // props.navigation.goBack();
        console.log("back")
    }

    const selectlanguage = async (target) => {
        if (target !== props.appLanguage) {
            await props.LanguageAction(target);
        }
        await AsyncStorage.setItem('onboardingCompleted', 'true');
        props.navigation.navigate("OnboardingScreen")

    }

    useEffect(() => {
        console.log(props.appLanguage, 'laguageeeeeee')
    }, [props.appLanguage])

    useFocusEffect(
        React.useCallback(() => {
            const backAction = () => {
                BackHandler.exitApp();
                return true;
            };
            const backHandler = BackHandler.addEventListener(
                'hardwareBackPress',
                backAction,
            );
            return () => backHandler.remove();
        }, []),
    );



    return (
        <ImageBackground
            source={Images.login_background}
            style={OnboardingLanguageStyles.background}
            resizeMode="cover"
        >
            <View
                style={OnboardingLanguageStyles.scrollContainer}
            >
                <View style={OnboardingLanguageStyles.topView}>
                    <View style={OnboardingLanguageStyles.imageHolder}>
                        <Image
                            source={Images.language_convert}
                            style={{
                                alignSelf: 'flex-end',
                                // height: '10%',
                                // width: '10%',
                                // resizeMode: 'contain'
                            }}
                        />
                        <Image
                            source={Images.medicine}
                            style={{
                                alignSelf: 'flex-start',
                                width: '30%',
                                resizeMode: 'contain',
                                marginTop:'18%'
                            }}
                        />
                    </View>

                    <View style={OnboardingLanguageStyles.textContainer}>
                        <Text style={OnboardingLanguageStyles.heading}>Choose Your Preferred Language</Text>
                    </View>

                </View>
                <View style={OnboardingLanguageStyles.bottomView}>
                    <LanguageSelectionButton
                        placeholder="English"
                        selectedValue={english}
                        onValueChange={setEnglish}
                        // options={ProfileOptions}
                        width='100%'
                        type="english"
                        onPress={() => {
                            selectlanguage("EN")
                        }}
                    />
                    <LanguageSelectionButton
                        placeholder="Langue"
                        selectedValue={franch}
                        onValueChange={setFrance}
                        // options={SpecializationOptions}
                        width='100%'
                        type="france"
                        onPress={() => {
                            selectlanguage("FN")
                        }}

                    />
                    <LanguageSelectionButton
                        placeholder="لغة"
                        selectedValue={arabic}
                        onValueChange={setArabic}
                        // options={ContryOptions}
                        width='100%'
                        type="arabic"
                        onPress={() => {
                            selectlanguage("AR")
                        }}
                    />
                </View>
            </View>
        </ImageBackground>
    )
};

const mapStateToProps = state => {
    return {
        loading: state.authReducer.loading,
        errMsg: state.authReducer.errMsg,
        responseCode: state.authReducer.responseCode,
        appLanguage: state.authReducer.appLanguage,
    };
};

const mapDispatchToProps = {
    LanguageAction
};
export default connect(mapStateToProps, mapDispatchToProps)(OnboardingLanguageScreen);