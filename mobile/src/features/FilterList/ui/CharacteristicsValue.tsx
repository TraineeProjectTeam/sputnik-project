import React, { memo } from 'react';
import { Pressable, StyleSheet, Text } from 'react-native';

import { Colors } from '@/shared/libs/colors';
import { TextStyles } from '@/shared/libs/textStyles';

export const CharacteristicsValue = memo(
  ({
    item,
    title,
    values,
    setValues,
    setCharacteristics,
    deleteCharacteristics,
  }: {
    item: string;
    title: string;
    values: string[];
    setValues: (value: React.SetStateAction<string[]>) => void;
    setCharacteristics: (title: string, value: string) => void;
    deleteCharacteristics: (title: string, value: string) => void;
  }) => {
    const isActive = values.some((value) => value === item);

    const addValue = () => {
      if (!isActive) {
        setValues((obj) => [...obj, item]);
        setCharacteristics(title, item);
      } else {
        setValues(values.filter((value) => value != item));
        deleteCharacteristics(title, item);
      }
    };

    return (
      <Pressable
        onPress={addValue}
        style={{
          backgroundColor: isActive ? Colors.Primary500 : Colors.Basic300,
          ...styles.pressable,
        }}
      >
        <Text style={TextStyles.s2.changeColor(isActive ? Colors.Basic100 : Colors.Basic800)}>
          {item}
        </Text>
      </Pressable>
    );
  },
);

const styles = StyleSheet.create({
  pressable: {
    paddingHorizontal: 10,
    borderRadius: 15,
    display: 'flex',
    alignItems: 'center',
  },
});
