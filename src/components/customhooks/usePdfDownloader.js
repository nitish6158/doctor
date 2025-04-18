import { useState } from 'react';
import { Platform, Alert, PermissionsAndroid } from 'react-native';
import RNFS from 'react-native-fs';
import ReactNativeBlobUtil from 'react-native-blob-util';
import { check, request, PERMISSIONS, RESULTS } from 'react-native-permissions';
import FileViewer from 'react-native-file-viewer';
import Share from 'react-native-share';

export const usePdfDownloader = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    const requestStoragePermission = async () => {
        if (Platform.OS === 'android') {
            if (Platform.Version >= 33) { // Android 13+
                const result = await request(PERMISSIONS.ANDROID.READ_MEDIA_IMAGES);
                return result === RESULTS.GRANTED;
            } else if (Platform.Version >= 30) { // Android 11 & 12
                const result = await request(PERMISSIONS.ANDROID.MANAGE_EXTERNAL_STORAGE);
                return result === RESULTS.GRANTED;
            } else { // Android 6 - 10
                const granted = await PermissionsAndroid.request(
                    PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE
                );
                return granted === PermissionsAndroid.RESULTS.GRANTED;
            }
        }
        return true;
    };

    const downloadFile = async (pdfUrl) => {
        console.log(pdfUrl)
        setLoading(true);
        setError(null);
        setSuccess(null);
        
        try {
            const fileName = pdfUrl.split('/').pop();
            const path = Platform.OS === 'ios' 
                ? `${RNFS.DocumentDirectoryPath}/${fileName}` 
                : `${RNFS.DownloadDirectoryPath}/${fileName}`;

            if (Platform.OS === 'android') {
                const hasPermission = await requestStoragePermission();
                if (!hasPermission) {
                    setLoading(false);
                    setError("Storage permission is required to download the PDF.");
                    Alert.alert("Permission Denied", "Storage permission is required to download the PDF.");
                    return;
                }
            }
            
            const response = await RNFS.downloadFile({
                fromUrl: pdfUrl,
                toFile: path,
            }).promise;

            if (response.statusCode === 200) {
                setSuccess("PDF Downloaded Successfully");
                Alert.alert("Success", "PDF Downloaded Successfully");
                
                if (Platform.OS === 'ios') {
                    Share.open({
                        url: `file://${path}`,
                        type: 'application/pdf',
                    }).catch((error) => console.log('Error opening file', error));
                } else {
                    FileViewer.open(path);
                }
            } else {
                setError("Failed to download PDF");
                Alert.alert("Error", "Failed to download PDF");
            }
        } catch (err) {
            setError(err.message);
            Alert.alert("Error", "Something went wrong: " + err.message);
        } finally {
            setLoading(false);
        }
    };

    return { downloadFile, loading, error, success };
};

