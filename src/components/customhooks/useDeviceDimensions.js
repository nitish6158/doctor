import React, { useState, useEffect } from "react";
import { Dimensions } from "react-native";

export const useDeviceDimensions = () => {

    const [dimensions, setDimensions] = useState({
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
    })

    useEffect(() => {
        const updateDimensions = ({ window }) => {
            setDimensions({
                width: window.width,
                height: window.height,
            })
        }
        const subscription = Dimensions.addEventListener('change', updateDimensions);
        return () => {
            subscription?.remove();
        };
    }, []);

    return dimensions;
}
