import { StyleSheet } from 'react-native';
import { WindowWidth as wp, WindowHeight as hp, Colors, ResponsiveFont } from '../../assets';
export const BottomtabStyles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    tabBarStyle: {
        borderWidth: (wp * 0.2) / 100,
        borderRadius: (wp * 4) / 100,
        borderColor: Colors.blue,
        width: '90%',
        alignSelf: 'center',

        // bottom: 8
        // marginBottom:'1.5%'
    },
    iconContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        // flex: 1,
        width: wp * 10 / 100,
    },
    focusIndicator: {
        // width: (wp * 5) / 100,
        // height: 3, 
        // backgroundColor: Colors.blue,
        // borderRadius: 2, 
        // marginTop: 2,
    },
    iconStyle: {
        width: (wp * 8.5) / 100,
        height: (wp * 8.5) / 100,
        resizeMode: 'contain'
    }
});