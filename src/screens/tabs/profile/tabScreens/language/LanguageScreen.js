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
import { LanguageAction } from '../../../../../Redux/actions';
import { connect } from 'react-redux';

const LanguageScreen = (props) => {
    const t = useTranslation();
    const [english, setEnglish] = useState('');
    const [franch, setFrance] = useState('');
    const [arabic, setArabic] = useState('');

    const selectlanguage = async (target) => {
        if (target !== props.appLanguage) {
            await props.LanguageAction(target);
        }
    }
    const handleLanguage = async () => {
        props.navigation.navigate('BottomTabNavigator')
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
                    <Text style={LanguageStyles.tabName}>{t('Language')}</Text>
                </View>
            </View>

            <View style={LanguageStyles.bottomView}>
                <FloatingBackgroundCard>
                    <View style={LanguageStyles.textContainer}>
                        <Text style={LanguageStyles.heading}>{t('ChoosePreferredLanguage')}</Text>
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
                        <CustomButton
                            title={t('ChangeLanguage')}
                            onPress={handleLanguage}
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
export default connect(mapStateToProps, mapDispatchToProps)(LanguageScreen);

