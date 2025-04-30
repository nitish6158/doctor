import React from 'react';
import { Text, TouchableOpacity, StyleSheet, Modal, Image, View } from 'react-native';
import { Colors, Fonts, Images, WindowWidth as wp, ResponsiveFont, WindowHeight as hp, opacityOfButton } from '../../assets';
import { CustomButton } from '../button';
import { useTranslation } from '../customhooks';
export const LogoutModal = ({
  isModalOpen = false,
  onClose,
  onLogout
}) => {
  const t=useTranslation();
  return (
    <Modal
      visible={isModalOpen}
      transparent={true}
      animationType='fade'
      onRequestClose={
        onClose
      }
    >
      <View style={styles.container}>
        <View style={styles.modalarea}
          onPress={onClose}
        >
          <View style={styles.logoutContainer}>
            <View style={styles.logoutButton}>
              <Text style={styles.logoutText}>{t('Logout')}</Text>
            </View>
            <Image
              source={Images.icon_logout2}
              style={styles.logoutIconstyle}
            />
          </View>
          <Text style={styles.headingcontainer}>{t('LogoutConfirmation')}</Text>

          <View style={styles.buttonContainer}>
            <CustomButton
              title={t('Cancel')}
              onPress={onClose}
              style={styles.buttonStyles}
              backgroundColor={Colors.light_blue2}
              textColor={Colors.light_blue}
              fontSize={13}
              marginVertical='2%'


            />
            <CustomButton
              title={t('Logout')}
              onPress={onLogout}
              style={styles.buttonStyles}
              backgroundColor={Colors.red}
              textColor={Colors.red2}
              fontSize={13}
              marginVertical='2%'


            />
          </View>
        </View>
      </View>

    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.shadow
  },
  logoutIconstyle: {
    width: wp * 9 / 100,
    height: (wp * 9) / 100,
    resizeMode: 'contain'
  },
  modalarea: {
    width: '75%',
    backgroundColor: Colors.white,
    borderRadius: (wp * 8) / 100,
    alignItems: 'center',
    paddingVertical: (wp * 15) / 100
  },
  imagecontainer: {
    backgroundColor: Colors.shadowBlue,
    width: wp * 25 / 100,
    height: (wp * 25) / 100,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: (wp * 14) / 100
  },
  headingcontainer: {
    fontSize: ResponsiveFont(20),
    lineHeight: ResponsiveFont(25),
    color: Colors.black,
    fontFamily: Fonts.Bold,
    marginVertical: (wp * 2) / 100
  },
  iconstyles: { width: (wp * 18) / 100 },
  buttonContainer: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-around',
  },
  buttonStyles: {
    width: '40%',
    height: '90%',

  },
  logoutContainer: {
    width: "100%",
    alignItems: 'center'
  },
  logoutButton: {
    // flexDirection: 'row',
    borderRadius: wp * 4 / 100,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.red3,
    width: '35%',
    paddingVertical: '3%'
  },
  logoutText: {
    color: Colors.white,
    fontFamily: Fonts.Bold,
    fontSize: ResponsiveFont(24),
    lineHeight: ResponsiveFont(30),
    // marginHorizontal: '5%',
  },
});

