import React from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

import { AccountStackParams } from '@/app/navigation/navigationTypes';
import { UpdateReviewForm } from '@/features/UpdateReviewForm';

type Props = NativeStackScreenProps<AccountStackParams, 'EditReview'>;

export const UpdateReviewScreen: React.FC<Props> = ({ route }) => {
  const { review } = route.params;

  return <UpdateReviewForm review={review} />;
};
