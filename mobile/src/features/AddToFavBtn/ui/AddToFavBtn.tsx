import React from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import { useFavoriteStore } from '@/entities/Favorite';
import { useUserStore } from '@/entities/user';

import { Colors } from '@/shared/libs/colors';
import { IProduct } from '@/shared/libs/types';

interface AddToFavoriteBtnProps {
  productId: string;
}

export const AddToFavoriteBtn: React.FC<AddToFavoriteBtnProps> = ({ productId }) => {
  const { addToFavorite, deleteFavorite } = useFavoriteStore();
  const { isFavorite, addToUserFavorite, deleteUserFavorite } = useUserStore();

  const toggleFavorite = () => {
    if (isFavorite(productId)) {
      deleteFavorite(productId);
      deleteUserFavorite(productId);
    } else {
      addToFavorite(productId);
      addToUserFavorite(productId);
    }
  };

  return (
    <Pressable onPress={toggleFavorite} style={styles.button}>
      <View>
        <Icon style={styles.iconBg} name="favorite" size={26} color="#fff" />
        <Icon
          name={isFavorite(productId) ? 'favorite' : 'favorite-outline'}
          size={24}
          color={isFavorite(productId) ? 'red' : Colors.Basic700}
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
