import React, { useState } from 'react';
import {
  View,
  Text,
  ImageBackground,
  FlatList,
  TouchableOpacity,
  Image,
} from 'react-native';

import { AboutStyles } from './AboutStyles';
import {
  Images,
  Colors,
  WindowHeight as hp,
  WindowWidth as wp,
  Fonts,
  ResponsiveFont
} from '../../../../../assets';
import { FloatingBackgroundCard } from '../../../../../components/card';
import { useTranslation } from '../../../../../components/customhooks';
import { ListingCard } from '../../../../../components/card/ListingCard';

const AboutScreen = (props) => {
  const t = useTranslation();

  const [faqList, setFaqList] = useState([
    {
      id: '1',
      question: 'Question 1',
      answer: 'adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris',
      expanded: true,
    },
    {
      id: '2',
      question: 'Question 2',
      answer: 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
      expanded: false,
    },
    {
      id: '3',
      question: 'Question 3',
      answer: 'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
      expanded: false,
    },
  ]);

  const toggleExpand = (id) => {
    setFaqList((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, expanded: !item.expanded }
          : { ...item, expanded: false }
      )
    );
  };

  const renderItem = ({ item }) => (
    <ListingCard>
      <TouchableOpacity
        onPress={() => toggleExpand(item.id)}
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          width: '100%',
        }}
      >
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Image
            source={Images.questionMarkIcon}
            style={{
              width: wp * 6 / 100,
              height: wp * 6 / 100,
              marginRight: wp * 3 / 100,
              resizeMode: 'contain',
            }}
          />
          <Text style={AboutStyles.faqQuestion}>{item.question}</Text>
        </View>

        <Image
          source={item.expanded ? Images.minus : Images.icon_plus}
          style={{
            width: wp * 4.5 / 100,
            height: wp * 4.5 / 100,
            resizeMode: 'contain',
          }}
        />
      </TouchableOpacity>

      {item.expanded && (
        <Text style={AboutStyles.faqAnswer}>{item.answer}</Text>
      )}
    </ListingCard>
  );

  return (
    <ImageBackground
      source={Images.backgroundImage}
      style={AboutStyles.background}
      resizeMode="cover"
    >
      <View style={AboutStyles.topView}>
        <TouchableOpacity
          style={AboutStyles.tabNameContainer1}
          onPress={() => props.navigation.goBack()}
        >
          <Image
            source={Images.back_Icon}
            style={AboutStyles.backIcon}
          />
        </TouchableOpacity>
        <View style={AboutStyles.tabNameContainer}>
          <Text style={AboutStyles.tabName}>About</Text>
        </View>
      </View>

      <View style={AboutStyles.bottomView}>
        <FloatingBackgroundCard>
        <View style={AboutStyles.infoIconContainer}>
              <Image source={Images.aboutIcon} style={AboutStyles.aboutIcon}resizeMode='contain' />
            </View>

          <Text style={AboutStyles.appTitle}>
            Medicine
            <Text style={AboutStyles.appTitleDot}>.</Text>
          </Text>

          <Text style={[AboutStyles.appSubTitle]}>
            Doctor
          </Text>

          <Text style={AboutStyles.descriptionText}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </Text>

          <Text style={AboutStyles.faqTitle}>Frequently Asked Question</Text>

          <FlatList
            data={faqList}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
            showsVerticalScrollIndicator={false}
          />
        </FloatingBackgroundCard>
      </View>
    </ImageBackground>
  );
};

export default AboutScreen;
