import React, { useState } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import { Colors } from '@/shared/libs/colors';

export const AddToFavoriteBtn = () => {
  const [clicked, setIsCliced] = useState(false);

  return (
    <Pressable onPress={() => setIsCliced(!clicked)} style={styles.button}>
      <View>
        <Icon style={styles.iconBg} name="favorite" size={26} color="#fff" />
        <Icon
          name={clicked ? 'favorite' : 'favorite-outline'}
          size={24}
          color={clicked ? 'red' : Colors.Basic700}
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
