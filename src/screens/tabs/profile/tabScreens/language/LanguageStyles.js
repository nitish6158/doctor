import { WindowWidth as wp, Colors, ResponsiveFont, Fonts } from '../../../../../assets';
import { StyleSheet } from 'react-native';

export const LanguageStyles = StyleSheet.create({
    background: {
        flex: 1,
        width: '100%',
        height: '100%',
    },
    topView: {
        flex: 1.5,
        justifyContent: 'space-around',
        alignItems: 'center',
        flexDirection: 'row',
    },
    bottomView: {
        flex: 8.5,
        width:'100%',
        alignItems:'center'
    },
    tabName: {
        fontFamily: Fonts.Medium,
        fontSize: ResponsiveFont(22),
        lineHeight: ResponsiveFont(50),
        color: Colors.white,
    },
    tabNameContainer: {
        width: '65%',
        alignItems: 'center',
        alignItems: 'flex-start',
    },
    tabNameContainer1: {
        width: '35%',
        alignItems: 'center',
        alignItems: 'flex-start'
    },
    backIcon: {
        resizeMode: 'contain',
        width: wp * 5 / 100,
        height: wp * 5 / 100,
        marginLeft: '10%',
    },
    textContainer: {
        flexDirection: 'row',
        paddingVertical: (wp * 6) / 100,
        width: '90%',
        // flex:4,
    },
    heading: {
        fontFamily: Fonts.Bold,
        fontSize: ResponsiveFont(24),
        lineHeight: ResponsiveFont(40),
        color: Colors.black,
    },
});