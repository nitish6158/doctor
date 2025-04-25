import { StyleSheet } from 'react-native';
import { Fonts, ResponsiveFont, Colors, WindowWidth as wp } from '../../../../../assets';
import { clamp } from 'react-native-reanimated';

export const AccountStyle = StyleSheet.create({
  background: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  keyboardContainer:{
    flex: 1,
  },
  MobileNumberInput: {
    width: wp * 90 / 100,
  },
  bankContainer: {
    width: wp * 100 / 100,
  },
  container: {
    backgroundColor: '#fff',
    paddingBottom: 40,
  },
  header: {
    flex: 1.5,
  },
  header5: {
    flex: 8,
    flexDirection: 'row',
    width: '100%'
  },
  backIconContainer: {
    width: wp * 10 / 100,
    height: wp * 10 / 100,
    alignSelf: "flex-start"
  },
  backIcon: {
    width: wp * 5 / 100,
    height: wp * 5 / 100,
    resizeMode: 'contain',
    alignSelf: 'flex-end'
  },
  tabName: {
    fontFamily: Fonts.Medium,
    fontSize: ResponsiveFont(22),
    color: Colors.white,
    marginLeft: '25%'
  },
  header1: {
    alignItems: 'center',
    position: 'absolute',
    top: 0,
    transform: [{ translateY: '-35%', }],
  },
  blankSpace: {
    width: '100%',
    flex: 1.6,
  },
  workingSpace: {
    width: '100%',
    flex: 8.4,
    alignItems: 'center',
    paddingVertical: wp * 2 / 100,
  },
  scroolContainer: {
    flexGrow: 1,
    paddingHorizontal: wp * 5 / 100,
  },
  buttonContainer: {
    width: wp * 100 / 100,
    alignItems: 'center',
    paddingVertical: wp * 3.5 / 100,
  },
  profilePic: {
    width: wp * 35 / 100,
    height: wp * 35 / 100,
    borderRadius: wp * 25 / 100,
    borderWidth: 4,
    borderColor: Colors.blue,
  },

  editImageIcon: {
    position: 'absolute',
    right: 3,
    bottom: 2,
    backgroundColor: Colors.blue,
    borderRadius: 50,
    padding: 10,
    // paddingVertical:7,
    alignItems: 'center',
    justifyContent: 'center'
  },
  editImageIcon2: {
    position: 'absolute',
    right: -10,
    bottom: -15,
    backgroundColor: Colors.blue,
    borderRadius: 50,
    padding: 10,
    // paddingVertical:7,
    alignItems: 'center',
    justifyContent: 'center'
  },
  profileName: {
    fontFamily: Fonts.Medium,
    fontSize: ResponsiveFont(22),
    lineHeight: ResponsiveFont(50),
    color: Colors.black,
  },
  tabContainer: {
    flexDirection: 'row',
    marginTop: 10,
  },
  tab: {
    paddingHorizontal: 15,
    paddingVertical: 8,
    backgroundColor: '#ffffff22',
    borderRadius: 20,
    marginHorizontal: 5,
  },
  activeTab: {
    backgroundColor: '#fff',
  },
  tabText: {
    color: '#000',
  },
  floatingCard: {
    // paddingVertical:wp*5/100,
    width: '100%',
    flex: 8.5
  },
  form: {
    width: '100%',
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#aaa',
    marginBottom: 20,
    paddingVertical: 5,
  },
  input: {
    flex: 1,
    paddingVertical: 5,
  },
  inputIcon: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
    // marginRight: 10,
  },
  datePickerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flex: 1,
  },
  dateInput: {
    borderBottomWidth: 1,
    borderBottomColor: '#aaa',
    width: '30%',
    paddingVertical: 5,
    textAlign: 'center',
  },
  genderLabel: {
    marginTop: 20,
    fontSize: 16,
    marginBottom: 10,
  },
  genderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  genderButton: {
    padding: 10,
    backgroundColor: '#eee',
    borderRadius: 10,
    flex: 1,
    alignItems: 'center',
    marginHorizontal: 5,
  },
  genderButtonSelected: {
    backgroundColor: '#0D9EFF',
  },
  genderText: {
    color: '#000',
  },
  cvUpload: {
    marginTop: 20,
    backgroundColor: '#f44336',
    padding: 10,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cvText: {
    color: '#fff',
    marginLeft: 10,
  },
  updateButton: {
    backgroundColor: '#0D9EFF',
    padding: 15,
    borderRadius: 10,
    marginTop: 30,
  },
  updateButtonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 16,
  },


  textStyle: {
    fontFamily: Fonts.Bold,
    fontSize: ResponsiveFont(14),
    lineHeight: ResponsiveFont(50),
    color: Colors.black,
  },
  editIcon: {
    width: wp * 5 / 100,
    height: wp * 5 / 100
  },
  profilePicEditArea: {
    width: "100%",
    flexDirection: "row",
    paddingVertical: '5%',
    justifyContent: 'space-between',
    // backgroundColor:'red',

  },
  editImageContainer: {
    width: '25%',
    alignItems: 'center',
    justifyContent: 'center'
  },
  editImageDetail: {
    width: '68%',
  },
  markCover: {
    padding: wp * 1 / 100,
    backgroundColor: Colors.red6,
    borderRadius: wp * 1.5 / 100
  },
  pointsCover: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    marginVertical: '1%'
    // justifyContent:'space-between'
  },
  thumbnailIMG: {
    width: wp * 25 / 100,
    height: wp * 29 / 100,
  },
  exclamation: {
    width: wp * 3.5 / 100,
    height: wp * 3.5 / 100,
  },
  thumbnail: {
    fontFamily: Fonts.Bold,
    fontSize: ResponsiveFont(14),
    color: Colors.black,
  },
  shortThumbnail: {
    fontFamily: Fonts.Bold,
    fontSize: ResponsiveFont(12),
    color: Colors.black,
    maxWidth: "80%",
    marginLeft: '2%'
  },
  shortThumbnail2: {
    fontFamily: Fonts.Bold,
    fontSize: ResponsiveFont(12),
    color: Colors.blue,
    marginLeft: '2%',
    maxWidth: "80%",
  },

});

