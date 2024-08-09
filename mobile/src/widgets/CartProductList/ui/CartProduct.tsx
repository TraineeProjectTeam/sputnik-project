import React, { memo, useCallback, useEffect, useRef, useState } from 'react';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useFocusEffect } from '@react-navigation/native';
import { Layout } from '@ui-kitten/components';
import { shallow } from 'zustand/shallow';

import { AddToFavoriteBtn } from '@/features/AddToFavBtn';

import { useCartStore } from '@/entities/Cart';

import { useDebounce } from '@/shared/hooks/useDebouce';
import { Colors } from '@/shared/libs/colors';
import { AddIcon, DeleteIcon, RemoveIcon } from '@/shared/libs/icons';
import { TextStyles } from '@/shared/libs/textStyles';
import { IProduct } from '@/shared/libs/types';
import { PriceWithDiscount } from '@/shared/ui/PriceWithDiscount';

interface CartProduct {
  product: IProduct;
}

export const CartProduct: React.FC<CartProduct> = memo(
  ({ product }) => {
    const [deleteFavorite, updateQuantity, isInCart, getProduct] = useCartStore(
      (state) => [state.deleteFavorite, state.updateQuantity, state.isInCart, state.getProduct],
      shallow,
    );

    const quantity = () => {
      if (isInCart(product._id)) {
        return getProduct(product._id).quantity;
      }
      return 0;
    };

    const [productQuantity, setProductQuantity] = useState(quantity);
    const debouncedValue = useDebounce(productQuantity, 500);
    const pageHasBeenRendered = useRef(false);
    const { t } = useTranslation();

    useEffect(() => {
      if (pageHasBeenRendered.current) {
        updateQuantity(product._id, debouncedValue);
      }
      pageHasBeenRendered.current = true;
    }, [debouncedValue]);

    useFocusEffect(
      useCallback(() => {
        if (pageHasBeenRendered.current) {
          setProductQuantity(quantity);
        }
      }, []),
    );

    const deleteProduct = () => {
      deleteFavorite(product._id);
    };

    const plusQuantity = () => {
      setProductQuantity((prev) => prev + 1);
    };

    const minusQuantity = () => {
      setProductQuantity((prev) => prev - 1);
    };

    const quantityEqualRemaining = productQuantity === product.remaining;
    const quantityEqualOne = productQuantity === 1;

    return (
      <Layout style={styles.container}>
        <View style={styles.header}>
          <Image source={{ uri: product.thumbnail }} width={80} height={90} style={styles.image} />
          <View style={styles.name}>
            <PriceWithDiscount
              price={product.price * productQuantity}
              discountPrice={product.discountPrice * productQuantity}
              size="small"
            />
            <Text style={TextStyles.c2}>{product.name}</Text>
            {productQuantity > 1 && (
              <Text style={TextStyles.c2.changeColor(Colors.Basic600)}>
                {product.discountPrice} ₽ / {t('Product.шт')}
              </Text>
            )}
          </View>
        </View>
        <View style={styles.buttonsContainer}>
          <View style={styles.buttonRow}>
            <Pressable style={styles.deleteButton} onPress={deleteProduct}>
              <DeleteIcon size={20} color={Colors.Basic800} />
            </Pressable>
            <AddToFavoriteBtn productId={product._id} />
          </View>
          <View style={styles.buttonRow}>
            <Pressable
              disabled={quantityEqualOne}
              style={{
                ...styles.quantityButton,
                backgroundColor: quantityEqualOne ? Colors.Basic400 : Colors.Primary200,
              }}
              onPress={minusQuantity}
            >
              <RemoveIcon
                size={20}
                color={quantityEqualOne ? Colors.Basic600 : Colors.Primary500}
              />
            </Pressable>
            <Text style={TextStyles.c1}>{productQuantity}</Text>
            <Pressable
              disabled={quantityEqualRemaining}
              style={{
                ...styles.quantityButton,
                backgroundColor: quantityEqualRemaining ? Colors.Basic400 : Colors.Primary200,
              }}
              onPress={plusQuantity}
            >
              <AddIcon
                size={20}
                color={quantityEqualRemaining ? Colors.Basic600 : Colors.Primary500}
              />
            </Pressable>
          </View>
        </View>
      </Layout>
    );
  },
  (prevProps, nextProps) => {
    return nextProps.product._id === prevProps.product._id;
  },
);

const styles = StyleSheet.create({
  container: {
    padding: 15,
  },
  name: {
    flex: 1,
  },
  header: {
    display: 'flex',
    flexDirection: 'row',
    gap: 10,
    marginBottom: 10,
  },
  image: {
    borderRadius: 10,
  },
  buttonsContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  buttonRow: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  deleteButton: {
    padding: 5,
    backgroundColor: Colors.Basic400,
    borderRadius: 7,
    width: 30,
  },
  quantityButton: {
    padding: 5,
    borderRadius: 7,
    width: 30,
  },
});
