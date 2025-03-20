import {Alert, Platform} from 'react-native';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {request, PERMISSIONS} from 'react-native-permissions';
import {PermissionsAndroid,Linking} from 'react-native';
 
// Request camera permission (for Android/iOS)
const requestCameraPermission = async () => {
  if (Platform.OS === 'ios') {
    const permission = await request(PERMISSIONS.IOS.CAMERA);
    return permission === 'granted';
  } else {
    const result = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.CAMERA
    );
 
    if (result === PermissionsAndroid.RESULTS.GRANTED) {
      return true; // Permission granted
    } else if (result === PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN) {
      Alert.alert(
        'Permission Required',
        'Camera permission is required to take pictures. Please enable it from Settings.',
        [
          {text: 'Cancel', style: 'cancel'},
          {
            text: 'Open Settings',
            onPress: () => Linking.openSettings(),
          },
        ]
      );
      return false;
    }
 
    return false;
  }
};
 
// Request storage permission for Android
const requestStoragePermission = async () => {
  if (Platform.OS === 'android') {
    let permission;
    if (Platform.Version >= 33) {
      permission = await request(PERMISSIONS.ANDROID.READ_MEDIA_IMAGES);
    } else if (Platform.Version >= 30) {
      permission = await request(PERMISSIONS.ANDROID.MANAGE_EXTERNAL_STORAGE);
    } else {
      permission = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE
      );
    }
 
    if (permission === 'granted' || permission === PermissionsAndroid.RESULTS.GRANTED) {
      return true;
    } else if (permission === PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN) {
      Alert.alert(
        'Permission Required',
        'Storage permission is required to select images. Please enable it from Settings.',
        [
          {text: 'Cancel', style: 'cancel'},
          {
            text: 'Open Settings',
            onPress: () => Linking.openSettings(),
          },
        ]
      );
      return false;
    }
    return false;
  }
  return true; // iOS does not need storage permission
};
 
export const handleMediaSelection = async (fromCamera, type) => {
  let permissionGranted = true;
 
  // Request appropriate permissions based on type
  if (fromCamera) {
    permissionGranted = await requestCameraPermission();
  } else {
    permissionGranted = await requestStoragePermission();
  }
 
  if (!permissionGranted) {
    Alert.alert('Permission Denied', 'Required permissions not granted.');
    return null;
  }
 
  // Set media type based on the provided type
  let mediaType;
  if (type === 'photo') {
    mediaType = 'photo'; // Only allow photos
  } else if (type === 'video') {
    mediaType = 'video'; // Only allow videos
  } else if (type === 'gallary') {
    mediaType = 'mixed'; // Allow both when selecting from gallery (optional)
  } else {
    Alert.alert('Invalid Type', 'The media type is not supported.');
    return null;
  }
 
  const options = {
    mediaType, // Use the mediaType determined above
    includeBase64: false,
    quality: 1, // High quality
  };
 
  const result = fromCamera
    ? await launchCamera(options)
    : await launchImageLibrary(options);
 
  // Check the result and handle different cases
  if (result.didCancel) {
    return null; // User cancelled, return null
  } else if (result.errorCode) {
    Alert.alert('Error', 'An error occurred while selecting media.');
    return null; // Return null on error
  } else if (result.assets && result.assets.length > 0) {
    const pickedMedia = result.assets[0];
    return pickedMedia; // Return the selected media
  }
 
  // If nothing is returned
  return null;
};
 
 