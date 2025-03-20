import { useState } from 'react';
import axios from 'axios';
import { BASE_URL, END_POINT } from '../../Redux/config';
const useFileUpload = () => {
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState(null);
 
  const apiName = BASE_URL+END_POINT.fileUpload
 
  const uploadFile = async (file) => {
    setIsUploading(true);
    setError(null);
 
    const formData = new FormData();
    formData.append('file', {
      uri: file.uri,
      name: file.name,
      type: file.type,
    });

    console.log(formData,"fomrdata")
 
    try {
      const response = await axios.post(
        apiName,
        formData,
        { headers: { 'Content-Type': 'multipart/form-data' } }
      );
 
      if (response?.data?.responseCode === 200) {
        return response.data.responseBody; // Return the file URL
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
 
  return { uploadFile, isUploading, error };
};
 
export default useFileUpload;