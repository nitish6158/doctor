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
        justifyContent: 'space-around',
        alignItems: 'center',
        flexDirection:'row',
        // backgroundColor:'red'

    },
    bottomView: {
        flex: 8.5,
        paddingVertical: '3%',
    },
    backIcon: {
        width: wp * 5 / 100,
        height: wp * 5,
        resizeMode: 'contain',
        marginLeft:'10%'
    },
    tabNameContainer:{
        width:'65%',
        alignItems:'center',
        // backgroundColor:'green',
        alignItems:'flex-start'
    },
    tabNameContainer1:{
        width:'35%',
        alignItems:'center',
        // backgroundColor:'red',
        alignItems:'flex-start'
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
        width: '85%',
        marginLeft: '2%'
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
        alignSelf: 'flex-start',
        width: '100%',
        paddingHorizontal: '2%'
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
        marginLeft: '2%',
    },
    mapStyle: {
        width: (wp * 5) / 100,
        height: (wp * 5) / 100,
        resizeMode: 'contain'
    },
    buttonTextStyle: {
        fontFamily: Fonts.Medium,
        fontSize: ResponsiveFont(14),
        lineHeight: ResponsiveFont(18),
        color: Colors.white,
    },
    flatlistStyle: {
        paddingBottom: wp * 20 / 100,
        alignItems: 'center',
        // flex:1,
    },
    buttonStyles: {
        backgroundColor: Colors.blue,
        width: (wp * 83) / 100,
        justifyContent: 'center',
        alignItems: 'center',
        padding: (wp * 2.5) / 100,
        borderRadius: (wp * 3) / 100,
        marginVertical: '2%'
    },
    jobInfoText: {
        fontFamily: Fonts.Bold,
        fontSize: ResponsiveFont(18),
        // lineHeight: ResponsiveFont(18),
        color: Colors.black,
        textAlign:"center",
        width:'90%',
    },
    tabButton: {
        paddingVertical: '3%',
        paddingHorizontal: '4%',
        borderRadius: (wp * 5) / 100,
        backgroundColor: Colors.lightblue3,
        marginVertical: '5%',
        width: '50%',
        alignItems: 'center'
    },
    tabText: {
        fontFamily: Fonts.Bold,
        fontSize: ResponsiveFont(18),
        // lineHeight: ResponsiveFont(17),
        color: Colors.blue,
        textAlign:'center',
    },
    matchingContainer: {
        width: wp * 100 / 100,
        marginVertical: wp * 25 / 100,
        justifyContent: 'center',
        alignItems: 'center',
    },
    matchingIcon: {
        width: wp * 45 / 100,
        height: wp * 45 / 100,
        resizeMode: 'contain'
    },
    heading: {
        fontFamily: Fonts.Bold,
        fontSize: ResponsiveFont(22),
        // lineHeight: ResponsiveFont(17),
        color: Colors.black,
        marginVertical: '2%'
    },
    heading2: {
        fontFamily: Fonts.Bold,
        fontSize: ResponsiveFont(18),
        // lineHeight: ResponsiveFont(17),
        color: Colors.black,
        marginVertical: '1%',
        marginLeft: '2%'
    },
    modeContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    modeButton: {
        paddingVertical: '5%',
        marginHorizontal: '2%',
        borderRadius: (wp * 5) / 100,
        borderColor: Colors.gray,
        borderWidth: 0.5,
        backgroundColor: Colors.white,
        width: '48%',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
    },
    modeText: {
        fontFamily: Fonts.Bold,
        fontSize: ResponsiveFont(18),
        lineHeight: ResponsiveFont(17),
        color: Colors.black,
    },
    buttonImage: {
        width: wp * 6 / 100,
        height: wp * 6 / 100,
        resizeMode: 'contain',
        marginRight: '6%'
    },
    consulationText: {
        fontFamily: Fonts.Bold,
        fontSize: ResponsiveFont(14),
        color: Colors.black,
        marginVertical: '1%',
    },
    formContainer: {
        paddingHorizontal: '5%',
        // height:'80%',
    },
    cardTopView: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between',
        marginVertical: '1%'
    },
    cardTextcontainer: {
        width: '84%',
    },

    cardImageContainer: {
        width: '15%',
        alignItems: 'flex-end'
    },
    editIcon: {
        width: wp * 5 / 100,
        height: wp * 5 / 100,
        resizeMode: 'contain'
    },
    cardBottomView: {


    },
    cardUpperView: {
        width: '100%',
        flexDirection: 'row',
    },
    cardItemKey: {
        fontFamily: Fonts.Bold,
        fontSize: ResponsiveFont(18),
        lineHeight: ResponsiveFont(17),
        color: Colors.black,
    },
    cardItemValue: {
        fontFamily: Fonts.Bold,
        fontSize: ResponsiveFont(18),
        lineHeight: ResponsiveFont(17),
        color: Colors.black,
    },

    cardLowerView: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    listingCard: {
        width: wp * 90 / 100,
        alignSelf: 'center'
    },
    headingText: {
        fontFamily: Fonts.Bold,
        fontSize: ResponsiveFont(12),
        lineHeight: ResponsiveFont(17),
        color: Colors.light_gray2,
    },
    headingTextValue: {
        fontFamily: Fonts.Bold,
        fontSize: ResponsiveFont(14),
        lineHeight: ResponsiveFont(17),
        color: Colors.light_black2,
    },
    headingTextValue2: {
        fontFamily: Fonts.Bold,
        fontSize: ResponsiveFont(14),
        lineHeight: ResponsiveFont(17),
        color: Colors.light_black2,
        width: '95%',
    },
    editIconContainer: {
        backgroundColor: Colors.lightblue6,
        width: (wp * 11) / 100,
        justifyContent: 'center',
        alignItems: 'center',
        padding: (wp * 3) / 100,
        borderRadius: (wp * 3) / 100
    },
    part1: {
        width: '50%',
        marginVertical: '1%'
    },
    part2: {
        width: '50%',
        marginVertical: '1%'
    },

    modeButton1: {
        paddingVertical: '3%',
        // marginHorizontal: '2%',
        borderRadius: (wp * 2) / 100,
        borderColor: Colors.blue,
        borderWidth: 1,
        backgroundColor: Colors.lightblue6,
        width: '40%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    modeText1: {
        fontFamily: Fonts.Bold,
        fontSize: ResponsiveFont(14),
        lineHeight: ResponsiveFont(17),
        color: Colors.black,
    },
    NoDataFoundContainer: {
        paddingVertical: '45%',
        alignItems: 'center',
        justifyContent: 'center'
    },
    NoDataFound: {
        width: wp * 40 / 100,
        height: wp * 40 / 100,
        resizeMode: 'contain'
    }
});
