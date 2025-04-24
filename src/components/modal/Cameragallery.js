import React from 'react';
import {
  View,
  Dimensions,
  Modal,
  StyleSheet,
  TouchableOpacity,
  Text,
} from 'react-native';
import { Colors, Fonts , ResponsiveFont, WindowWidth} from '../../assets';
import { useTranslation } from '../customhooks';
const screenWidth = Math.round(Dimensions.get('window').width);

export const Cameragallery = props => {
  const t=useTranslation();
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={props.mediamodal}
      onRequestClose={() => {}}>
      <View style={styles.cameraAlignment}>
        <View style={styles.cameraButton}>
          <View style={styles.cameraWH}>
            <TouchableOpacity
              style={styles.cameraOnPress}
              activeOpacity={0.9}
              onPress={() => {
                props.Camerapopen();
              }}>
              <View style={styles.cameraCss}>
                <Text style={styles.cameraText}>{t('Camera')}</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.galleryButton}
              activeOpacity={0.9}
              onPress={() => {
                props.Galleryopen();
              }}>
              <View style={styles.galleryCss}>
                <Text style={styles.galleryText}>{t('Gallery')}</Text>
              </View>
            </TouchableOpacity>
          </View>
          <View style={styles.cancelButton}>
            <TouchableOpacity
                activeOpacity={0.9}
              onPress={() => {
                props.Canclemedia();
              }}
              style={styles.cancelCss}>
              <Text style={styles.cancelText}>{t('Cancel')}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};
const styles = StyleSheet.create({
  cameraAlignment: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: Colors.shadow
  },
  cameraButton: {
    // position: 'absolute',
    // bottom: 20,
    // width: (WindowWidth * 100) / 100,
    // backgroundColor: Colors.white,
    // borderRadius: 30,
    // paddingVertical:WindowWidth *5/100,

    backgroundColor: Colors.white,
    borderTopLeftRadius: '8%',
    borderTopRightRadius: '8%',
    padding: '8%',
    alignItems: 'center'
  },
  cameraWH: {
    alignSelf: 'center',
    width: '100%',
  },
  cameraOnPress: {
    width: '100%',
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    // borderBottomWidth: 0.5,
  },
  cameraCss: {
    width: '94%',
    backgroundColor: Colors.blue,
    borderRadius: 30,
    paddingVertical: (screenWidth * 3.5) / 100,
  },
  cameraText: {
    fontFamily: Fonts.SemiBold,
    textAlign: 'center',
    fontSize: ResponsiveFont(18),
    color: Colors.white,
  },
  galleryButton: {
    width: '100%',
    alignSelf: 'center',
    marginTop: 10,
    justifyContent: 'center',
    alignItems: 'center',
    // borderBottomWidth: 0.5,
  },
  galleryCss: {
    width: '94%',
    backgroundColor: Colors.blue,
    borderRadius: 30,
    paddingVertical: (screenWidth * 3.5) / 100,
  },
  galleryText: {
    fontFamily: Fonts.SemiBold,
    textAlign: 'center',
    fontSize: ResponsiveFont(18),
    color: Colors.white,
  },
  cancelButton: {
    width: '100%',
    alignSelf: 'center',
    marginTop: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cancelCss: {
    width: '94%',
    backgroundColor: Colors.blue,
    borderRadius: 30,
    paddingVertical: (screenWidth * 3.5) / 100,
  },
  cancelText: {
    fontFamily: Fonts.SemiBold,
    fontSize: ResponsiveFont(18),
    color: Colors.white,
    textAlign: 'center',
  },
});
