import { StyleSheet } from 'react-native';
import { Fonts, ResponsiveFont, Colors ,WindowWidth as wp} from '../../../../../assets';

export const AccountStyle = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    paddingBottom: 40,
  },
  header: {
    backgroundColor: '#0D9EFF',
    alignItems: 'center',
    paddingVertical: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  profilePic: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 3,
    borderColor: '#fff',
  },
  editIcon: {
    position: 'absolute',
    right: -10,
    bottom: 10,
    backgroundColor: '#0D9EFF',
    borderRadius: 20,
    padding: 5,
  },
  profileName: {
    fontSize: 20,
    color: '#fff',
    marginTop: 10,
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
    marginTop: -30,
    paddingTop: 30,
    paddingBottom: 40,
    paddingHorizontal: 20,
    width: '100%',
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
    marginRight: 10,
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


  textStyle:{
    fontFamily: Fonts.Bold,
    fontSize: ResponsiveFont(14),
    lineHeight: ResponsiveFont(50),
    color: Colors.black,
  },
   editIcon: {
      width: wp * 5 / 100,
      height: wp * 5 / 100
    }
});

