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
            style={AboutStyles.questionMarkIcon}
          />
          <Text style={AboutStyles.faqQuestion}>{item.question}</Text>
        </View>

        <Image
          source={item.expanded ? Images.minus : Images.icon_plus}
          style={AboutStyles.plusminusIconStyle}
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
          <Text style={AboutStyles.tabName}>{t('About')}</Text>
        </View>
      </View>

      <View style={AboutStyles.bottomView}>
        <FloatingBackgroundCard>
          {faqList ?
            <>
              <View style={AboutStyles.infoIconContainer}>
                <Image source={Images.aboutIcon} style={AboutStyles.aboutIcon} resizeMode='contain' />
              </View>
              <View>
                <Text style={AboutStyles.appTitle}>
                  {t('Medicine')}
                  <Text style={AboutStyles.appTitleDot}>.</Text>
                </Text>
                <Text style={[AboutStyles.appSubTitle]}>
                  {t('Doctor')}
                </Text>
              </View>

              <View style={AboutStyles.aboutContainer}>
                <Text style={AboutStyles.faqQuestion}>About Medicine App</Text>
                <Text style={AboutStyles.descriptionText}>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </Text>
              </View>
              <Text style={AboutStyles.faqTitle}>{t('FrequentlyAskedQuestion')}</Text>
              <FlatList
                data={faqList}
                renderItem={renderItem}
                keyExtractor={(item) => item.id}
                showsVerticalScrollIndicator={false}
              />
            </>
            :
            <View style={AboutStyles.NoDataFoundContainer}>
              <Image
                source={Images.nodatafound}
                style={AboutStyles.NoDataFound}
              />
            </View>
          }
        </FloatingBackgroundCard>
      </View>
    </ImageBackground>
  );
};

export default AboutScreen;
