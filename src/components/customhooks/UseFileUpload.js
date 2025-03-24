import { useState } from "react";
import { Platform, Alert } from "react-native";
import { pick } from "@react-native-documents/picker";
import { BASE_URL, END_POINT } from "../../Redux/config";
export const useFileUpload = () => {
    const [loading, setLoading] = useState(false);
    const [fileUrl, setFileUrl] = useState(null);  // Store uploaded file URL
    const [error, setError] = useState(null);  // Store any error message

    const uploadFile = async () => {
        try {
            // Pick a file
            const [selectedFile] = await pick({
                type: Platform.OS === "ios" ? ["com.adobe.pdf"] : ["application/pdf"],
            });

            if (!selectedFile) {
                Alert.alert("Error", "No file selected");
                return { success: false, error: "No file selected" };
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

            // Upload to API
            const response = await fetch(`${BASE_URL}${END_POINT.fileUpload}`, {
                method: "POST",
                body: formData,
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });

            const result = await response.json();
            setLoading(false); // Stop loading

            if (response.ok) {
                setFileUrl(result.data); // Store file URL from response
                Alert.alert("Success", result.message || "File uploaded successfully");

                return { success: true, fileUrl: result.data, message: result.message };
            } else {
                setError(result.message || "Upload failed");
                Alert.alert("Error", result.message || "Upload failed");

                return { success: false, error: result.message };
            }
        } catch (error) {
            setLoading(false); // Stop loading
            setError("Something went wrong");
            console.error("Upload error:", error);
            Alert.alert("Error", "Something went wrong");

            return { success: false, error: "Something went wrong" };
        }
    };

    return { uploadFile, loading, fileUrl, error };
};
