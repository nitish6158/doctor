import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal, Image, } from 'react-native';
import { Images, Colors, WindowWidth as wp, WindowHeight as hp, Fonts, ResponsiveFont } from '../../assets';
import { ToastMsg } from '../Toast';
import { ListingCard } from '../card';
import { CustomTimeInput, AddressInput } from '../input';
import { CustomButton } from '../button';
export const AddLocationModal = ({
  visible,
  onClose,
  onAddNewLocation,
  onUpdateLocation,
  locationName,
  setLocationName,
  buildingDetail,
  setBuildingDetail,
  address,
  setAddress,
  isUpdate,
}) => {

  return (
    <Modal
      animationType="slide"
      transparent
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>

        <TouchableOpacity style={styles.closeButton} onPress={onClose}>
          <Image source={Images.icon_cross} style={styles.iconClose} />
        </TouchableOpacity>

        <View style={styles.modal}>
          {isUpdate ?
            <Text style={styles.title}>Update Location</Text>
            :
            <Text style={styles.title}>Add New Location</Text>
          }

          <AddressInput
            heading='Location Name'
            placeholder={'Enter Location Name'}
            value={locationName}
            onChangeText={setLocationName}
            width='100%'
            containerstyle={styles.containerstyle}
          />
          <AddressInput
            heading='Building Name & Floor Number'
            placeholder={'Enter Detail'}
            value={buildingDetail}
            onChangeText={setBuildingDetail}
            width='100%'
            containerstyle={styles.containerstyle}

          />
          <AddressInput
            heading='Address'
            placeholder={'Enter Address'}
            value={address}
            onChangeText={setAddress}
            width='100%'
            containerstyle={styles.containerstyle}

          />
          <TouchableOpacity
            onPress={
              isUpdate ?
              onUpdateLocation
              :
              onAddNewLocation
            }
            style={styles.ButtonStyle}
          >
            <Text style={styles.buttonText}>{
              isUpdate ?
                "Update Location"
                :
                "Add New Location"
            }</Text>
          </TouchableOpacity>

          {/* </View> */}



          {/* <CustomButton
            title={"Add New Location"}
            width={wp * 90 / 100}
            onPress={() => { console.log("hellow") }}
            marginVertical='1.5%'
          /> */}
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: Colors.shadow
  },
  modal: {
    backgroundColor: Colors.white,
    borderTopLeftRadius: '8%',
    borderTopRightRadius: '8%',
    padding: '3%',
    // alignItems: 'center',
    width: '100%',
  },
  containerstyle: {
    marginVertical: '2%'
  },
  closeButton: {
    alignSelf: 'center',
    marginBottom: '2%',
    backgroundColor: Colors.white,
    padding: '4%',
    borderRadius: '50%',

  },
  iconClose: {
    width: wp * 5 / 100,
    height: wp * 5 / 100,
    resizeMode: 'contain'
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 15,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 12,
    paddingHorizontal: 10,
    paddingVertical: 12,
    marginBottom: 10,
  },
  icon: {
    width: 24,
    height: 24,
    resizeMode: 'contain',
  },
  infoText: {
    flex: 1,
    marginLeft: 10,
    fontSize: 16,
    color: '#333',
  },
  listingCard: {
    width: wp * 90 / 100,
    alignSelf: 'center',
    paddingHorizontal: '4%'
  },
  modeContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    paddingVertical: '3%',
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
  slotContainer: {
    width: '100%',
    flexDirection: 'row',
    paddingVertical: '1%',
    justifyContent: 'space-between',
  },
  addressContainer4: {
    // flexDirection: 'row',
    // backgroundColor:'red'
    marginVertical: '3%',
    width: '100%'
  },
  buttonText: {
    fontFamily: Fonts.Bold,
    fontSize: ResponsiveFont(18),
    color: Colors.white,
  },
  ButtonStyle: {
    backgroundColor: Colors.blue,
    width: '100%',
    paddingVertical: '4%',
    borderRadius: wp * 4 / 100,
    // marginBottom:'10%',
    marginVertical: '2%',
    alignItems: 'center'
  },

});

