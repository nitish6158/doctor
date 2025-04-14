import { StyleSheet } from 'react-native';
import { Fonts, ResponsiveFont, Colors, WindowWidth as wp, WindowHeight as hp } from '../../../assets';
export const AgendaStyles = StyleSheet.create({
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
    tabNameContainer: {
        width: '65%',
        alignItems: 'center',
        alignItems: 'flex-start'
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
    topView2: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center'
    },
    bottomView: {
        flex: 8.5,
        width: '100%',
        paddingVertical: "5%",
    },
    bottomView2: {
        flex: 1,
        width: '100%',
        paddingVertical: "5%",
    },
    tabName: {
        fontFamily: Fonts.Medium,
        fontSize: ResponsiveFont(22),
        lineHeight: ResponsiveFont(50),
        color: Colors.white,
    },
    container: {
        flex: 1,
        // backgroundColor: Colors.lightGray,
        paddingHorizontal: wp * 5 / 100,
        paddingTop: hp * 2 / 100,
    },
    title: {
        fontSize: wp * 5 / 100,
        fontFamily: Fonts.Bold,
        color: Colors.black,
        textAlign: 'center',
        marginBottom: hp * 2 / 100,
    },
    availabilityContainer: {
        marginTop: hp * 2 / 100,
        alignItems: 'center',
    },
    dateText: {
        fontSize: wp * 4 / 100,
        fontFamily: Fonts.Medium,
        color: Colors.darkGray,
    },
    addButton: {
        backgroundColor: Colors.blue,
        paddingVertical: hp * 1.5 / 100,
        paddingHorizontal: wp * 10 / 100,
        borderRadius: 10,
        marginTop: hp * 2 / 100,
    },
    addButtonText: {
        color: Colors.white,
        fontFamily: Fonts.Medium,
        fontSize: wp * 4 / 100,
    },
    listItemContainer: {
        width: '90%',
        alignSelf: 'center'
    },
    doctorItem: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        justifyContent: 'flex-start',
    },
    buttonContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '90%'
    },
    doctorContainer: {
        width: wp * 15 / 100,
        borderRadius: wp * 3 / 100,
        alignItems: 'center',
        justifyContent: 'center'
    },
    doctorImage: {
        width: wp * 15 / 100,
        height: wp * 15 / 100,
        resizeMode: 'contain'
    },
    textContainer: {
        width: "75%",
    },
    doctorName: {
        fontSize: ResponsiveFont(16),
        fontFamily: Fonts.Bold,
        color: Colors.black,
        width: '90%',
        marginVertical: '1%'
    },
    addressContainer: {
        flexDirection: 'row',
        width: '100%',
    },
    addressContainer2: {
        flexDirection: 'row',
        width: '100%',
        marginVertical:'1%',
        paddingHorizontal:'2%'
    },
    addressContainer4: {
        // flexDirection: 'row',
        // backgroundColor:'red'
        marginVertical: '2%'
    },
    address: {
        fontSize: ResponsiveFont(14),
        fontFamily: Fonts.Regular,
        color: Colors.light_black,
        width: '90%',
        margin: '1%'
    },
    mapStyle: {
        width: (wp * 5) / 100,
        height: (wp * 5) / 100,
        resizeMode: 'contain',
        marginHorizontal: '1%',
        marginTop: '1.8%'
    },
    calenderStyle: {
        borderWidth: 0.5,
        borderColor: Colors.blue,
        borderRadius: 10,
        width: '100%',
        marginVertical: '3%',
    },
    monthName: {
        fontFamily: Fonts.SemiBold,
        fontSize: ResponsiveFont(14),
        lineHeight: ResponsiveFont(20),
        color: Colors.black,
    },
    arrow: {
        fontFamily: Fonts.SemiBold,
        fontSize: ResponsiveFont(14),
        lineHeight: ResponsiveFont(20),
        color: Colors.black,
    },
    listContainer: {
        width: '100%',
        flex: 1,
        marginTop: '1%'
    },

    modeButton: {
        paddingVertical: '1%',
        marginHorizontal: '2%',
        borderRadius: (wp * 2) / 100,
        borderColor: Colors.blue,
        borderWidth: 1,
        backgroundColor: Colors.white,
        width: '25%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    modeText: {
        fontFamily: Fonts.SemiBold,
        fontSize: ResponsiveFont(14),
        lineHeight: ResponsiveFont(17),
        color: Colors.blue,
    },
    tabContainer: {
        flexDirection: "row",
        flexWrap: 'wrap',
        width: '100%',
        marginVertical: '2%',
        paddingHorizontal:'2%'

    },
    tabButton: {
        paddingVertical: '3.5%',
        paddingHorizontal: '4%',
        borderRadius: (wp * 2) / 100,
        backgroundColor: Colors.shadowBlue,
        margin: '1%',
    },
    tabText: {
        fontFamily: Fonts.SemiBold,
        fontSize: ResponsiveFont(14),
        lineHeight: ResponsiveFont(17),
        color: Colors.black,
    },
    onlineButton: {
        backgroundColor: Colors.blue,
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
    },
    card: {
        width: '90%',
    },
    availabilityCard: {
        width: '100%',
    },
    availabilityStyle: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    availabilityinfo: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '70%',
        padding:'2%'
    },
    AvailalitytbuttonContainer: {
        flexDirection: 'row',
        width: '100%',
        padding:'2%'
    },
    date: {
        fontFamily: Fonts.Bold,
        fontSize: ResponsiveFont(16),
        lineHeight: ResponsiveFont(20),
        color: Colors.black,
        marginLeft: '3%'
    },
    deleteButtonContainer: {
        backgroundColor: Colors.red,
        width: '20%',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: (wp * 3) / 100,
        padding: '2%',
        marginHorizontal: '1.5%'

    },
    crossButtonContainer: {
        backgroundColor: Colors.white,
        width: '15%',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: (wp * 12) / 100,
        padding: '4.5%',
        marginHorizontal: '1.5%'

    },
    crossButtonContainer2: {
        backgroundColor: Colors.white,
        width: '15%',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: (wp * 12) / 100,
        padding: '4.5%',
        marginHorizontal: '1.5%',
        marginVertical: '3%'
    },
    editButtonContainer: {
        width: '75%',
        backgroundColor: Colors.shadowBlue,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: (wp * 3) / 100,
        padding: '2%',
        marginHorizontal: '1.5%'

    },
    iconStyle: {
        width: wp * 6 / 100,
        height: wp * 6 / 100,
        resizeMode: 'contain'
    },
    iconStyle3: {
        width: wp * 5 / 100,
        height: wp * 5 / 100,
        resizeMode: 'contain'
    },
    text: {
        fontFamily: Fonts.SemiBold,
        fontSize: ResponsiveFont(14),
        lineHeight: ResponsiveFont(20),
        color: Colors.blue,
    },
    availabilityButton: {
        width: "100%",
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: '5%',
    },
    availabilityButton2: {
        width: "100%",
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    BlockButtonContainer: {
        width: "100%",
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    addressContainer2: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        padding: '2%'
    },
    address2: {
        fontFamily: Fonts.Bold,
        fontSize: ResponsiveFont(16),
        lineHeight: ResponsiveFont(17.5),
        color: Colors.black,
        marginLeft: '2%',
        width: '90%',
        paddingHorizontal:'2%',
// backgroundColor:'red'
    },
    address3: {
        fontFamily: Fonts.Bold,
        fontSize: ResponsiveFont(16),
        lineHeight: ResponsiveFont(17.5),
        color: Colors.black,
        marginLeft: '2%',
        width: '90%',
// backgroundColor:'red'
    },
    availabilityStyle: {
        fontFamily: Fonts.SemiBold,
        fontSize: ResponsiveFont(22),
        lineHeight: ResponsiveFont(50),
        color: Colors.black,
    },
    cardContainer: {
        width: '100%',
    },
    heading: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderColor: Colors.blue,
        paddingVertical: '2%'
    },
    slotText: {
        fontFamily: Fonts.Bold,
        fontSize: ResponsiveFont(14),
        color: Colors.black,
    },
    heading2: {
        width: '90%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: '2%',

    },
    slotText2: {
        fontFamily: Fonts.Bold,
        fontSize: ResponsiveFont(18),
        color: Colors.black,
    },
    modeContainer: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        paddingVertical: '3%'
    },
    modeContainer3: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        padding: '3%'
    },
    slotContainer: {
        width: '100%',
        flexDirection: 'row',
        paddingVertical: '1%',
        justifyContent: 'space-between',
    },
    slotButton: {
        width: '40%',
    },
    timeButton: {
        flexDirection: 'row',
        backgroundColor: Colors.light_gray3,
        borderRadius: wp * 2 / 100,
        width: '45%',
        paddingVertical: '2%',
        alignItems: 'center',
        justifyContent: 'flex-start',
        borderWidth: 0.5,
        borderColor: Colors.blue
    },
    iconStyle2: {
        width: wp * 4 / 100,
        height: wp * 4 / 100,
        resizeMode: 'contain',
        marginHorizontal: '5%',
    },
    timeText: {
        marginLeft: '2%',
        fontFamily: Fonts.Medium,
        fontSize: ResponsiveFont(15),
        color: Colors.black,
    },
    addressContainer3: {
        paddingVertical: '2%',
        width: '93%',
        marginVertical: '2%'

    },
    NoAvailability: {
        width: wp * 25 / 100,
        height: wp * 25 / 100,
        resizeMode: 'contain'
    },
    NoAvailabilityText: {
        fontFamily: Fonts.SemiBold,
        fontSize: ResponsiveFont(22),
        // lineHeight: ResponsiveFont(20),
        color: Colors.light_gray4,
        width: '60%',
        textAlign: 'center'
    },
    NoAvailabilityContainer: {
        marginVertical: '4%',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
    },
    modeButton2: {
        paddingVertical: '2%',
        marginHorizontal: '2%',
        borderRadius: (wp * 2) / 100,
        borderColor: Colors.blue,
        borderWidth: 1,
        backgroundColor: Colors.white,
        width: '25%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    modeButton3: {
        paddingVertical: '3%',
        marginHorizontal: '2%',
        borderRadius: (wp * 2) / 100,
        borderColor: Colors.blue,
        borderWidth: 1,
        backgroundColor: Colors.white,
        width: '35%',
        alignItems: 'center',
        justifyContent: 'center',
    },

    modeText2: {
        fontFamily: Fonts.SemiBold,
        fontSize: ResponsiveFont(12),
        lineHeight: ResponsiveFont(15),
        color: Colors.blue,
    },

    heading3: {
        width: '90%',
        // paddingVertical: '2%',

    },
    startEndDateContainer: {
        flexDirection: "row",
        justifyContent: 'space-between',
        width: '100%',
        paddingHorizontal: '3%'
    },
    BlockedContainer: {
        width: '90%',
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: '5%'
    },
    BlockAvailabiltyIcon: {
        width: wp * 16 / 100,
        height: wp * 16 / 100,
        resizeMode: 'contain'
    },
    TextBlockAvailability: {
        fontFamily: Fonts.Bold,
        fontSize: ResponsiveFont(16),
        color: Colors.black,
        width: '80%',
        textAlign: 'center'
    },
    restoreButton: {
        paddingVertical: '2%',
        borderBottomLeftRadius: wp*4.5/100,
        borderTopRightRadius:  wp*3/100,
        backgroundColor: Colors.lightblue3,
        width: '25%',
        alignItems: 'center',
    },
    restoreText: {
        fontFamily: Fonts.SemiBold,
        fontSize: ResponsiveFont(16),
        color: Colors.black,
        textAlign: 'center'
    }
});