import { Alert } from 'react-native';
import { handleMediaSelection } from '../../utility/Helperfunction';
import { usePictureUpload } from './usePictureUpload';
// Main function to call on button press
export const useMediaSelectorAndUploader = (onUploadSuccess, closeModal) => {
  const { uploadPhoto, isUploading, error } = usePictureUpload();

  const handleImageUpload = async (fromCamera = false) => {
    try {
      // Close media modal immediately when a source is picked

      if (closeModal) closeModal();

      // Let user pick image from camera or gallery
      const selectedMedia = await handleMediaSelection(fromCamera, 'photo');

      if (!selectedMedia) {
        Alert.alert('No media selected');
        return null;
      }

      // Optional: show loading UI or state management
      const uploadedUrl = await uploadPhoto(selectedMedia);
      if (onUploadSuccess && uploadedUrl) {
        onUploadSuccess(uploadedUrl);
      }
      Alert.alert('Success', 'Image uploaded successfully!');
      console.log(uploadedUrl)
      return uploadedUrl;

    } catch (err) {
      console.error('Upload Error:', err);
      Alert.alert('Upload Failed', err?.message || 'Something went wrong while uploading.');
      return null;
    }
  };

  return {
    handleImageUpload, // Call this on button press
    isUploading,
    error,
  };
};

