import React from 'react';
import { Layout, Text, TopNavigation, TopNavigationAction } from '@ui-kitten/components';
import { TouchableWebElement } from '@ui-kitten/components/devsupport';

import { ArrowLeft } from '../libs/icons';
import { Colors } from '../libs/colors';
import { TextStyles } from '../libs/textStyles';
import { useAppNavigation } from '../libs/useAppNavigation';

export const HeaderBack = ({ title }: { title: string }) => {
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
          <Text {...evaProps} style={TextStyles.h6}>
            {title}
          </Text>
        )}
        accessoryLeft={renderBackAction}
      />
    </Layout>
  );
};
