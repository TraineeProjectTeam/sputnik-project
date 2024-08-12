import React from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

import { AccountStackParams } from '@/app/navigation/navigationTypes';
import { OrderDetailed } from '@/features/OrderDetailed';

type Props = NativeStackScreenProps<AccountStackParams, 'Order'>;

export const OrderDetaildedScreen: React.FC<Props> = ({ route }) => {
  const { order } = route.params;

  return <OrderDetailed order={order} />;
};
