import { StyleSheet } from 'react-native';
import { Fonts, ResponsiveFont, Colors, WindowWidth as wp } from '../../../assets';
export const MatchingStyles = StyleSheet.create({
    background: {
        flex: 1,
        width: '100%',
        height: '100%',
    },
    topView: {
        flex: 1.5,
        justifyContent: 'center',
        alignItems: 'center'
    },
    bottomView: {
        flex: 8.5,
        paddingVertical:'3%',
    },
    tabName: {
        fontFamily: Fonts.Medium,
        fontSize: ResponsiveFont(22),
        lineHeight: ResponsiveFont(50),
        color: Colors.white,
    },
    detailContainer: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'flex-start',
        borderColor: Colors.blue,
        paddingVertical: '2%',

    },
    imageContainer: {
        backgroundColor: Colors.light_blue2,
        width: (wp * 10) / 100,
        justifyContent: 'center',
        alignItems: 'center',
        padding: (wp * 2.5) / 100,
        borderRadius: (wp * 3) / 100
    },
    cardImage: {
        width: (wp * 5) / 100,
        height: wp * 5 / 100
    },
    textContainer: {
        width:'85%',
        marginLeft:'2%'
    },
    title: {
        fontFamily: Fonts.Bold,
        fontSize: ResponsiveFont(16),
        lineHeight: ResponsiveFont(18),
        color: Colors.black,
    },
    subTitle: {
        fontFamily: Fonts.Medium,
        fontSize: ResponsiveFont(14),
        lineHeight: ResponsiveFont(16),
        color: Colors.gray2,
    },
    descriptionContainer: {
        borderBottomWidth: 0.9,
        borderColor: '#E5ECFF',
        marginVertical: '2%',
    },
    description: {
        fontFamily: Fonts.SemiBold,
        fontSize: ResponsiveFont(14),
        lineHeight: ResponsiveFont(16),
        color: Colors.gray2,
    },
    addressContainer: {
        flexDirection: 'row',
        width: '100%',
    },
    locationStyle: {
        fontFamily: Fonts.Bold,
        fontSize: ResponsiveFont(16),
        lineHeight: ResponsiveFont(17.5),
        color: Colors.black,
        width: '90%',
        marginLeft:'2%',
    },
    mapStyle: {
        width: (wp * 5) / 100,
        height: (wp * 5) / 100,
        resizeMode: 'contain'
    },
    buttonTextStyle:{
        fontFamily: Fonts.Medium,
        fontSize: ResponsiveFont(14),
        lineHeight: ResponsiveFont(18),
        color: Colors.white,
    },
    flatlistStyle:{
        paddingBottom:wp*20/100,
        alignItems: 'center',
        // flex:1,
    },
    buttonStyles:{
        backgroundColor: Colors.blue,
        width: (wp * 83) / 100,
        justifyContent: 'center',
        alignItems: 'center',
        padding: (wp * 2.5) / 100,
        borderRadius: (wp * 3) / 100,
        marginVertical:'2%'
    },
});
