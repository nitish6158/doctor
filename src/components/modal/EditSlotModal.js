import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal, Image, } from 'react-native';
import { Images, Colors, WindowWidth as wp, WindowHeight as hp, Fonts, ResponsiveFont } from '../../assets';
import { ToastMsg } from '../Toast';
import { ListingCard } from '../card';
import { CustomTimeInput, AddressInput } from '../input';
import { CustomButton } from '../button';
export const EditSlotModal = ({
  visible,
  onClose,
  selectedSlot,
  onPressUpdateSlot,
}) => {


  const [mode, setMode] = useState(selectedSlot?.mode || "online")
  const [startTime, setStartTime] = useState(selectedSlot?.startTime )
  const [endTime, setEndTime] = useState(selectedSlot?.endTime )
  const [location, setLocation] = useState(selectedSlot?.location || "")

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
                  backgroundColor: mode === 'online' ? Colors.blue : Colors.white
                }]}
                onPress={() => setMode('online')}
              >
                <Text style={[styles.modeText,
                { color: mode === 'online' ? Colors.white : Colors.blue }]}>
                  online
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.modeButton, {
                  backgroundColor: mode === 'offline' ? Colors.blue : Colors.white
                }]}
                onPress={() => setMode('offline')}
              >
                <Text style={[styles.modeText,
                { color: mode === 'offline' ? Colors.white : Colors.blue }]}>
                  offline
                </Text>
              </TouchableOpacity>
            </View>
            <View style={styles.slotContainer}>
              <CustomTimeInput
                placeholder={"From HH:MM"}
                onTimeChange={(time) => {
                  setStartTime(time)
                  const calculatedToTime = add15Minutes(time);
                  setEndTime(calculatedToTime)
                }}
                value={startTime}
                paddingVertical='1.2%'
              />
              <CustomTimeInput
                placeholder="To HH:MM"
                onTimeChange={(time) => updateSlot(index, 'toTime', time)}
                value={endTime}
                editable={false} // disables the input
                paddingVertical='1.2%'
              />
            </View>

            {mode === 'offline' && (
              <View style={styles.addressContainer4}>
                <AddressInput
                  heading='Select Location'
                  placeholder='Select Location'
                  value={location}
                  onChangeText={(setLocation)}
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
              if (!startTime || !endTime) {
                ToastMsg("Start and End time are required", "bottom");
                return;
              }
              const updatedData = {
                ...selectedSlot,
                startTime,
                endTime,
                location,
                mode,
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

