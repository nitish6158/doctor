import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Platform,
  StyleSheet,
  Image,
  Modal,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import moment from "moment";
import { Colors, Fonts, Images, WindowWidth as wp, ResponsiveFont } from "../../assets";

export const CustomDateInput = ({
  placeholder = "DD-MM-YYYY",
  onDateChange,
  value,
  editable = true,
  width = "48%",
  marginVertical,
  icon = "calender",
  paddingVertical = "0%",
  minimumDate,
  maximumDate,
}) => {
  const [show, setShow] = useState(false);
  const parsedDate = value ? moment(value, "DD-MM-YYYY").toDate() : new Date();

  const handleDateSelect = (event, selectedDate) => {
    setShow(false);

    if (event.type === "dismissed") return;

    if (selectedDate) {
      const formatted = moment(selectedDate).format("DD-MM-YYYY");
      onDateChange && onDateChange(formatted);
    }
  };

  const clearDate = () => {
    onDateChange && onDateChange("");
  };

  return (
    <View style={[styles.container, { width, marginVertical, paddingVertical }]}>
      <TouchableOpacity
        style={styles.iconWrapper}
        onPress={() => editable && setShow(true)}
      >
        <Image
          source={icon === "calender" ? Images.icon_celender : Images.time2}
          style={styles.icon}
        />
      </TouchableOpacity>

      <TouchableOpacity
        style={{ flex: 1 }}
        onPress={() => editable && setShow(true)}
      >
        <Text style={styles.input}>
          {value || placeholder}
        </Text>
      </TouchableOpacity>

      {value && editable ? (
        <TouchableOpacity onPress={clearDate} style={styles.iconWrapper}>
          <Image source={Images.cross_icon} style={styles.icon} />
        </TouchableOpacity>
      ) : null}

      {show && (
        <DateTimePicker
          value={parsedDate}
          mode="date"
          display={Platform.OS === "ios" ? "spinner" : "default"}
          onChange={handleDateSelect}
          minimumDate={minimumDate}
          maximumDate={maximumDate}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: Colors.blue,
    borderRadius: 10,
    paddingHorizontal: 10,
    backgroundColor: Colors.white,
  },
  input: {
    fontSize: ResponsiveFont(12),
    color: Colors.black,
    fontFamily: Fonts.Regular,
    paddingVertical: 10,
  },
  iconWrapper: {
    padding: 2,
    // backgroundColor:'red'
  },
  icon: {
    width: wp * 5 / 100,
    height: wp * 5 / 100,
    resizeMode: "contain",
  },
});




// import React from "react";
// import { View, TextInput, TouchableOpacity, StyleSheet, Image } from "react-native";
// import { Images, Colors, WindowWidth as wp, Fonts, ResponsiveFont } from "../../assets";
// import { ToastMsg } from "../Toast";

// export const CustomDateInput = ({
//   placeholder = "DD-MM-YYYY",
//   onDateChange,
//   value,
//   editable = true,
//   width = '48%',
//   marginVertical,
//   icon,
//   paddingVertical='0%'
// }) => {

//   const handleDateChange = (text) => {
//     let raw = text.replace(/[^0-9]/g, "");

//     if (raw.length > 8) return;

//     let formatted = "";
//     if (raw.length > 0) formatted += raw.substring(0, 2);
//     if (raw.length > 2) formatted += "-" + raw.substring(2, 4);
//     if (raw.length > 4) formatted += "-" + raw.substring(4, 8);

//     if (raw.length === 8) {
//       const day = parseInt(raw.substring(0, 2), 10);
//       const month = parseInt(raw.substring(2, 4), 10);
//       const year = parseInt(raw.substring(4, 8), 10);

//       const isValid =
//         day >= 1 && day <= 31 &&
//         month >= 1 && month <= 12 &&
//         year >= 1900 && year <= 2100;

//       const dateObj = new Date(`${year}-${month}-${day}`);

//       if (!isValid || isNaN(dateObj.getTime()) || dateObj.getDate() !== day) {
//         ToastMsg("Please enter a valid date in DD-MM-YYYY format");
//         return;
//       }
//     }

//     onDateChange && onDateChange(formatted);
//   };

//   const clearDate = () => {
//     onDateChange && onDateChange("");
//   };

//   return (
//     <View style={[styles.container, { width, marginVertical ,paddingVertical}]}>
//       <TouchableOpacity style={styles.iconWrapper}>
//         <Image
//           source={icon === "calender" ? Images.icon_celender : Images.time2}
//           style={styles.icon}
//         />
//       </TouchableOpacity>

//       <TextInput
//         style={styles.input}
//         value={value || ""}
//         placeholder={placeholder}
//         keyboardType="numeric"
//         maxLength={10}
//         onChangeText={handleDateChange}
//         placeholderTextColor={Colors.black}
//         editable={editable !== false}
//       />

//       {value && editable ? (
//         <TouchableOpacity onPress={clearDate} style={styles.iconWrapper}>
//           <Image source={Images.cross_icon} style={styles.icon} />
//         </TouchableOpacity>
//       ) : null}
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flexDirection: "row",
//     alignItems: "center",
//     borderWidth: 1,
//     borderColor: Colors.blue,
//     borderRadius: 10,
//     paddingHorizontal: 10,
//     backgroundColor: Colors.white,
//   },
//   input: {
//     flex: 1,
//     fontSize: ResponsiveFont(15),
//     color: Colors.black,
//     textAlignVertical: "center",
//     fontFamily: Fonts.Regular
//   },
//   iconWrapper: {
//     padding: 8,
//   },
//   icon: {
//     width: wp * 5 / 100,
//     height: wp * 5 / 100,
//     resizeMode: 'contain',
//   },
// });
