import React from 'react';
import { View, Text, Image, ImageBackground } from 'react-native';
import { OnboardingStyles } from './OnboardingStyles';
import { Images, Colors } from '../../assets';
import { CustomButton } from '../../components/button';
import { FloatingBackgroundCard } from '../../components/card';
import { useTranslation } from '../../components/customhooks';

const OnboardingScreen = (props) => {
    const t=useTranslation();
    const handleNavigation=(target)=>{
        props.navigation.navigate('AuthStack', { screen: target })

    }
    return (
        <ImageBackground
            source={Images.backgroundImage}
            style={OnboardingStyles.background}
            resizeMode="cover"
        >
            <View style={OnboardingStyles.container}>

                <View style={OnboardingStyles.topSection}>
                    <Image source={Images.doctorImage} style={OnboardingStyles.doctorImage} />
                </View>

                <View style={OnboardingStyles.bottomSection}>

                    <FloatingBackgroundCard >

                        <View style={OnboardingStyles.textArea}>
                            <View style={OnboardingStyles.textContainer1}>
                                <Text style={OnboardingStyles.title}>{t('Medicine')}</Text>

                            </View>
                            <View style={OnboardingStyles.textContainer2}>
                                <Text style={OnboardingStyles.subtitle}>{t('BecomeADoctorFor')}</Text>
                            </View>

                        </View>

                        <View style={OnboardingStyles.buttonArea}>
                            <CustomButton
                                title={t('loginToYourAccount')}
                                onPress={()=>{handleNavigation('LoginScreen')}}
                                backgroundColor={Colors.blue}
                                textColor={Colors.white}
                            />
                            <CustomButton
                                title={t('register')}
                                onPress={()=>{handleNavigation('SignupScreen')}}
                                backgroundColor={Colors.white}
                                textColor={Colors.font_blue}
                                isborder={true}
                            />
                        </View>

                    </FloatingBackgroundCard>

                </View>
            </View>
        </ImageBackground>
    );
};

export default OnboardingScreen;
