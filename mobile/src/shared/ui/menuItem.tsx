import React from 'react';
import { StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';
import { MenuItem as KittenMenuItem, Text } from '@ui-kitten/components';

import { ArrowRight } from '../libs/icons';
import { Colors } from '../libs/colors';
import { TextStyles } from '../libs/textStyles';

interface MenuItemProps {
  onPress: () => void;
  title: string;
}

export const MenuItem: React.FC<MenuItemProps> = ({ onPress, title }) => {
  const { t } = useTranslation();
  return (
    <KittenMenuItem
      onPress={onPress}
      style={styles.menuItem}
      title={(props) => (
        <Text {...props} style={TextStyles.bodyBold}>
          {t(title)}
        </Text>
      )}
      accessoryRight={<ArrowRight size={26} color={Colors.Basic600} />}
    />
  );
};

const styles = StyleSheet.create({
  menuItem: {
    paddingLeft: 15,
    paddingRight: 15,
  },
});
