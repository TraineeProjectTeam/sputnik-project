import React, { useState } from 'react';
import { Image, ScrollView, StyleSheet, Text } from 'react-native';
import { useTranslation } from 'react-i18next';
import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Button, Layout } from '@ui-kitten/components';
import Toast from 'react-native-toast-message';

import { useReviewsStore } from '@/entities/Review';
import { useUserStore } from '@/entities/user';

import { RatingButton } from '@/shared/ui/Rating';
import { Input } from '@/shared/ui/input';
import { TextStyles } from '@/shared/libs/textStyles';
import { IProduct } from '@/shared/libs/types';
import { useAppNavigation } from '@/shared/libs/useAppNavigation';

import { schema } from '../model/validation';

interface CreateReviewFormProps {
  product: IProduct;
}

export const CreateReviewForm: React.FC<CreateReviewFormProps> = ({ product }) => {
  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    resolver: yupResolver(schema),
    mode: 'onBlur',
  });

  const navigate = useAppNavigation();
  const { t } = useTranslation();
  const { user } = useUserStore();
  const { createReview } = useReviewsStore();
  const [starRating, setStarRating] = useState(1);

  const onPressSend: SubmitHandler<{ body: string }> = async ({ body }) => {
    try {
      const formData = {
        customer_fullname: `${user.last_name} ${user.first_name}`,
        customer_id: user._id,
        product_id: product._id,
        rating: starRating,
        body,
      };
      createReview(formData);
      Toast.show({
        type: 'success',
        text1: t('Review.Отзыв создан'),
      });
      navigate.goBack();
    } catch {
      Toast.show({
        type: 'error',
        text1: t('Review.Что-то пошло не так...'),
      });
    }
  };

  return (
    <Layout level="2" style={styles.container}>
      <ScrollView>
        <Layout style={styles.productInfo}>
          <Image source={{ uri: product.thumbnail }} width={60} height={70} style={styles.image} />
          <Text style={TextStyles.c2} numberOfLines={4}>
            {product.name}
          </Text>
        </Layout>
        <Layout style={styles.form}>
          <RatingButton value={starRating} changeValue={setStarRating} />
          <Input
            control={control}
            name="body"
            label={t('Review.Комментарий')}
            error={errors.body}
            multiline
          />
        </Layout>
      </ScrollView>
      <Layout style={styles.button}>
        <Button onPress={handleSubmit(onPressSend)} disabled={!isValid}>
          <Text style={TextStyles.button}>{t('Review.Отправить отзыв')}</Text>
        </Button>
      </Layout>
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  productInfo: {
    display: 'flex',
    flexDirection: 'row',
    gap: 10,
    padding: 15,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  image: {
    borderRadius: 10,
  },
  form: {
    marginTop: 10,
    padding: 15,
    borderRadius: 20,
  },
  button: {
    padding: 15,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
});
