import { StyleSheet } from 'react-native';
import { Colors, Fonts, ResponsiveFont, WindowWidth as wp } from '../../../assets';
export const HomeStyles = StyleSheet.create({
    background: {
        flex: 1,
        width: '100%',
        height: '100%',
    },
    topView: {
        flex: 6,
    },
    bottomView: {
        flex: 4,
    },
    header: {
        flex: 1,
    },
    textHeader: {
        flex: 1,
        paddingHorizontal: '3%',
    },
    textHeaderContent: {
        fontFamily: Fonts.SemiBold,
        fontSize: ResponsiveFont(30),
        color: Colors.white,
    },
    buttonHeader: {
        flex: 1,
        justifyContent: 'center',
        paddingHorizontal: '3%',
    },
    buttonContainer: {
        flexDirection: 'row',
        width: '100%',
    },
    buttonSubContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: "100%",
    },
    dropdownWrapper: {
        width: (wp * 55) / 100, // same as dropdownContainer width
    },
    details: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    doctorImage: {
        width: (wp * 60) / 100,
        height: (wp * 70) / 100,
        resizeMode: 'contain'
    },
    iconStyle: {
        width: wp * 6 / 100,
        height: wp * 6 / 100,
        resizeMode: 'contain',

    },
    iconStyle2: {
        width: wp * 4 / 100,
        height: wp * 4 / 100,
        resizeMode: 'contain',

    },
    textContainer: {
        width: (wp * 40) / 100,
        justifyContent: 'center',
        paddingHorizontal: '3%'
    },
    doctorName: {
        fontFamily: Fonts.Bold,
        fontSize: ResponsiveFont(28),
        lineHeight: ResponsiveFont(34),
        color: Colors.white,
        width: (wp * 37) / 100,
        marginBottom: (wp * 2) / 100,
    },
    dropdownContainer: {
        backgroundColor: Colors.lightblue4,
        borderColor: Colors.lightblue4,
        paddingHorizontal: '5%',
        paddingVertical: '7.2%',
        width: (wp * 55) / 100,
        flexDirection: "row",
        justifyContent: 'center',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderRadius: 10

    },
    dropdownIMGText: {
        width: '85%',
        flexDirection: 'row',
        alignItems: 'center',
    },
    dropdownContainer2: {
        backgroundColor: Colors.white,
        width: wp * 39 / 100,
        justifyContent: 'center',
        alignItems: 'center',
    },
    dropdownOption: {
        borderRadius: (wp * 1) / 100,
        backgroundColor: Colors.light_blue,
        padding: (wp * 3) / 100

    },
    specialityContainer: {
        backgroundColor: Colors.light_blue,
        borderRadius: (wp * 4) / 100,
        alignSelf: 'flex-start',
        maxWidth: '100%',
        paddingHorizontal: '7%',
        paddingVertical: '3%',
    },
    speciality: {
        fontFamily: Fonts.Bold,
        fontSize: ResponsiveFont(14),
        lineHeight: ResponsiveFont(16),
        color: Colors.white,

    },
    speciality5: {
        fontFamily: Fonts.Bold,
        fontSize: ResponsiveFont(14),
        lineHeight: ResponsiveFont(16),
        color: Colors.white,
        marginLeft: '8%'
    },
    speciality2: {
        fontFamily: Fonts.Bold,
        fontSize: ResponsiveFont(17),
        color: Colors.white,
    },
    button: {
    },
    buttonText: {
        color: "#fff",
        fontWeight: "bold",
    },

    modalText: {
        fontSize: 16,
        fontWeight: "bold",
    },
    closeButton: {
        marginTop: 10,
        padding: 8,
        borderRadius: 5,
    },
    closeButtonText: {
        color: "#fff",
    },
    chatButtonContainer: {
        backgroundColor: Colors.light_blue,
        width: (wp * 12) / 100,
        height: (wp * 12) / 100,
        justifyContent: 'center',
        alignItems: 'center',
        padding: (wp * 2.5) / 100,
        borderRadius: (wp * 3) / 100,
        marginRight: 15
    },
    notificationButtonContainer: {
        backgroundColor: Colors.white,
        width: (wp * 12) / 100,
        height: (wp * 12) / 100,
        justifyContent: 'center',
        alignItems: 'center',
        padding: (wp * 2.5) / 100,
        borderRadius: (wp * 3) / 100
    },
    customStyles: {
        padding: '4%',
        width: '100%',
        flex: 1,
    },
    dashboardtextContainer: {
        width: '100%',
    },
    dashboardtext: {
        fontFamily: Fonts.Bold,
        fontSize: ResponsiveFont(18),
        lineHeight: ResponsiveFont(20),
        color: Colors.black,
    },
    dashboardItemContainer: {
        // flex: 1,
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: '5%',
    },
    dashboardBox: {
        backgroundColor: Colors.white,
        width: (wp * 45) / 100,
        height: (wp * 55) / 100,
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: (wp * 2.5) / 100,
        borderWidth: wp * 0.1 / 100,
        borderRadius: wp * 4 / 100,
        borderColor: Colors.blue,
    },
    dashboardBoxTitleContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        width: '100%',
        alignItems: 'center',
    },
    dashboardUnderBox: {
        backgroundColor: Colors.light_blue2,
        width: '100%',
        height: (wp * 18) / 100,
        borderRadius: (wp * 4.5) / 100,
        flexDirection: 'row',
    },
    totalArea: {
        justifyContent: 'center',
        // alignItems: 'center',
        width: '50%',
        // padding:'6%',
        borderColor: Colors.blue,
    },
    totalText: {
        fontFamily: Fonts.Bold,
        fontSize: ResponsiveFont(12),
        lineHeight: ResponsiveFont(16),
        color: Colors.light_black2,
        width: '75%',
        marginHorizontal: wp * 3 / 100,
    },
    boxHeadingText: {
        fontFamily: Fonts.Bold,
        fontSize: ResponsiveFont(14),
        lineHeight: ResponsiveFont(18),
        color: Colors.black,
        marginLeft: '10%'
    },
    totalValue: {
        fontFamily: Fonts.Bold,
        fontSize: ResponsiveFont(18),
        lineHeight: ResponsiveFont(27),
        color: Colors.light_black2,
        width: '75%',
        marginHorizontal: wp * 3 / 100,
    },
    buttonTextStyle: {
        fontFamily: Fonts.SemiBold,
        fontSize: ResponsiveFont(15),
        lineHeight: ResponsiveFont(20),
        color: Colors.white,
    },
    dashboardBoxIconContainer: {
        backgroundColor: Colors.light_blue2,
        width: (wp * 10) / 100,
        justifyContent: 'center',
        alignItems: 'center',
        padding: (wp * 2.5) / 100,
        borderRadius: (wp * 3) / 100
    },
    card: {
        width: '100%',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',

    },
    card2: {
        flex: 1,
        alignItems:'center',
    },
    cardImage: {
        width: wp * 30 / 100,
        height: wp * 30 / 100,
        resizeMode: 'contain'
    },
    cardImage2: {
        width: wp * 27 / 100,
        height: wp * 30 / 100,
        resizeMode: 'contain',
        alignSelf:'center'
    },
    text: {
        fontFamily: Fonts.SemiBold,
        fontSize: ResponsiveFont(22),
        lineHeight: ResponsiveFont(28),
        color: Colors.black,
        textAlign: 'center',
        width: '70%',
        marginVertical: '3%'
    },

    resiontextContainer: {
        backgroundColor: Colors.shadowBlue,
        borderRadius: 10,
        padding:wp*2/100,
        marginVertical:wp*2/100,
        // width: wp * 90 / 100,
    },
    resion: {
        fontFamily: Fonts.Bold,
        fontSize: ResponsiveFont(17),
        color: Colors.black,
        width: wp * 85 / 100,
        // alignSelf:'center'
    },
    resiontext: {
        fontFamily: Fonts.SemiBold,
        fontSize: ResponsiveFont(16),
        color: Colors.black,
        width: wp * 85 / 100,
        // marginHorizontal: '5%',
    },
    text2: {
        fontFamily: Fonts.SemiBold,
        fontSize: ResponsiveFont(22),
        lineHeight: ResponsiveFont(28),
        color: Colors.black,
        textAlign: 'center',
        marginVertical: '3%',
        width: wp * 85/ 100,
    },
    firstAddBoxIcon: {
        width: (wp * 6) / 100,
        height: (wp * 6) / 100,
        resizeMode: 'contain'
    },

});