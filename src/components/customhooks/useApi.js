import { useState, useCallback } from "react";
import axios from "axios";
import { BASE_URL } from "../../Redux/config";
export const useApi = () => {
  const [apiData, setApiData] = useState({});
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const request = useCallback(async (key, endpoint, method = "GET", body = null, headers = {}) => {
    setLoading(true);
    setErrors((prevErrors) => ({ ...prevErrors, [key]: null }));

    try {
      const response = await axios({
        url: `${BASE_URL}${endpoint}`,
        method,
        data: body,
        headers: {
          "Content-Type": "application/json",
          ...headers,
        },
      });

      setApiData((prevData) => ({ ...prevData, [key]: response.data }));
      return response.data;
    } catch (err) {
      const errorMsg = err.response?.data?.message || err.message || "Something went wrong";
      setErrors((prevErrors) => ({ ...prevErrors, [key]: errorMsg }));
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  return { apiData, loading, errors, request };
};

