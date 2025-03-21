import { StyleSheet } from 'react-native';
import { Colors, ResponsiveFont, Fonts, WindowWidth as wp } from '../../assets';
export const OnboardingLanguageStyles = StyleSheet.create({
    container: {
        flex: 1,
    },
    background: {
        flex: 1,
        width: '100%',
        height: '100%',
    },
    scrollContainer: {
        flex: 1,
        alignItems: 'center',
        paddingHorizontal: wp * 2 / 100,
    },
    topView: {
        flex: 4,
        width: '100%',

    },
    arrowContainer: {
        width: '100%',
        paddingVertical: wp * 7 / 100,
    },
    languageImage: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: (wp * 1) / 100,
        alignItems: 'center',
    },
    textContainer: {
        flexDirection: 'row',
        paddingVertical: (wp * 1) / 100,
        width: '90%',
        flex:4,
    },
    heading: {
        fontFamily: Fonts.Bold,
        fontSize: ResponsiveFont(28),
        lineHeight: ResponsiveFont(40),
        color: Colors.black,
    },
    bottomView: {
        flex: 6,
        width: '100%',
        paddingVertical: wp * 4 / 100,
    },

    backArrow: {
        width: wp * 7 / 100,
        height: wp * 7 / 100,
        resizeMode: 'contain',
    },
    imageHolder: {
        flexDirection: 'row', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        // backgroundColor:'red',
        flex:6
    }
});