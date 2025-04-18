import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal, Image, } from 'react-native';
import { Images, Colors, WindowWidth as wp, WindowHeight as hp, Fonts, ResponsiveFont } from '../../assets';
import { ToastMsg } from '../Toast';
import { ListingCard } from '../card';
import { CustomTimeInput, AddressInput, TimePicker } from '../input';
import { CustomButton } from '../button';
export const EditSlotModal = ({
  visible,
  onClose,
  selectedSlot,
  onPressUpdateSlot,
  editMode,
  setEditMode,
  editStartTime,
  setEditStartTime,
  editEndTime,
  setEditEndTime,
  editLocation,
  setEditLocation,
}) => {

  const add15Minutes = (time) => {
    if (!time || !time.includes(":")) return "";

    const [hour, minute] = time.split(":").map(Number);
    if (isNaN(hour) || isNaN(minute)) return "";

    const start = new Date();
    start.setHours(hour);
    start.setMinutes(minute + 15); // Add 15 mins

    const hh = String(start.getHours()).padStart(2, "0");
    const mm = String(start.getMinutes()).padStart(2, "0");
    return `${hh}:${mm}`;
  };

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
          <Text style={styles.title}>Edit Time Slot</Text>

          <ListingCard customStyles={styles.listingCard}>
            <View style={styles.modeContainer}>
              <TouchableOpacity
                style={[styles.modeButton, {
                  marginHorizontal: '0%',
                  backgroundColor: editMode === 'online' ? Colors.blue : Colors.white
                }]}
                onPress={() => setEditMode('online')}
              >
                <Text style={[styles.modeText,
                { color: editMode === 'online' ? Colors.white : Colors.blue }]}>
                  online
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.modeButton, {
                  backgroundColor: editMode === 'offline' ? Colors.blue : Colors.white
                }]}
                onPress={() => setEditMode('offline')}
              >
                <Text style={[styles.modeText,
                { color: editMode === 'offline' ? Colors.white : Colors.blue }]}>
                  offline
                </Text>
              </TouchableOpacity>
            </View>
            <View style={styles.slotContainer}>
              {/* <CustomTimeInput
                placeholder={"From HH:MM"}
                onTimeChange={(time) => {
                  setEditStartTime(time)
                  const calculatedToTime = add15Minutes(time);
                  setEditEndTime(calculatedToTime)
                }}
                value={editStartTime}
                paddingVertical='1.2%'
              />
              <CustomTimeInput
                placeholder="To HH:MM"
                onTimeChange={(time) => updateSlot(index, 'toTime', time)}
                value={editEndTime}
                editable={false} // disables the input
                paddingVertical='1.2%'
              /> */}

              <TimePicker
                value={editStartTime}
                onChange={(time) => {
                  setEditStartTime(time)
                  const calculatedToTime = add15Minutes(time);
                  setEditEndTime(calculatedToTime)
                }}
                label="From Time"
              />
              <TimePicker
                value={editEndTime}
                onChange={(time) => {
                  // updateSlot(index, 'toTime', time)
                  setEditEndTime(time)
                }}
                label="To Time"
                minTime={editStartTime}
              />
            </View>

            {editMode === 'offline' && (
              <View style={styles.addressContainer4}>
                <AddressInput
                  heading='Select Location'
                  placeholder='Select Location'
                  value={editLocation}
                  onChangeText={(setEditLocation)}
                  width='100%'
                />
              </View>
            )}
          </ListingCard>
          <CustomButton
            title={"Update Slot"}
            width={wp * 90 / 100}
            marginVertical='1.5%'
            onPress={() => {
              if (!editStartTime || !editEndTime) {
                ToastMsg("Start and End time are required", "bottom");
                return;
              }
              const updatedData = {
                ...selectedSlot,
                startTime: editStartTime,
                endTime: editEndTime,
                location: editLocation,
                mode: editMode,
              };
              onPressUpdateSlot(updatedData);
              onClose(); // optionally close modal here
            }}
          />

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
    padding: '8%',
    alignItems: 'center'

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

});

