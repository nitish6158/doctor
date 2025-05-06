import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { Colors, Fonts, ResponsiveFont, WindowHeight as hp, WindowWidth as wp } from '../../assets';
import { Images } from '../../assets';

export const DateOfBirth = ({ onDateChange }) => {
    const [day, setDay] = useState('Day');
    const [month, setMonth] = useState('Month');
    const [year, setYear] = useState('Year');

    const days = Array.from({ length: 31 }, (_, i) => String(i + 1).padStart(2, '0'));
    const months = Array.from({ length: 12 }, (_, i) => String(i + 1).padStart(2, '0'));
    const years = Array.from({ length: 100 }, (_, i) => String(new Date().getFullYear() - i));

    const isFutureDate = (d, m, y) => {
        if (d === 'Day' || m === 'Month' || y === 'Year') return false;
        const selected = new Date(`${y}-${m}-${d}T00:00:00`);
        const today = new Date();
        return selected > today;
    };

    const handleChange = (d, m, y) => {
        if (isFutureDate(d, m, y)) {
            Alert.alert("Invalid Date", "You cannot select a future date.");
            return false;
        }
        setDay(d);
        setMonth(m);
        setYear(y);
        onDateChange && onDateChange(`${y}-${m}-${d}`);
        return true;
    };

    return (
        <View style={styles.wrapper}>
            <View style={styles.header}>
                <Text style={styles.label}>Date of Birth</Text>
                <TouchableOpacity>
                    <Image
                        source={Images.editBlack}
                        style={styles.editIcon}
                        resizeMode='contain'
                    />
                </TouchableOpacity>
            </View>

            <View style={styles.pickerRow}>
                {/* Day Picker */}
                <View style={styles.pickerBox}>
                    <Picker
                        selectedValue={day}
                        onValueChange={(val) => {
                            if (val === 'Day') return;
                            if (handleChange(val, month, year)) {
                                setDay(val);
                            }
                        }}
                        style={styles.picker}
                        dropdownIconColor={Colors.black}
                    >
                        <Picker.Item label="Day" value="Day" />
                        {days.map(d => <Picker.Item key={d} label={d} value={d} />)}
                    </Picker>
                </View>

                {/* Month Picker */}
                <View style={styles.pickerBox}>
                    <Picker
                        selectedValue={month}
                        onValueChange={(val) => {
                            if (val === 'Month') return;
                            if (handleChange(day, val, year)) {
                                setMonth(val);
                            }
                        }}
                        style={styles.picker}
                        dropdownIconColor={Colors.black}
                    >
                        <Picker.Item label="Month" value="Month" />
                        {months.map(m => <Picker.Item key={m} label={m} value={m} />)}
                    </Picker>
                </View>

                {/* Year Picker */}
                <View style={styles.pickerBox}>
                    <Picker
                        selectedValue={year}
                        onValueChange={(val) => {
                            if (val === 'Year') return;
                            if (handleChange(day, month, val)) {
                                setYear(val);
                            }
                        }}
                        style={styles.picker}
                        dropdownIconColor={Colors.black}
                    >
                        <Picker.Item label="Year" value="Year" />
                        {years.map(y => <Picker.Item key={y} label={y} value={y} />)}
                    </Picker>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    wrapper: {
        width: '100%',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: hp * 0.5 / 100,
    },
    label: {
        fontFamily: Fonts.Bold,
        fontSize: ResponsiveFont(13),
        color: Colors.black,
    },
    pickerRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    pickerBox: {
        width: '30%',
        borderWidth: 1,
        borderColor: Colors.borderColor2,
        borderRadius: wp * 2 / 100,
        backgroundColor: Colors.white,
        justifyContent: 'center',
    },
    picker: {
        height: wp * 14 / 100,
        width: '100%',
        color: Colors.black,
    },
    editIcon: {
        width: wp * 5 / 100,
        height: wp * 5 / 100
    },
});



// import React, { useState } from 'react';
// import { View, StyleSheet, Text, Platform } from 'react-native';
// import { Picker } from '@react-native-picker/picker'; // install this package if not already
// import { Colors, Fonts, ResponsiveFont, WindowHeight as hp, WindowWidth as wp } from '../../assets';
// import { Images } from '../../assets/Images';
// import Icon from 'react-native-vector-icons/Feather';

// export const DateOfBirth = ({
//   placeholder,
//   value,
//   onChangeText,
//   width = '95%',
// }) => {
//   const [day, setDay] = useState('Day');
//   const [month, setMonth] = useState('Month');
//   const [year, setYear] = useState('Year');

//   const days = Array.from({ length: 31 }, (_, i) => String(i + 1).padStart(2, '0'));
//   const months = Array.from({ length: 12 }, (_, i) => String(i + 1).padStart(2, '0'));
//   const years = Array.from({ length: 100 }, (_, i) => String(2025 - i));

//   return (
//     <View style={{ marginVertical: '2%' }}>
//       <Text style={styles.heading}>Date of Birth</Text>
//       <View style={[styles.container, { width }]}>
//         <Picker
//           selectedValue={day}
//           onValueChange={(itemValue) => setDay(itemValue)}
//           style={styles.picker}
//           itemStyle={styles.pickerItem}
//           dropdownIconColor={Colors.black}
//         >
//           {days.map(d => <Picker.Item key={d} label={d} value={d} />)}
//         </Picker>

//         <Picker
//           selectedValue={month}
//           onValueChange={(itemValue) => setMonth(itemValue)}
//           style={styles.picker}
//           itemStyle={styles.pickerItem}
//           dropdownIconColor={Colors.black}
//         >
//           {months.map(m => <Picker.Item key={m} label={m} value={m} />)}
//         </Picker>

//         <Picker
//           selectedValue={year}
//           onValueChange={(itemValue) => setYear(itemValue)}
//           style={styles.picker}
//           itemStyle={styles.pickerItem}
//           dropdownIconColor={Colors.black}
//         >
//           {years.map(y => <Picker.Item key={y} label={y} value={y} />)}
//         </Picker>
//       </View>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     borderWidth: 1,
//     borderColor: Colors.border || '#ccc',
//     borderRadius: wp * 2 / 100,
//     paddingHorizontal: wp * 2.5 / 100,
//     paddingVertical: Platform.OS === 'ios' ? wp * 2 / 100 : 0,
//     justifyContent: 'space-between',
//   },
//   picker: {
//     flex: 1,
//     color: Colors.black,
//     fontFamily: Fonts.Regular,
//   },
//   pickerItem: {
//     fontSize: ResponsiveFont(14),
//     height: 44,
//   },
//   heading: {
//     fontFamily: Fonts.Bold,
//     fontSize: ResponsiveFont(13),
//     color: Colors.black,
//     marginBottom: hp * 0.5 / 100,
//   },
//   editIcon: {
//     marginLeft: wp * 2 / 100,
//   },
// });


// // import React, { useState } from 'react';
// // import { View, TextInput, StyleSheet, Image, Text, TouchableOpacity } from 'react-native';
// // import { Colors, Fonts, ResponsiveFont, WindowHeight as hp, WindowWidth as wp } from '../../assets';
// // import { Images } from '../../assets/Images';

// // export const DateOfBirth = ({
// //     placeholder,
// //     value,
// //     onChangeText,
// //     width = '95%',
// //     // height = hp * 0.07,
// // }) => {
// //     const [isFocused, setIsFocused] = useState(false);

// //     return (
// //         <View style={{ marginVertical: '2%' }}>
// //             <View style={styles.container}
// //             >
// //                 <Image source={Images.icon_eye_close} style={styles.icon} />

// //             </View>
// //         </View>
// //     );
// // };

// // const styles = StyleSheet.create({
// //     container: {
// //         flexDirection: 'row',
// //         alignItems: 'center',
// //         borderWidth:1,
// //         paddingHorizontal: wp * 2.5 / 100,
// //         marginVertical: hp * 0.5 / 100,
// //         padding:wp*3.5/100
// //     },
// //     icon: {
// //         width: (wp * 4.6) / 100,
// //         height: (wp * 4.6) / 100,
// //         marginRight: wp * 2.5 / 100,
// //         resizeMode: 'contain',
// //     },
// //     input: {
// //         flex: 1,
// //         fontSize: ResponsiveFont(14),
// //         fontFamily: Fonts.Regular,
// //         color: Colors.black,
// //     },
// //     heading: {
// //         fontFamily: Fonts.Bold,
// //         fontSize: ResponsiveFont(13),
// //         lineHeight: ResponsiveFont(17.5),
// //         color: Colors.black
// //     },
// //     heading2: {
// //         fontFamily: Fonts.Bold,
// //         fontSize: ResponsiveFont(20),
// //         lineHeight: ResponsiveFont(17.5),
// //         color: Colors.red2
// //     },
// //     eyeIcon: {
// //         width: (wp * 4.6) / 100,
// //         height: (wp * 4.6) / 100,
// //         resizeMode: 'contain',
// //     },
// //     subBoldText: {
// //         fontFamily: Fonts.Bold,
// //         fontSize: ResponsiveFont(14),
// //         // lineHeight: ResponsiveFont(20),
// //         color: Colors.font_blue
// //     },
// //     forgotText: {
// //         alignItems: 'flex-end',
// //         // paddingVertical: (wp * 1) / 100,
// //     },
// //     editIcon: {
// //         width: wp * 5 / 100,
// //         height: wp * 5 / 100
// //     }
// // });


