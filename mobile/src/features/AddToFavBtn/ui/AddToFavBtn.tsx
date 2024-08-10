import React, { useCallback, useState } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { shallow } from 'zustand/shallow';

import { Screens, Stacks } from '@/app/navigation/navigationEnum';

import { useFavoriteStore } from '@/entities/Favorite';

import { Colors } from '@/shared/libs/colors';
import { storage } from '@/shared/libs/storage';
import { useAppNavigation } from '@/shared/libs/useAppNavigation';

interface AddToFavoriteBtnProps {
  productId: string;
}

export const AddToFavoriteBtn: React.FC<AddToFavoriteBtnProps> = ({ productId }) => {
  const [addToFavorite, deleteFavorite, isFavorite] = useFavoriteStore(
    (state) => [state.addToFavorite, state.deleteFavorite, state.isFavorite],
    shallow,
  );

  const [favorite, setFavorite] = useState(isFavorite(productId));

  useFocusEffect(useCallback(() => setFavorite(isFavorite(productId)), []));

  const isAuth = storage.contains('access_token');
  const navigation = useAppNavigation();

  const toggleFavorite = async () => {
    if (!isAuth) {
      navigation.navigate(Stacks.ACCOUNT, { screen: Screens.LOGIN_BY_PHONE });
      return;
    }
    if (favorite) {
      const data = await deleteFavorite(productId);
      setFavorite(isFavorite(data._id));
    } else {
      const data = await addToFavorite(productId);
      setFavorite(isFavorite(data._id));
    }
  };

  return (
    <Pressable onPress={toggleFavorite} style={styles.button}>
      <View>
        <Icon style={styles.iconBg} name="favorite" size={26} color="#fff" />
        <Icon
          name={favorite ? 'favorite' : 'favorite-outline'}
          size={24}
          color={favorite ? 'red' : Colors.Basic700}
        />
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    padding: 5,
  },
  iconBg: {
    position: 'absolute',
    top: -1,
    right: 1,
  },
});
