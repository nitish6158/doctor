import { StyleSheet } from 'react-native';


import { Colors,ResponsiveFont,Fonts } from '../../../assets';

export const BankFormStyles= StyleSheet.create({
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
        width:'100%',
        paddingVertical:'5%'
    },
    tabName: {
        fontFamily: Fonts.Medium,
        fontSize: ResponsiveFont(22),
        lineHeight: ResponsiveFont(50),
        color: Colors.white,
    },
    textStyle:{
        fontFamily: Fonts.Bold,
        fontSize: ResponsiveFont(14),
        lineHeight: ResponsiveFont(50),
        color: Colors.black,
    }
});