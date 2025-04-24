import { useState } from 'react';
import axios from 'axios';
import { BASE_URL ,END_POINT } from '../../Redux/config';
export const usePictureUpload = () => {
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState(null);

  const apiName = BASE_URL+END_POINT.fileUpload

  const uploadPhoto = async (file) => {
    setIsUploading(true);
    setError(null);

    const formData = new FormData();
    formData.append('file', {
      uri: file.uri,
      name: file.fileName,
      type: file.type,
    });

    try {
      const response = await axios.post(
        apiName,
        formData,
        { headers: { 'Content-Type': 'multipart/form-data' } }
      );

      if (response?.data?.status === 200) {
        return response.data.data; // Return the file URL
      } else {
        throw new Error(response?.data?.message || 'Upload failed');
      }
    } catch (error) {
      const errorMessage = error.message || 'An error occurred during the upload.';
      setError(errorMessage);
      throw error;
    } finally {
      setIsUploading(false);
    }
  };

  return { uploadPhoto, isUploading, error };
};

