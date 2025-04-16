import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,
  Button
} from 'react-native';
import { AccountStyle } from './AccountStyles';
const AccountScreen = () => {
  const [gender, setGender] = useState('Male');

  return (
    <ScrollView contentContainerStyle={AccountStyle.container}>
      <View style={AccountStyle.header}>
        <Image
          source={{ uri: 'https://via.placeholder.com/100' }} // replace with actual profile picture URL
          style={AccountStyle.profilePic}
        />
        <TouchableOpacity style={AccountStyle.editIcon}>
          {/* <Icon name="pencil" size={20} color="#fff" /> */}
        </TouchableOpacity>
        <Text style={AccountStyle.profileName}>Dr. William Jhonon</Text>
        <View style={AccountStyle.tabContainer}>
          <TouchableOpacity style={[AccountStyle.tab, AccountStyle.activeTab]}>
            <Text style={AccountStyle.tabText}>Personal Info.</Text>
          </TouchableOpacity>
          <TouchableOpacity style={AccountStyle.tab}>
            <Text style={AccountStyle.tabText}>Professional Info.</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={AccountStyle.form}>
        <TextInput placeholder="First Name" style={AccountStyle.input} defaultValue="Shyam" />
        <TextInput placeholder="Last Name" style={AccountStyle.input} defaultValue="Pandor" />
        <TextInput placeholder="Email" style={AccountStyle.input} defaultValue="shyam@adventist.net" />
        <TextInput placeholder="Mobile No." style={AccountStyle.input} defaultValue="329537253757" />

        <View style={AccountStyle.datePickerRow}>
          <TextInput placeholder="DD" style={AccountStyle.dateInput} defaultValue="10" keyboardType="numeric" />
          <TextInput placeholder="MM" style={AccountStyle.dateInput} defaultValue="11" keyboardType="numeric" />
          <TextInput placeholder="YYYY" style={AccountStyle.dateInput} defaultValue="1988" keyboardType="numeric" />
        </View>

        <Text style={AccountStyle.genderLabel}>Select Gender</Text>
        <View style={AccountStyle.genderRow}>
          {['Female', 'Male', 'Other'].map((g) => (
            <TouchableOpacity
              key={g}
              style={[AccountStyle.genderButton, gender === g && AccountStyle.genderButtonSelected]}
              onPress={() => setGender(g)}
            >
              <Text style={AccountStyle.genderText}>{g}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <TouchableOpacity style={AccountStyle.cvUpload}>
          {/* <Icon name="file-pdf" size={20} color="white" /> */}
          <Text style={AccountStyle.cvText}>CV.pdf</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default AccountScreen;
