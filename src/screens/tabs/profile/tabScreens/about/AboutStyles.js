import { WindowWidth as wp, Colors, ResponsiveFont, Fonts } from '../../../../../assets';
import { StyleSheet } from 'react-native';

export const AboutStyles = StyleSheet.create({
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
    width: '100%',
    alignItems: 'center',
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
    alignItems: 'flex-start',
  },
  backIcon: {
    resizeMode: 'contain',
    width: wp * 5 / 100,
    height: wp * 5 / 100,
    marginLeft: '10%',
  },

  infoIconContainer: {
    marginTop: '5%',
  },
  aboutIcon: {
    width: wp * 15 / 100,
    height: wp * 15 / 100,
  },
  infoIconText: {
    color: Colors.white,
    fontSize: ResponsiveFont(28),
    fontFamily: Fonts.Bold,
  },
  appTitle: {
    fontSize: ResponsiveFont(28),
    fontFamily: Fonts.Bold,
    color: Colors.primary,
    marginTop: '2%',
  },
  appTitleDot: {
    color: Colors.red,
  },
  appSubTitle: {
    // fontStyle: 'italic',
    fontFamily: "cursive",
    color: Colors.blue,
    fontSize: ResponsiveFont(26),
    marginBottom: '5%',
    textAlign: 'right',
    width: wp * 30 / 100
  },
  descriptionText: {
    fontSize: ResponsiveFont(13),
    color: Colors.gray,
    marginBottom: '5%',
  },
  aboutContainer: {
    width: '90%',
  },
  faqTitle: {
    width: '90%',
    marginTop: '5%',
    marginBottom: '3%',
    fontFamily: Fonts.Bold,
    fontSize: ResponsiveFont(16),
    color: Colors.black,
  },
  faqQuestion: {
    fontFamily: Fonts.Bold,
    fontSize: ResponsiveFont(14),
    color: Colors.black,
    marginBottom: '1%',
  },
  faqAnswer: {
    fontSize: ResponsiveFont(12),
    color: Colors.gray,
    marginTop: '1%',
  },
  questionMarkIcon: {
    width: wp * 6 / 100,
    height: wp * 6 / 100,
    marginRight: wp * 3 / 100,
    resizeMode: 'contain',
  },
  plusminusIconStyle: {
    width: wp * 4.5 / 100,
    height: wp * 4.5 / 100,
    resizeMode: 'contain',
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