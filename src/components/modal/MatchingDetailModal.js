import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal, Image,  } from 'react-native';
import { Images, Colors, WindowWidth as wp, WindowHeight as hp, Fonts, ResponsiveFont } from '../../assets';
import { ToastMsg } from '../Toast';
import Clipboard from '@react-native-clipboard/clipboard';
import { useTranslation } from '../customhooks';
export const MatchingDetailModal = ({ visible, onClose,mobileNumber,email }) => {
  const t=useTranslation()
  const handleCopy = (text) => {
    Clipboard.setString(text);
    ToastMsg(t('CopiedToClipboard'), "bottom");
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
          <Text style={styles.title}>{t('MatchingDetail')}</Text>

          <View style={styles.row}>
            <Image source={Images.icon_mobile_active} style={styles.icon} />
            <Text style={styles.infoText}>{mobileNumber}</Text>
            <TouchableOpacity onPress={() => handleCopy(mobileNumber)}>
              <Image source={Images.icon_copy} style={styles.icon} />
            </TouchableOpacity>
          </View>

          <View style={styles.row}>
            <Image source={Images.icon_email_active} style={styles.icon} />
            <Text style={styles.infoText}>{email}</Text>
            <TouchableOpacity onPress={() => handleCopy(email)}>
              <Image source={Images.icon_copy} style={styles.icon} />
            </TouchableOpacity>
          </View>
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
  },
  closeButton: {
    alignSelf: 'center',
    marginBottom: '2%',
    backgroundColor:Colors.white,
    padding:'4%',
    borderRadius:'50%',
    
  },
  iconClose: {
    width: wp*5/100,
    height: wp*5/100,
    resizeMode:'contain'
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
});

