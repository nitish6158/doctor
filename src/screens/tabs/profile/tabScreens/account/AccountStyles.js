import { StyleSheet } from "react-native";
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
    right: 30,
    top: 100,
    backgroundColor: '#0D9EFF',
    borderRadius: 15,
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
  form: {
    paddingHorizontal: 20,
    marginTop: 20,
  },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: '#aaa',
    marginBottom: 20,
    paddingVertical: 5,
  },
  datePickerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  dateInput: {
    borderBottomWidth: 1,
    borderBottomColor: '#aaa',
    width: '30%',
    paddingVertical: 5,
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
  });
  