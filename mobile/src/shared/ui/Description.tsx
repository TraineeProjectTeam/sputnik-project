import React, { useState } from 'react';
import { LayoutChangeEvent, Pressable, StyleSheet, Text, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import Icon from 'react-native-vector-icons/MaterialIcons';

import { Colors } from '../libs/colors';
import { TextStyles } from '../libs/textStyles';

interface DescriptionProps {
  description: string;
}

export const Description: React.FC<DescriptionProps> = ({ description }) => {
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
    <View>
      <Text
        onLayout={findHeight}
        style={{ ...TextStyles.s1, maxHeight: isShowMore ? '100%' : 100 }}
      >
        {description}
      </Text>
      {height > 99 && (
        <Pressable style={styles.pressable} onPress={toggleShowMore}>
          <Text style={TextStyles.p1.changeColor(Colors.Primary500)}>
            {isShowMore ? t('Product.Скрыть') : t('Product.Показать полностью')}
          </Text>
          <Icon
            name={isShowMore ? 'keyboard-arrow-down' : 'keyboard-arrow-up'}
            color={Colors.Primary500}
            size={22}
          />
        </Pressable>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  pressable: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'black',
    shadowOffset: {
      width: 100,
      height: 100,
    },
    shadowOpacity: 0,
    shadowRadius: 0,
  },
});
