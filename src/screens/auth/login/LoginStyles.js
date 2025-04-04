import { StyleSheet } from 'react-native';
import { Colors, WindowWidth as wp, Fonts, ResponsiveFont } from '../../../assets';
export const LoginStyles = StyleSheet.create({
    container: {
        flex: 1,
    },
    background: {
        flex: 1,
        width: '100%',
        height: '100%',
    },
    scrollContainer: {
        flexGrow: 1,
        alignItems: 'center',
        paddingHorizontal:wp*4/100,
    },
    topView: {
        flex: 0.05,
        width: '100%',
    },
    bottomView: {
        flex: 9.95,
        width: '100%',
        paddingVertical:wp*4/100,
    },
    arrowContainer: {
        width: '100%',
        paddingVertical: wp * 12 / 100,
    },
    backArrow: {
        width: wp * 7/ 100,
        height: wp * 7 / 100,
        resizeMode: 'contain',
    },
    textContainer: {
        flexDirection: 'row',
        paddingVertical:(wp*1)/100,
        width:'90%'
    },
    boldText: {
        fontFamily: Fonts.Bold,
        fontSize: ResponsiveFont(27),
        lineHeight: ResponsiveFont(36),
        color: Colors.font_blue,
    },
    heading: {
        fontFamily: Fonts.Bold,
        fontSize: ResponsiveFont(25),
        lineHeight: ResponsiveFont(36),
        color: Colors.black
    },
    subHeading:{
        fontFamily: Fonts.Bold,
        fontSize: ResponsiveFont(13),
        lineHeight: ResponsiveFont(20),
        color: Colors.black
    },
    subBoldText:{
        fontFamily: Fonts.Bold,
        fontSize: ResponsiveFont(13),
        lineHeight: ResponsiveFont(20),
        color: Colors.font_blue
    },
    forgotText:{
     alignItems:'flex-end',
     paddingVertical:(wp*2.5)/100
    }

});