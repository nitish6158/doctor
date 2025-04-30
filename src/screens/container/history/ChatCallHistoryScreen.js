import React, { useState } from 'react';
import {
    View,
    Text,
    ImageBackground,
    FlatList,
    TouchableOpacity,
    Image,
} from "react-native";
import {
    Images,
    Colors,
    Fonts,
    ResponsiveFont,
    WindowWidth
} from '../../../assets';
import { FloatingBackgroundCard, ListingCard } from '../../../components/card';
import { ChatCallStyles } from './ChatCallStyles';

const ChatCallHistoryScreen = (props) => {
    const [activeTab, setActiveTab] = useState('Chat');

    const chatData = [
        {
             id: '1', 
             name: 'Dr. Eileen Sideways',
              date: 'Jan 12 2025, 1:30 PM', 
              image: Images.doctorImage },
        { 
            id: '2', 
            name: 'Dr. Shyam Patidar', 
            date: 'Jan 12 2025, 1:30 PM', 
            image: Images.doctor2 },
        {
             id: '3', 
             name: 'Dr. Ray Sin',
              date: 'Jan 12 2025, 1:30 PM', 
              image: Images.doctor3 },
        { 
            id: '4', 
            name: 'Dr. Eileena', 
            date: 'Jan 12 2025, 1:30 PM', 
            image: Images.doctorImage 
        },
        {
             id: '5', 
             name: 'Dr. Sagar Singh',
              date: 'Jan 12 2025, 1:30 PM',
               image: Images.doctor3 
            },
    ];

    const callData = [
        { 
            id: '1', 
            name: 'Dr. Eileen Sideways',
             duration: '10 Min', 
             date: '12 Mar, 1:30 PM', 
             image: Images.doctor3 
            },
        { 
            id: '2', 
            name: 'Dr. Eileen Sideways', 
            duration: '10 Min', 
            date: '12 Mar, 1:30 PM', 
            image: Images.doctorImage },
        { 
            id: '3', 
            name: 'Dr. Eileen Sideways', 
            duration: '10 Min', 
            date: '12 Mar, 1:30 PM',
             image: Images.doctorImage },
        { 
            id: '4', 
            name: 'Dr. Eileen Sideways',
             duration: '10 Min', 
             date: '12 Mar, 1:30 PM', 
             image: Images.doctor3
             },
    ];

    const renderChatItem = ({ item }) => (
        <ListingCard>
            <View style={ChatCallStyles.listItem}>
                <Image source={item.image} style={ChatCallStyles.profileImage} />
                <View style={ChatCallStyles.textContainer}>
                    <Text style={ChatCallStyles.nameText}>{item.name}</Text>
                    <Text style={ChatCallStyles.subText}>{item.date}</Text>
                </View>
                <TouchableOpacity style={ChatCallStyles.iconWrapper}>
                    <Image source={Images.videoCall_Icon} style={ChatCallStyles.icon} />
                </TouchableOpacity>
            </View>
        </ListingCard>
    );

    const renderCallItem = ({ item }) => (
        <ListingCard>
            <View style={ChatCallStyles.listItem}>
                <Image source={item.image} style={ChatCallStyles.profileImage} />
                <View style={ChatCallStyles.textContainer}>
                    <Text style={ChatCallStyles.nameText}>{item.name}</Text>
                    <Text style={ChatCallStyles.subText}>{`${item.duration} | ${item.date}`}</Text>
                </View>
                <TouchableOpacity style={ChatCallStyles.iconWrapper}>
                    <Image source={Images.call_Icon} style={ChatCallStyles.icon} />
                </TouchableOpacity>
            </View>
        </ListingCard>
    );

    return (
        <ImageBackground
            source={Images.backgroundImage}
            style={ChatCallStyles.background}
            resizeMode="cover"
        >
            <View style={ChatCallStyles.topView}>
                <TouchableOpacity
                    style={ChatCallStyles.tabNameContainer1}
                    onPress={() => props.navigation.goBack()}
                >
                    <Image source={Images.back_Icon} style={ChatCallStyles.backIcon} />
                </TouchableOpacity>
                <View style={ChatCallStyles.tabNameContainer}>
                    <Text style={ChatCallStyles.tabName}>My History</Text>
                </View>
            </View>

            <View style={ChatCallStyles.bottomView}>
                <FloatingBackgroundCard>
                <View style={ChatCallStyles.tabRow}>
    <TouchableOpacity
        style={[ChatCallStyles.tabButton, activeTab === 'Chat' && ChatCallStyles.activeTab]}
        onPress={() => setActiveTab('Chat')}
    >
        <Text style={[
            ChatCallStyles.tabText,
            activeTab === 'Chat' && ChatCallStyles.activeTabText
        ]}>
            Chat
        </Text>
    </TouchableOpacity>
    <TouchableOpacity
        style={[ChatCallStyles.tabButton, activeTab === 'Call' && ChatCallStyles.activeTab]}
        onPress={() => setActiveTab('Call')}
    >
        <Text style={[
            ChatCallStyles.tabText,
            activeTab === 'Call' && ChatCallStyles.activeTabText
        ]}>
            Call
        </Text>
    </TouchableOpacity>
</View>
                    <FlatList
                        data={activeTab === 'Chat' ? chatData : callData}
                        renderItem={activeTab === 'Chat' ? renderChatItem : renderCallItem}
                        keyExtractor={(item) => item.id}
                        contentContainerStyle={{alignItems:'center'}}
                    />
                </FloatingBackgroundCard>
            </View>
        </ImageBackground>
    );
};

export default ChatCallHistoryScreen;


// import React from 'react';
// import {
//     View,
//     Text,
//     ImageBackground,
//     FlatList,
//     TouchableOpacity,
//     Image,
// } from "react-native";
// import {
//     Images,
//     Colors,
//     Fonts,
//     ResponsiveFont
// } from '../../../assets';
// import { FloatingBackgroundCard } from '../../../components/card';
// import { ChatCallStyles } from './ChatCallStyles';

// const ChatCallHistoryScreen = (props) => {
//     return (
//         <ImageBackground
//             source={Images.backgroundImage}
//             style={ChatCallStyles.background}
//             resizeMode="cover"
//         >
//             <View style={ChatCallStyles.topView}>
//                 <TouchableOpacity
//                     style={ChatCallStyles.tabNameContainer1}
//                     onPress={() => props.navigation.goBack()}
//                 >
//                     <Image source={Images.back_Icon} style={ChatCallStyles.backIcon} />
//                 </TouchableOpacity>
//                 <View style={ChatCallStyles.tabNameContainer}>
//                     <Text style={ChatCallStyles.tabName}>My History</Text>
//                 </View>
//             </View>

//             <View style={ChatCallStyles.bottomView}>
//                 <FloatingBackgroundCard>
                  
//                 </FloatingBackgroundCard>
//             </View>
//         </ImageBackground>
//     );
// };

// export default ChatCallHistoryScreen;
