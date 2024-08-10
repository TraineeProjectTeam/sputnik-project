import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useFocusEffect } from '@react-navigation/native';
import { Button, Text } from '@ui-kitten/components';
import { shallow } from 'zustand/shallow';

import { Screens, Stacks } from '@/app/navigation/navigationEnum';

import { useCartStore } from '@/entities/Cart';

import { useDebounce } from '@/shared/hooks/useDebouce';
import { Colors } from '@/shared/libs/colors';
import { AddIcon, RemoveIcon, ShoppingBag } from '@/shared/libs/icons';
import { TextStyles } from '@/shared/libs/textStyles';
import { storage } from '@/shared/libs/storage';
import { useAppNavigation } from '@/shared/libs/useAppNavigation';

interface AddToCartBtnProps {
  productId: string;
  size?: string;
  remaining: number;
}

export const AddToCartBtn: React.FC<AddToCartBtnProps> = ({
  size = 'medium',
  productId,
  remaining,
}) => {
  const [deleteFavorite, updateQuantity, isInCart, getProduct, addToCart] = useCartStore(
    (state) => [
      state.deleteFavorite,
      state.updateQuantity,
      state.isInCart,
      state.getProduct,
      state.addToCart,
    ],
    shallow,
  );

  const quantity = () => {
    if (isInCart(productId)) {
      return getProduct(productId).quantity;
    }
    return 0;
  };

  const [productQuantity, setProductQuantity] = useState(quantity);
  const debouncedValue = useDebounce(productQuantity, 500);
  const pageHasBeenRendered = useRef(false);
  const navigation = useAppNavigation();
  const { t } = useTranslation();

  useEffect(() => {
    if (pageHasBeenRendered.current && productQuantity) {
      updateQuantity(productId, debouncedValue);
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

  const isAuth = storage.contains('access_token');

  const addProductToCart = async () => {
    if (isAuth) {
      const data = await addToCart(productId);
      setProductQuantity(data.quantity);
    } else {
      navigation.navigate(Stacks.ACCOUNT, { screen: Screens.LOGIN_BY_PHONE });
      return;
    }
  };

  const deleteProduct = () => {
    deleteFavorite(productId);
    setProductQuantity((prev) => prev - 1);
  };

  const plusQuantity = () => {
    setProductQuantity((prev) => prev + 1);
  };

  const minusQuantity = () => {
    setProductQuantity((prev) => prev - 1);
  };

  if (productQuantity) {
    return (
      <View style={styles.container}>
        <Pressable
          style={{
            ...styles.pressable,
            width: size === 'medium' ? 45 : 30,
            height: size === 'medium' ? 45 : 33,
          }}
          onPress={productQuantity === 1 ? deleteProduct : minusQuantity}
        >
          <RemoveIcon size={20} color={Colors.Primary500} />
        </Pressable>
        <Text style={size === 'medium' ? TextStyles.p1 : TextStyles.c2}>{productQuantity}</Text>
        <Pressable
          disabled={productQuantity === remaining}
          style={{
            ...styles.pressable,
            width: size === 'medium' ? 45 : 30,
            height: size === 'medium' ? 45 : 33,
            backgroundColor: productQuantity === remaining ? Colors.Basic400 : Colors.Primary200,
          }}
          onPress={plusQuantity}
        >
          <AddIcon
            size={20}
            color={productQuantity === remaining ? Colors.Basic600 : Colors.Primary500}
          />
        </Pressable>
      </View>
    );
  }

  return (
    <Button
      size={size}
      accessoryLeft={<ShoppingBag size={16} color={Colors.Basic100} />}
      onPress={addProductToCart}
    >
      {(evaProps) => (
        <Text {...evaProps} style={TextStyles.button.changeColor(Colors.Basic100)}>
          {t('Product.В корзину')}
        </Text>
      )}
    </Button>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 10,
  },
  pressable: {
    padding: 5,
    borderRadius: 7,
    width: 30,
    height: 33,
    backgroundColor: Colors.Primary200,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
