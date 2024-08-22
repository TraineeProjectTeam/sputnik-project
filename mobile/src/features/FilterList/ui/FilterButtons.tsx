import React, { memo, useState } from 'react';
import { Pressable, StyleSheet, Text } from 'react-native';

import { useProductStore } from '@/entities/Product';
import { Colors } from '@/shared/libs/colors';
import { TextStyles } from '@/shared/libs/textStyles';

export const RatingButton = memo(
  ({
    rating,
    value,
    setValue,
  }: {
    rating?: number;
    value: number;
    setValue: React.Dispatch<React.SetStateAction<number | undefined>>;
  }) => {
    const setProductsRating = () => {
      if (value === rating) {
        setValue(0);
      } else {
        setValue(value);
      }
    };

    return (
      <Pressable
        onPress={setProductsRating}
        style={{
          backgroundColor: rating === value ? Colors.Primary500 : Colors.Basic300,
          ...styles.filterPressable,
        }}
      >
        <Text
          style={TextStyles.s2.changeColor(rating === value ? Colors.Basic100 : Colors.Basic800)}
        >
          {value}
        </Text>
      </Pressable>
    );
  },
);

export const CategoryButton = memo(
  ({
    category,
    value,
    setValue,
    reset,
  }: {
    category?: string;
    value: string;
    setValue: React.Dispatch<React.SetStateAction<string | undefined>>;
    reset: () => void;
  }) => {
    const { getCharacteristics } = useProductStore();

    const setCategory = () => {
      setValue(value);
      getCharacteristics(value);
      reset();
    };

    return (
      <Pressable
        onPress={setCategory}
        style={{
          backgroundColor: category === value ? Colors.Primary500 : Colors.Basic300,
          ...styles.filterPressable,
        }}
      >
        <Text
          style={TextStyles.s2.changeColor(category === value ? Colors.Basic100 : Colors.Basic800)}
        >
          {value}
        </Text>
      </Pressable>
    );
  },
);

const styles = StyleSheet.create({
  filterPressable: {
    paddingHorizontal: 10,
    borderRadius: 15,
    display: 'flex',
    alignItems: 'center',
  },
});
