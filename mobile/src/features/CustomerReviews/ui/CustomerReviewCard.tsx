import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { StackActions } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import { Divider, Layout } from '@ui-kitten/components';
import Toast from 'react-native-toast-message';

import { Screens } from '@/app/navigation/navigationEnum';

import { useReviewsStore } from '@/entities/Review';

import { useAppNavigation } from '@/shared/libs/useAppNavigation';
import { ChatBubble, DeleteIcon, EditIcon } from '@/shared/libs/icons';
import { Colors } from '@/shared/libs/colors';
import { IReview } from '@/shared/libs/types';
import { TextStyles } from '@/shared/libs/textStyles';
import { Stars } from '@/shared/ui/Stars';

interface ReviewCardProps {
  review: IReview;
}

export const CustomerReviewCard: React.FC<ReviewCardProps> = ({ review }) => {
  const navigate = useAppNavigation();
  const { t } = useTranslation();
  const { deleteReview } = useReviewsStore();

  const handleDeleteReview = () => {
    try {
      deleteReview(review._id);
      Toast.show({
        type: 'success',
        text1: t('Review.Отзыв удален'),
      });
    } catch {
      Toast.show({
        type: 'error',
        text1: t('Review.Что-то пошло не так...'),
      });
    }
  };

  const navigateToEditReview = () => {
    navigate.dispatch(
      StackActions.push(Screens.EDIT_REVIEW, {
        review: review,
      }),
    );
  };

  return (
    <Layout style={styles.container}>
      <View style={styles.header}>
        <Image
          source={{ uri: review.product_id.thumbnail }}
          width={60}
          height={70}
          style={styles.image}
        />
        <View style={styles.name}>
          <Stars rating={review.rating} />
          <Text style={TextStyles.c2} numberOfLines={2}>
            {review.product_id.name}
          </Text>
        </View>
      </View>
      <View style={styles.body}>
        <ChatBubble size={16} color={Colors.Basic600} />
        <Text style={TextStyles.c2}>{review.body}</Text>
      </View>
      <Divider style={styles.divider} />
      <View style={styles.footer}>
        <TouchableOpacity style={styles.pressable} onPress={navigateToEditReview}>
          <EditIcon size={20} color={Colors.Basic600} />
          <Text style={TextStyles.c2}>{t('Review.Редактировать')}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.pressable} onPress={handleDeleteReview}>
          <DeleteIcon size={20} color={Colors.Danger500} />
          <Text style={TextStyles.c2.changeColor(Colors.Danger500)}>{t('Review.Удалить')}</Text>
        </TouchableOpacity>
      </View>
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 15,
    marginTop: 10,
    borderRadius: 20,
  },
  header: {
    display: 'flex',
    flexDirection: 'row',
    gap: 10,
  },
  image: { borderRadius: 10 },
  name: { flex: 1 },
  body: { display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 3, marginTop: 5 },
  footer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderTopColor: '#ccc',
  },
  pressable: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
  },
  divider: { marginVertical: 10 },
});
