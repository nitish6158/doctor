import { useState } from "react";
import { Platform, Alert } from "react-native";
import { pick } from "@react-native-documents/picker";
import { BASE_URL, END_POINT } from "../../Redux/config";
import useTranslation from "./useTranslation";
export const useFileUpload = (fileUpload, params = {}) => {
    const [loading, setLoading] = useState(false);
    const [fileUrl, setFileUrl] = useState(null);  // Store uploaded file URL
    const [error, setError] = useState(null);  // Store any error message
    const t = useTranslation();
    const uploadFile = async () => {
        try {
            // Pick a file
            const [selectedFile] = await pick({
                type: Platform.OS === "ios" ? ["com.adobe.pdf"] : ["application/pdf"],
            });

            if (!selectedFile) {
                Alert.alert(t('Error'), t('NoFileSelected'));
                return { success: false, error: t('NoFileSelected') };
            }

            setLoading(true); // Start loading
            setError(null);
            setFileUrl(null);

            // Create FormData
            const formData = new FormData();
            formData.append("file", {
                uri: selectedFile.uri,
                name: selectedFile.name || "document.pdf",
                type: selectedFile.mimeType || "application/pdf",
            });

            const queryString = Object.keys(params)
                .map((key) => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
                .join("&");

            // Final API URL with query parameters
            const finalUrl = queryString ? `${BASE_URL}${fileUpload}?${queryString}` : `${BASE_URL}${fileUpload}`;


            // Upload to API
            const response = await fetch(finalUrl, {
                method: "POST",
                body: formData,
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });

            const result = await response.json();
            setLoading(false); // Stop loading

            if (response.ok) {
                setFileUrl(result.data);
                Alert.alert(
                    t('Success'),
                    t('FileUploaded'));

                return { success: true, fileUrl: result.data, message: result.message };
            } else {
                setError(result.message || t('UploadFailed'));
                Alert.alert(t('Error'), result.message || t('UploadFailed'));

                return { success: false, error: result.message };
            }
        } catch (error) {
            setLoading(false); // Stop loading
            setError(t('SomethingWentWrong'));
            console.error("Upload error:", error);
            Alert.alert(t('Error'), t('SomethingWentWrong'));

            return { success: false, error: t('SomethingWentWrong') };
        }
    };

    return { uploadFile, loading, fileUrl, error };
};