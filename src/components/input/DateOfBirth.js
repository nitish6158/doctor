import React, { useState, useMemo } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import {
  Colors,
  Fonts,
  ResponsiveFont,
  WindowHeight as hp,
  WindowWidth as wp,
  Images
} from '../../assets';
import { useTranslation } from '../customhooks';

export const DateOfBirth = ({ onDateChange }) => {
  const t = useTranslation();
  const [day, setDay] = useState('Day');
  const [month, setMonth] = useState('Month');
  const [year, setYear] = useState('Year');

  const today = new Date();
  const maxAllowedDate = new Date(today.getFullYear(), today.getMonth(), today.getDate());

  // Generate year options (past 100 years)
  const years = useMemo(() => {
    const maxYear = maxAllowedDate.getFullYear();
    return Array.from({ length: 100 }, (_, i) => String(maxYear - i));
  }, []);

  // Generate month options based on selected year
  const months = useMemo(() => {
    const selectedYear = parseInt(year);
    if (!selectedYear) return [];

    const maxMonth = selectedYear === maxAllowedDate.getFullYear()
      ? maxAllowedDate.getMonth() + 1
      : 12;

    return Array.from({ length: maxMonth }, (_, i) => String(i + 1).padStart(2, '0'));
  }, [year]);

  // Generate day options based on selected year/month
  const days = useMemo(() => {
    const selectedYear = parseInt(year);
    const selectedMonth = parseInt(month);
    if (!selectedYear || !selectedMonth) return [];

    const daysInMonth = new Date(selectedYear, selectedMonth, 0).getDate();
    let maxDay = daysInMonth;

    if (
      selectedYear === maxAllowedDate.getFullYear() &&
      selectedMonth === maxAllowedDate.getMonth() + 1
    ) {
      maxDay = maxAllowedDate.getDate();
    }

    return Array.from({ length: maxDay }, (_, i) => String(i + 1).padStart(2, '0'));
  }, [year, month]);

  const updateDate = (d, m, y) => {
    if (d !== 'Day' && m !== 'Month' && y !== 'Year') {
      onDateChange && onDateChange(`${y}-${m}-${d}`);
    }
  };

  return (
    <View style={styles.wrapper}>
      <View style={styles.header}>
        <Text style={styles.label}>{t('DateOfBirth')}</Text>
        <TouchableOpacity>
          <Image
            source={Images.editBlack}
            style={styles.editIcon}
            resizeMode='contain'
          />
        </TouchableOpacity>
      </View>

      <View style={styles.pickerRow}>

        {/* Year Picker */}
        <View style={styles.pickerBox}>
          <Picker
            selectedValue={year}
            onValueChange={(val) => {
              setYear(val);
              updateDate(day, month, val);
            }}
            style={styles.picker}
            dropdownIconColor={Colors.black}
          >
            <Picker.Item label="Year" value="Year" />
            {years.map(y => <Picker.Item key={y} label={y} value={y} />)}
          </Picker>
        </View>

        {/* Month Picker */}
        <View style={styles.pickerBox}>
          <Picker
            selectedValue={month}
            onValueChange={(val) => {
              setMonth(val);
              updateDate(day, val, year);
            }}
            style={styles.picker}
            dropdownIconColor={Colors.black}
            enabled={year !== 'Year'}
          >
            <Picker.Item label="Month" value="Month" />
            {months.map(m => <Picker.Item key={m} label={m} value={m} />)}
          </Picker>
        </View>

        {/* Day Picker */}
        <View style={styles.pickerBox}>
          <Picker
            selectedValue={day}
            onValueChange={(val) => {
              setDay(val);
              updateDate(val, month, year);
            }}
            style={styles.picker}
            dropdownIconColor={Colors.black}
            enabled={month !== 'Month' && year !== 'Year'}
          >
            <Picker.Item label="Day" value="Day" />
            {days.map(d => <Picker.Item key={d} label={d} value={d} />)}
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


// import React, { useState, useMemo } from 'react';
// import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
// import { Picker } from '@react-native-picker/picker';
// import { Colors, Fonts, ResponsiveFont, WindowHeight as hp, WindowWidth as wp } from '../../assets';
// import { Images } from '../../assets';
// import { useTranslation } from '../customhooks';

// export const DateOfBirth = ({ onDateChange }) => {
//     const t = useTranslation();
//     const [day, setDay] = useState('Day');
//     const [month, setMonth] = useState('Month');
//     const [year, setYear] = useState('Year');

//     const today = new Date();
//     const maxAllowedDate = new Date(today.getFullYear() - 17, today.getMonth(), today.getDate());

//     // Generate years from max year down to max age 100
//     const years = useMemo(() => {
//         const maxYear = maxAllowedDate.getFullYear();
//         return Array.from({ length: 100 }, (_, i) => String(maxYear - i));
//     }, []);

//     // Generate months dynamically based on selected year
//     const months = useMemo(() => {
//         const selectedYear = parseInt(year);
//         const maxMonth = (selectedYear === maxAllowedDate.getFullYear()) ? maxAllowedDate.getMonth() + 1 : 12;
//         return Array.from({ length: maxMonth }, (_, i) => String(i + 1).padStart(2, '0'));
//     }, [year]);

//     // Generate valid number of days for selected month/year, and limit if same as max date
//     const days = useMemo(() => {
//         const selectedYear = parseInt(year);
//         const selectedMonth = parseInt(month);
//         if (!selectedYear || !selectedMonth) return [];

//         const daysInMonth = new Date(selectedYear, selectedMonth, 0).getDate();
//         let validDays = daysInMonth;

//         if (
//             selectedYear === maxAllowedDate.getFullYear() &&
//             selectedMonth === maxAllowedDate.getMonth() + 1
//         ) {
//             validDays = maxAllowedDate.getDate(); // limit to current day
//         }

//         return Array.from({ length: validDays }, (_, i) => String(i + 1).padStart(2, '0'));
//     }, [month, year]);

//     const updateDate = (d, m, y) => {
//         if (d !== 'Day' && m !== 'Month' && y !== 'Year') {
//             onDateChange && onDateChange(`${y}-${m}-${d}`);
//         }
//     };

//     return (
//         <View style={styles.wrapper}>
//             <View style={styles.header}>
//                 <Text style={styles.label}>{t('DateOfBirth')}</Text>
//                 <TouchableOpacity>
//                     <Image
//                         source={Images.editBlack}
//                         style={styles.editIcon}
//                         resizeMode='contain'
//                     />
//                 </TouchableOpacity>
//             </View>

//             <View style={styles.pickerRow}>



//                 {/* Year Picker */}
//                 <View style={styles.pickerBox}>
//                     <Picker
//                         selectedValue={year}
//                         onValueChange={(val) => {
//                             setYear(val);
//                             updateDate(day, month, val);
//                         }}
//                         style={styles.picker}
//                         dropdownIconColor={Colors.black}
//                     >
//                         <Picker.Item label="Year" value="Year" />
//                         {years.map(y => <Picker.Item key={y} label={y} value={y} />)}
//                     </Picker>
//                 </View>

//                 {/* Month Picker */}
//                 <View style={styles.pickerBox}>
//                     <Picker
//                         selectedValue={month}
//                         onValueChange={(val) => {
//                             setMonth(val);
//                             updateDate(day, val, year);
//                         }}
//                         style={styles.picker}
//                         dropdownIconColor={Colors.black}
//                         enabled={year !== 'Year'}
//                     >
//                         <Picker.Item label="Month" value="Month" />
//                         {months.map(m => <Picker.Item key={m} label={m} value={m} />)}
//                     </Picker>
//                 </View>
//                 {/* Day Picker */}
//                 <View style={styles.pickerBox}>
//                     <Picker
//                         selectedValue={day}
//                         onValueChange={(val) => {
//                             setDay(val);
//                             updateDate(val, month, year);
//                         }}
//                         style={styles.picker}
//                         dropdownIconColor={Colors.black}
//                         enabled={month !== 'Month' && year !== 'Year'}
//                     >
//                         <Picker.Item label="Day" value="Day" />
//                         {days.map(d => <Picker.Item key={d} label={d} value={d} />)}
//                     </Picker>
//                 </View>
//             </View>
//         </View>
//     );
// };

// const styles = StyleSheet.create({
//     wrapper: {
//         width: '100%',
//     },
//     header: {
//         flexDirection: 'row',
//         justifyContent: 'space-between',
//         marginBottom: hp * 0.5 / 100,
//     },
//     label: {
//         fontFamily: Fonts.Bold,
//         fontSize: ResponsiveFont(13),
//         color: Colors.black,
//     },
//     pickerRow: {
//         flexDirection: 'row',
//         justifyContent: 'space-between',
//     },
//     pickerBox: {
//         width: '30%',
//         borderWidth: 1,
//         borderColor: Colors.borderColor2,
//         borderRadius: wp * 2 / 100,
//         backgroundColor: Colors.white,
//         justifyContent: 'center',
//     },
//     picker: {
//         height: wp * 14 / 100,
//         width: '100%',
//         color: Colors.black,
//     },
//     editIcon: {
//         width: wp * 5 / 100,
//         height: wp * 5 / 100
//     },
// });

