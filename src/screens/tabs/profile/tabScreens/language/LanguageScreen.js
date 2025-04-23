LanguageScreen

import React, { useState } from 'react';
import {
    View,
    Text,
    ImageBackground,
    FlatList,
    TouchableOpacity,
    Image,
} from "react-native";
import { LanguageStyles } from './LanguageStyles';
import {
    Images,
    Colors,
    WindowHeight as hp,
    Fonts,
    ResponsiveFont
} from '../../../../../assets';
import { FloatingBackgroundCard } from '../../../../../components/card';
import { useTranslation } from '../../../../../components/customhooks';
import { LanguageSelectionButton, CustomButton } from '../../../../../components/button';

const LanguageScreen = (props) => {
    const t = useTranslation();
    const [english, setEnglish] = useState('');
    const [franch, setFrance] = useState('');
    const [arabic, setArabic] = useState('');

    const selectlanguage = async (target) => {
        console.log('language');
    }

    return (
        <ImageBackground
            source={Images.backgroundImage}
            style={LanguageStyles.background}
            resizeMode="cover"
        >
            <View style={LanguageStyles.topView}>
                <TouchableOpacity
                    style={LanguageStyles.tabNameContainer1}
                    onPress={() => props.navigation.goBack()}>
                    <Image
                        source={Images.back_Icon}
                        style={LanguageStyles.backIcon}
                    />
                </TouchableOpacity>
                <View style={LanguageStyles.tabNameContainer}>
                    <Text style={LanguageStyles.tabName}>Language</Text>
                </View>
            </View>

            <View style={LanguageStyles.bottomView}>
                <FloatingBackgroundCard>
                    <View style={LanguageStyles.textContainer}>
                        <Text style={LanguageStyles.heading}>Choose Your Preferred Language</Text>
                    </View>
                    <View style={LanguageStyles.bottomView}>
                        <LanguageSelectionButton
                            placeholder="English"
                            selectedValue={english}
                            onValueChange={setEnglish}
                            // options={ProfileOptions}
                            width='100%'
                            type="english"
                            onPress={() => {
                                // selectlanguage("EN")
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
                                // selectlanguage("FN")
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
                                // selectlanguage("AR")
                            }}
                        />
                        <CustomButton
                            title="Change Language"
                            onPress={() => {
                            }}
                            backgroundColor={Colors.blue}
                            textColor={Colors.white}
                            width="95%"
                            marginVertical="5%"
                        />
                    </View>
                </FloatingBackgroundCard>
            </View>
        </ImageBackground>
    );
};

export default LanguageScreen;


