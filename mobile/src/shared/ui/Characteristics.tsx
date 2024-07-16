import React, { useState } from 'react';
import { LayoutChangeEvent, Pressable, StyleSheet, Text, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import Icon from 'react-native-vector-icons/MaterialIcons';

import { TextStyles } from '../libs/textStyles';
import { Colors } from '../libs/colors';

interface CharacteristicsProps {
  characteristics: string[];
}

export const Characteristics: React.FC<CharacteristicsProps> = ({ characteristics }) => {
  const [height, setHeight] = useState(0);
  const [isShowMore, setIsShowMore] = useState(false);

  const { t } = useTranslation();

  const toggleShowMore = () => {
    setIsShowMore(!isShowMore);
  };

  const findHeight = (event: LayoutChangeEvent) => {
    setHeight(event.nativeEvent.layout.height);
  };

  return (
    <View style={styles.container}>
      <Text style={{ ...TextStyles.h5, ...styles.header }}>{t('Product.Основные')}</Text>
      <View onLayout={findHeight} style={{ maxHeight: isShowMore ? '100%' : 100, ...styles.body }}>
        {characteristics.map((item, i) => (
          <View key={i} style={styles.characteristics}>
            <Text style={{ ...TextStyles.s2.changeColor(Colors.Basic600), ...styles.title }}>
              {item[0]}
            </Text>
            <Text style={{ ...TextStyles.s2, ...styles.text }}>{item[1]}</Text>
          </View>
        ))}
      </View>
      {height > 100 && (
        <Pressable style={styles.pressable} onPress={toggleShowMore}>
          <Text style={TextStyles.p1.changeColor(Colors.Primary500)}>
            {isShowMore ? t('Product.Скрыть') : t('Product.Показать полностью')}
          </Text>
          <Icon
            name={isShowMore ? 'keyboard-arrow-up' : 'keyboard-arrow-down'}
            color={Colors.Primary500}
            size={22}
          />
        </Pressable>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: { marginTop: 10 },
  body: { overflow: 'hidden' },
  characteristics: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBlockColor: '#ccc',
    borderBottomWidth: 1,
    paddingTop: 10,
    paddingBottom: 10,
  },
  title: {
    width: '50%',
  },
  text: {
    marginRight: 'auto',
  },
  pressable: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
});
