import React, { useState } from 'react';
import { Dimensions, ScrollView, StyleSheet, View } from 'react-native';
import { StackActions } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import { Button, Layout } from '@ui-kitten/components';

import { Screens } from '@/app/navigation/navigationEnum';

import { AddToCartBtn } from '@/features/AddToCartBtn';

import { PriceWithDiscount } from '@/shared/ui/PriceWithDiscount';
import { ReviewButton } from '@/shared/ui/ReviewsButton';
import { Carousel } from '@/shared/ui/Carousel/Carousel';
import { RemainingProducts } from '@/shared/ui/RemainingProducts';
import { Description } from '@/shared/ui/Description';
import { Characteristics } from '@/shared/ui/Characteristics';
import { IProduct } from '@/shared/libs/types';
import { useAppNavigation } from '@/shared/libs/useAppNavigation';

interface ProductDetailed {
  product: IProduct;
}

const { width } = Dimensions.get('screen');

export const ProductDetailed: React.FC<ProductDetailed> = ({ product }) => {
  const { t } = useTranslation();

  const [selectedButton, setSelectedButton] = useState<'description' | 'characteristics'>(
    'description',
  );

  const handleCharacterButton = () => {
    setSelectedButton('characteristics');
  };

  const handleDescriptionButton = () => {
    setSelectedButton('description');
  };

  const navigation = useAppNavigation();

  const navigateToReviews = () => {
    navigation.dispatch(
      StackActions.push(Screens.PRODUCT_REVIEWS, {
        reviews: product.reviews,
        rating: product.rating,
        reviews_count: product.reviews_count,
      }),
    );
  };

  return (
    <Layout level="2" style={styles.layout}>
      <ScrollView>
        <Layout style={styles.imgContainer}>
          <Carousel items={product.images} width={width} height={500} />
          <View style={styles.price}>
            <PriceWithDiscount price={product.price} discountPrice={product.discountPrice} />
            {product.remaining && <RemainingProducts remaining={product.remaining} />}
          </View>
        </Layout>
        <ReviewButton
          rating={product.rating}
          reviews_count={product.reviews_count}
          onPress={navigateToReviews}
        />
        <Layout style={styles.description}>
          <View style={styles.btns}>
            {product.description && (
              <Button
                appearance={selectedButton === 'description' ? 'filled' : 'outline'}
                size="small"
                onPress={handleDescriptionButton}
              >
                {t('Product.Описание')}
              </Button>
            )}
            {product.characteristic.length > 0 && (
              <Button
                appearance={selectedButton === 'characteristics' ? 'filled' : 'outline'}
                size="small"
                style={styles.charBtn}
                onPress={handleCharacterButton}
              >
                {t('Product.Характеристики')}
              </Button>
            )}
          </View>
          {selectedButton === 'description' && <Description description={product.description} />}
          {selectedButton === 'characteristics' && (
            <Characteristics characteristics={product.characteristic} />
          )}
        </Layout>
      </ScrollView>
      <Layout style={styles.buttonLayout}>
        <AddToCartBtn productId={product._id} remaining={product.remaining} />
      </Layout>
    </Layout>
  );
};

const styles = StyleSheet.create({
  layout: { flex: 1 },
  imgContainer: { paddingBottom: 15, borderRadius: 20, marginBottom: 10 },
  price: { marginHorizontal: 15, marginTop: 10 },
  description: { padding: 15, marginTop: 15, borderRadius: 20, marginBottom: 10 },
  btns: { display: 'flex', flexDirection: 'row' },
  charBtn: { marginLeft: 10 },
  buttonLayout: {
    paddingVertical: 5,
    paddingHorizontal: 15,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
});
