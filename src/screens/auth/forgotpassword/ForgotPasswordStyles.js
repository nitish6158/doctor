import { StyleSheet } from 'react-native';
import { Colors, WindowWidth as wp, Fonts, ResponsiveFont } from '../../../assets';
export const ForgotPasswordStyles = StyleSheet.create({ 
    subHeading:{
        fontFamily: Fonts.Bold,
        fontSize: ResponsiveFont(14),
        lineHeight: ResponsiveFont(19),
        color: Colors.light_black2
    },
   
});