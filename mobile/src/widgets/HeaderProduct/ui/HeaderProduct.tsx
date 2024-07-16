import React from 'react';
import { Layout, Text, TopNavigation, TopNavigationAction } from '@ui-kitten/components';
import { TouchableWebElement } from '@ui-kitten/components/devsupport';
import { StyleSheet } from 'react-native';

import { AddToFavoriteBtn } from '@/features/AddToFavBtn';

import { ArrowLeft } from '@/shared/libs/icons';
import { Colors } from '@/shared/libs/colors';
import { TextStyles } from '@/shared/libs/textStyles';
import { useAppNavigation } from '@/shared/libs/useAppNavigation';

export const HeaderProduct = ({ title }: { title: string }) => {
  const navigation = useAppNavigation();

  const navigateBack = () => {
    navigation.goBack();
  };

  const renderBackAction = (): TouchableWebElement => (
    <TopNavigationAction
      onPress={navigateBack}
      icon={<ArrowLeft size={30} color={Colors.Basic600} />}
    />
  );

  return (
    <Layout>
      <TopNavigation
        alignment="center"
        title={(evaProps) => (
          <Text
            {...evaProps}
            style={{
              ...TextStyles.h6,
              ...styles.title,
            }}
            numberOfLines={1}
          >
            {title}
          </Text>
        )}
        accessoryLeft={renderBackAction}
        accessoryRight={AddToFavoriteBtn}
      />
    </Layout>
  );
};

const styles = StyleSheet.create({
  title: {
    width: '70%',
    marginTop: 5,
  },
});
