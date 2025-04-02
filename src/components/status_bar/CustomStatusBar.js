import React from 'react';
import { StatusBar, View, SafeAreaView, Platform } from 'react-native';
import { Colors } from '../../assets';

const CustomStatusBar = () => {
  return (
    <SafeAreaView style={{ backgroundColor: Colors.blue }}>
      <StatusBar
        barStyle="light-content"
        backgroundColor={Colors.blue}
        translucent={Platform.OS === 'ios' ? true : false} // Make translucent on iOS
      />
      {Platform.OS === 'ios' && <View style={{ height: 1, backgroundColor: Colors.blue }} />}
    </SafeAreaView>
  );
};

export default CustomStatusBar;


// import React from 'react';
// import { StatusBar, View, SafeAreaView } from 'react-native';
// import { Colors } from '../../assets';
// const CustomStatusBar = () => {
//   return (
//     <SafeAreaView style={Colors.blue}>
//       <StatusBar
//         barStyle="light-content"
//         backgroundColor={Colors.blue}
//         translucent={false}
//       />
//     </SafeAreaView>
//   );
// };

// export default CustomStatusBar;
