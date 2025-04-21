import React from 'react';
import { Text, TouchableOpacity, StyleSheet, Modal, Image, View } from 'react-native';
import { Colors, Fonts, Images, WindowWidth as wp, ResponsiveFont, WindowHeight as hp, opacityOfButton } from '../../assets';

export const SuccessModal = ({
  icon = 'success',
  heading,
  subHeading,
  isModalOpen = false,
  onClose,
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
        <TouchableOpacity style={{
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
            <Image source={Images.icon_done} 
            style={{ width: (wp * 18) / 100, 
          }}
          resizeMode='contain' 
             />

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
          <Text style={{
            width: wp * 60 / 100,
            fontSize: ResponsiveFont(16),
            lineHeight: ResponsiveFont(24),
            color: Colors.gray,
            fontFamily: Fonts.SemiBold,
            textAlign: 'center'
          }}>
            {subHeading}
          </Text>
        </TouchableOpacity>
      </View>

    </Modal>
  );
};

const styles = StyleSheet.create({

});

