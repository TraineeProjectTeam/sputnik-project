import React, { memo, useEffect, useState } from 'react';
import {
  NativeSyntheticEvent,
  StyleSheet,
  TextInputSubmitEditingEventData,
  View,
} from 'react-native';
import { Input } from '@ui-kitten/components';

interface InputsPriceeProps {
  value: number[];
  setPrice: React.Dispatch<React.SetStateAction<number[]>>;
  minPrice: number;
  maxPrice: number;
}

export const InputsPrice: React.FC<InputsPriceeProps> = memo(
  ({ setPrice, value, minPrice, maxPrice }) => {
    const [inputValue, setInputValue] = useState([minPrice, maxPrice]);

    useEffect(() => {
      setInputValue(value);
    }, [value]);

    const setMinPrice = (e: NativeSyntheticEvent<TextInputSubmitEditingEventData>) => {
      let minInputPrice = Number(e.nativeEvent.text);
      if (minInputPrice < minPrice) {
        minInputPrice = minPrice;
      }
      if (minInputPrice > inputValue[1]) {
        minInputPrice = inputValue[1];
      }
      setInputValue([minInputPrice, value[1]]);
      setPrice([minInputPrice, value[1]]);
    };

    const setMaxPrice = (e: NativeSyntheticEvent<TextInputSubmitEditingEventData>) => {
      let maxInputPrice = Number(e.nativeEvent.text);
      if (maxInputPrice > maxPrice) {
        maxInputPrice = maxPrice;
      }
      if (maxInputPrice < inputValue[0]) {
        maxInputPrice = inputValue[0];
      }
      setInputValue([value[0], maxInputPrice]);
      setPrice([value[0], maxInputPrice]);
    };

    const changeMinPrice = (e: string) => {
      setInputValue([Number(e), value[1]]);
    };

    const changeMaxPrice = (e: string) => {
      setInputValue([value[0], Number(e)]);
    };

    return (
      <View style={styles.inputContainer}>
        <Input
          value={String(inputValue[0])}
          onChangeText={changeMinPrice}
          style={{ width: '50%' }}
          keyboardType="numeric"
          onSubmitEditing={setMinPrice}
        />
        <Input
          value={String(inputValue[1])}
          onChangeText={changeMaxPrice}
          style={{ width: '50%' }}
          keyboardType="numeric"
          onSubmitEditing={setMaxPrice}
        />
      </View>
    );
  },
);

const styles = StyleSheet.create({
  inputContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'stretch',
    gap: 10,
    justifyContent: 'space-between',
  },
});
