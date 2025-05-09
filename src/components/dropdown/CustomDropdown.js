import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal, Image, FlatList, Pressable } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { Colors, Fonts, ResponsiveFont, WindowWidth as wp, WindowHeight as hp, opacityOfButton, Images } from '../../assets';

export const CustomDropdown = ({
  heading = "Select",
  placeholder = "Select",
  options = [],
  selectedValue,
  onValueChange,
  width = '95%',
  height = hp * 0.07,
  borderRadius = 16,
  backgroundColor = Colors.white,
  borderColor = Colors.borderColor2,
  textColor = Colors.black,
  style = {},
  textStyle = {},
  type = 'profile',
  containerstyle = {},
  required = false,
  editable=true

}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const getIcons = () => {
    switch (type) {
      case 'profile':
        return Images.user_icon_deactive;
      case 'country':
        return Images.icon_select_contry_deactive;
      case 'phone':
        return Images.icon_select_contry_deactive;
      case 'clinic':
        return Images.icon_select_contry_deactive;
      case 'specialization':
        return Images.icon_user_doctor_deactive;
      case 'accountType':
        return Images.icon_accountType;
      default:
        return Images.user_icon_deactive;
    }
  };
  const renderOptions = ({ item }) => (
    <TouchableOpacity style={styles.optionContainer}
      onPress={() => {
        onValueChange(
          type === 'profile'
            ?
            item
            :
            type === 'specialization'
              ?
              item?.specializationName
              :
              type === 'country'
                ?
                item?.name
                :
                type === 'clinic'
                  ?
                  {
                    id: item?.id,
                    clinicName: item?.clinicName
                  }
                  :
                  item
        );
        setModalVisible(false);
      }}
    >
      <Text style={styles.optionStyle}>{
        type === 'profile'
          ?
          item
          :
          type === 'specialization'
            ?
            item?.specializationName
            :
            type === 'country'
              ?
              item?.name
              :
              type === 'phone'
                ?
                `${item?.code} ${item?.name}`
                :
                type === 'clinic'
                  ?
                  item?.clinicName
                  :
                  item
      }</Text>
    </TouchableOpacity>
  )

  return (
    <View style={containerstyle}>
      <View style={{ flexDirection: "row", alignItems: 'center' }}>
        <Text style={styles.heading}>{heading}</Text>
        {required &&
          <Text style={styles.heading3}>*</Text>
        }
      </View>
      <TouchableOpacity
        style={[
          styles.dropdownButton,
          { backgroundColor, borderRadius, width, height, borderColor },
          style,
        ]}
        onPress={() =>{ 
          if(editable){
            setModalVisible(true)
          }
        }
        }
        activeOpacity={1}
      >
        <View style={styles.dropsownTextContainer}>
          <Image source={getIcons()} style={styles.icon} />
          {type == "phone" ?
            <Text style={[styles.dropdownText, { color: textColor }, textStyle]}>
              {selectedValue?.code|| placeholder}
            </Text>
            :
            <Text style={[styles.dropdownText, { color: textColor }, textStyle]}>
              {selectedValue || placeholder}
            </Text>
          }
        </View>
        <Image source={Images.icon_dropdown} style={styles.icon2} />
      </TouchableOpacity>
      <Modal
        visible={modalVisible}
        transparent={true}
        animationType='fade'
        onRequestClose={() => setModalVisible(false)}
      >
        <Pressable 
        style={styles.modalContainer}
        onPress={()=>setModalVisible(false)}
        >
          <View style={styles.pickerContainer}>
            {/* <Picker
                selectedValue={selectedValue}
                onValueChange={(itemValue) => {
                  onValueChange(itemValue);
                  setModalVisible(false);
                }}
              >
                {options.map((option, index) => (
                  <Picker.Item key={index} label={option} value={option} />
                ))}
              </Picker> */}
            <FlatList
              data={options}
              renderItem={renderOptions}
              scrollEnabled={true}  // Allow scrolling when options exceed the limit
              nestedScrollEnabled={true}
              showsVerticalScrollIndicator={false}
              keyExtractor={(item, index) => index.toString()}

            />
          </View>
        </Pressable>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  dropdownButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    // borderLeftWidth: 1,
    // borderRightWidth: 1,
    // borderBottomWidth: 1,
    borderWidth: 1,
    paddingHorizontal: wp * 2.5 / 100,
    marginVertical: hp * 0.5 / 100,
  },
  dropsownTextContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '60%'
  },
  dropdownText: {
    fontFamily: Fonts.Regular,
    fontSize: ResponsiveFont(14),
    marginLeft: '7%'
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.shadow,
  },
  pickerContainer: {
    width: '90%',
    backgroundColor: Colors.white,
    borderRadius: wp * 3 / 100,
    paddingHorizontal: wp * 2 / 100,
    paddingVertical: wp * 2 / 100,
    maxHeight: '50%',  // Ensure the modal only takes up to 50% of screen height
  },
  heading: {
    fontFamily: Fonts.Bold,
    fontSize: ResponsiveFont(13),
    lineHeight: ResponsiveFont(17.5),
    color: Colors.black
  },
  heading2: {
    fontFamily: Fonts.Bold,
    fontSize: ResponsiveFont(20),
    lineHeight: ResponsiveFont(17.5),
    color: Colors.black
  },
  heading3: {
    fontFamily: Fonts.Bold,
    fontSize: ResponsiveFont(20),
    lineHeight: ResponsiveFont(17.5),
    color: Colors.red2
  },
  optionContainer: {
    width: '100%%',
    backgroundColor: Colors.white,
    marginVertical: '0.5%',
    paddingVertical: wp * 3 / 100,
  },
  optionStyle: {
    fontFamily: Fonts.Bold,
    fontSize: ResponsiveFont(18),
    lineHeight: ResponsiveFont(24),
    color: Colors.black,
    textAlign: 'center'
  },
  optionsList: {
    maxHeight: '50%', // Limit dropdown height
  },
  icon: {
    width: (wp * 5) / 100,
    height: (wp * 5) / 100,
    resizeMode: 'contain',
  },
  icon2: {
    width: (wp * 4) / 100,
    height: (wp * 4) / 100,
    resizeMode: 'contain',
  }
});
