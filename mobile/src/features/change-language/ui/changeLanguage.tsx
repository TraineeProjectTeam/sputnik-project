import React, { useEffect } from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { Radio, RadioGroup, Text } from '@ui-kitten/components';
import { useTranslation } from 'react-i18next';

import { LanguageList } from '@/shared/config/i18n';
import { TextStyles } from '@/shared/libs/textStyles';
import { Colors } from '@/shared/libs/colors';
import { storage } from '@/shared/libs/storage';
import EnFlag from '@/shared/assets/images/en';
import RuFlag from '@/shared/assets/images/ru';

const languageList = [
  {
    language: 'English',
    languageCode: LanguageList.EN,
    image: <EnFlag />,
  },
  {
    language: 'Русский',
    languageCode: LanguageList.RU,
    image: <RuFlag />,
  },
];

export const ChangeLanguageButton = () => {
  const languageCode = storage.getString('language');
  const index = languageList.findIndex((x) => x.languageCode === languageCode);
  const [selectedIndex, setSelectedIndex] = React.useState(index);
  const { i18n } = useTranslation();

  const changeLanguageHandler = (language: LanguageList) => {
    i18n.changeLanguage(language);
    storage.set('language', language);
  };

  return (
    <RadioGroup
      selectedIndex={selectedIndex}
      onChange={(index) => {
        setSelectedIndex(index);
        changeLanguageHandler(languageList[index].languageCode);
      }}
    >
      {languageList.map((item) => (
        <Radio key={item.languageCode} style={styles.container}>
          {() => (
            <View style={styles.item}>
              {item.image}
              <Text style={{ ...TextStyles.bodyBold, ...styles.text }}>{item.language}</Text>
            </View>
          )}
        </Radio>
      ))}
    </RadioGroup>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row-reverse',
    width: '100%',
    paddingTop: 10,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: Colors.Basic500,
  },
  item: {
    marginRight: 'auto',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  text: {
    paddingTop: 4,
  },
});
