import React from 'react';
import { Text, TouchableOpacity, Pressable, StyleSheet, Modal, Image, View } from 'react-native';
import { Colors, Fonts, Images, WindowWidth as wp, ResponsiveFont, WindowHeight as hp, opacityOfButton } from '../../assets';

export const AvailabilityModal = ({
  icon = 'success',
  heading = 'Availability Added',
  isModalOpen = false,
  onClose,
  // blockImage=false,
  type = ''
}) => {
  return (
    <Modal
      visible={isModalOpen}
      transparent={true}
      animationType='fade'
      onRequestClose={
        onClose
      }
    >
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: Colors.shadow }}>
        <Pressable style={{
          width: '75%',
          backgroundColor: Colors.white,
          borderRadius: (wp * 8) / 100,
          alignItems: 'center',
          paddingVertical: (wp * 15) / 100
        }}
          onPress={onClose}
        >
          <View style={{
            backgroundColor: Colors.shadowBlue,
            width: wp * 25 / 100,
            height: (wp * 25) / 100,
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: (wp * 14) / 100
          }}>
            <Image
              source={

                type == "matching" ?
                  Images.MatchingAdd
                  :
                  type == "blockImage" ?
                    Images.AvailabilityBlocked
                    :
                    Images.icon_availability

              } style={{
                width: (wp * 25) / 100,
                height: (wp * 25) / 100,
                resizeMode: 'contain'
              }} />

          </View>
          <Text style={{
            fontSize: ResponsiveFont(20),
            lineHeight: ResponsiveFont(25),
            color: Colors.black,
            fontFamily: Fonts.Bold,
            marginVertical: (wp * 2) / 100
          }}>
            {heading}
          </Text>

        </Pressable>
      </View>

    </Modal>
  );
};

const styles = StyleSheet.create({

});

