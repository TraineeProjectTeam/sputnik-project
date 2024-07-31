import React, { useState } from 'react';
import { LayoutChangeEvent, Pressable, StyleSheet, Text, View } from 'react-native';
import { StackActions } from '@react-navigation/native';
import { Layout } from '@ui-kitten/components';

import { Screens } from '@/app/navigation/navigationEnum';

import { AddToCartBtn } from '@/features/AddToCartBtn';
import { AddToFavoriteBtn } from '@/features/AddToFavBtn';

import { PriceWithDiscount } from '@/shared/ui/PriceWithDiscount';
import { RatingAndReviews } from '@/shared/ui/RatingAndReviews';
import { useAppNavigation } from '@/shared/libs/useAppNavigation';
import { TextStyles } from '@/shared/libs/textStyles';
import { Carousel } from '@/shared/ui/Carousel/Carousel';
import { IProduct } from '@/shared/libs/types';
import { RemainingProducts } from '@/shared/ui/RemainingProducts';

export const ProductCard = ({ product }: { product: IProduct }) => {
  const navigate = useAppNavigation();
  const [width, setWidth] = useState(0);

  const navigateToProductPage = () => {
    navigate.dispatch(StackActions.push(Screens.PRODUCT, { product: product }));
  };

  const findWidth = (event: LayoutChangeEvent) => {
    setWidth(event.nativeEvent.layout.width);
  };

  return (
    <Layout style={styles.container} onLayout={findWidth}>
      <Pressable onPress={navigateToProductPage} style={styles.pressable}>
        <View style={styles.favButton}>
          <AddToFavoriteBtn productId={product._id} />
        </View>
        <Carousel
          items={product.images}
          onResponderRelease={navigateToProductPage}
          width={width}
          height={250}
        />
        <View style={styles.body}>
          <PriceWithDiscount
            price={product.price}
            discountPrice={product.discountPrice}
            size="small"
          />
          {product.remaining && <RemainingProducts remaining={product.remaining} size="small" />}
          <Text numberOfLines={2} style={TextStyles.c1}>
            {product.name}
          </Text>
          {product.rating && (
            <RatingAndReviews rating={product.rating} reviews_count={product.reviews_count} />
          )}
        </View>
        <View style={styles.button}>
          <AddToCartBtn size="tiny" />
        </View>
      </Pressable>
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '49%',
    borderRadius: 10,
    overflow: 'hidden',
    marginLeft: 2,
    marginRight: 2,
    marginTop: 5,
  },
  pressable: { display: 'flex', flex: 1 },
  favButton: { position: 'absolute', zIndex: 5, right: 3, top: 3 },
  body: { margin: 7, marginTop: 3 },
  button: {
    marginLeft: 7,
    marginRight: 7,
    padding: 0,
    marginTop: 'auto',
    marginBottom: 7,
  },
});
