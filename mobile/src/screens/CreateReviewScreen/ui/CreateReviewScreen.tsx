import React from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

import { AccountStackParams } from '@/app/navigation/navigationTypes';
import { CreateReviewForm } from '@/features/CreateReviewForm';

type Props = NativeStackScreenProps<AccountStackParams, 'CreateReview'>;

export const CreateReviewScreen: React.FC<Props> = ({ route }) => {
  const { product } = route.params;

  return <CreateReviewForm product={product} />;
};
