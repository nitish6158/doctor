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