import React, { useCallback, useEffect, useState } from 'react';
import { Dimensions, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { Button, Divider, Layout } from '@ui-kitten/components';
import MultiSlider from '@ptomasroos/react-native-multi-slider';
import { shallow } from 'zustand/shallow';

import { useProductStore } from '@/entities/Product';
import { Colors } from '@/shared/libs/colors';
import { TextStyles } from '@/shared/libs/textStyles';
import { PageSpinner } from '@/shared/ui/PageSpinner';
import { ICharacteristic } from '@/shared/libs/types';
import { useAppNavigation } from '@/shared/libs/useAppNavigation';

import { Characteristics } from './Characteristics';
import { CategoryButton, RatingButton } from './FilterButtons';
import { InputsPrice } from './InputsPrice';

const width = Dimensions.get('window').width;

export const FilterList = () => {
  const {
    getProducts,
    char,
    filters,
    categories,
    getCharacteristics,
    isLoadingChar,
    resetFilters,
    prices,
    cachedCategory,
    cachedFilters,
    resetCache,
  } = useProductStore(
    (state) => ({
      getProducts: state.getProducts,
      char: state.characteristics,
      filters: state.filters,
      categories: state.categories,
      getCharacteristics: state.getCharacteristics,
      isLoadingChar: state.isLoadingChar,
      resetFilters: state.resetFilters,
      prices: state.prices,
      cachedCategory: state.cachedCategory,
      cachedFilters: state.cachedFilters,
      resetCache: state.resetCache,
    }),
    shallow,
  );

  const { t } = useTranslation();
  const navigation = useAppNavigation();
  const ratings = [0.5, 1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5];

  const [rating, setRating] = useState(filters.rating);
  const [category, setCategory] = useState(filters.category);
  const [characteristics, setCharacteristic] = useState(filters.characteristics);
  const [sliderValue, setSliderValue] = useState([filters.min, filters.max]);

  useEffect(() => {
    if (!char.length || cachedCategory != category) {
      getCharacteristics(category);
    }
  }, []);

  useEffect(() => {
    if (
      category === filters.category &&
      (cachedFilters.characteristics.length || cachedFilters.rating)
    ) {
      setRating(cachedFilters.rating);
      setCharacteristic(cachedFilters.characteristics);
    }
  }, [category]);

  useEffect(() => {
    if (filters.min || filters.max) {
      setSliderValue([filters.min, filters.max]);
    }

    if (category === filters.category && (cachedFilters.max || cachedFilters.min)) {
      setSliderValue([cachedFilters.min, cachedFilters.max]);
    }
  }, [filters.max, filters.min]);

  const sliderValuesChange = useCallback((values: number[]) => {
    setSliderValue(values);
  }, []);

  const reset = () => {
    setCharacteristic([]);
    setRating(0);
    resetFilters();
  };

  const setCharValue = (title: string, value: string) => {
    const isExist = characteristics?.some((value) => value.characteristic === title);

    if (isExist) {
      setCharacteristic(
        characteristics.map((item) => {
          return item.characteristic === title
            ? { ...item, values: [...item.values, value] }
            : item;
        }),
      );
    } else {
      setCharacteristic((obj) => [
        ...obj,
        {
          characteristic: title,
          values: [value],
        },
      ]);
    }
  };

  const deleteCharValue = (title: string, values: string) => {
    const index = characteristics.findIndex((value) => value.characteristic === title);

    if (characteristics[index].values.length > 1) {
      setCharacteristic(
        characteristics.map((item) => {
          return item.characteristic === title
            ? { ...item, values: item.values.filter((value) => value != values) }
            : item;
        }),
      );
    } else {
      setCharacteristic((obj) => obj.filter((value) => value.characteristic != title));
    }
  };

  const confirm = () => {
    getProducts({
      category,
      rating,
      min: sliderValue[0],
      max: sliderValue[1],
      characteristics,
    });
    resetCache();
    navigation.goBack();
  };

  if (isLoadingChar) {
    return <PageSpinner />;
  }

  return (
    <Layout style={styles.container}>
      <ScrollView>
        <Text style={{ ...TextStyles.p1, ...styles.title }}>{t('Категории')}</Text>
        <View style={styles.btnsContainer}>
          {categories.map((value) => (
            <CategoryButton
              key={value}
              category={category}
              value={value}
              setValue={setCategory}
              reset={reset}
            />
          ))}
        </View>
        {prices.max != prices.min && (
          <>
            <Divider style={styles.divider} />
            <Text style={{ ...TextStyles.p1, ...styles.title }}>{t('Цена')}</Text>

            <InputsPrice
              value={sliderValue}
              setPrice={setSliderValue}
              minPrice={prices.min}
              maxPrice={prices.max}
            />
            <View style={styles.slideContainer}>
              <MultiSlider
                values={[sliderValue[0], sliderValue[1]]}
                onValuesChange={sliderValuesChange}
                min={prices.min}
                max={prices.max}
                step={1}
                sliderLength={width - 50}
                markerStyle={styles.sliderMarker}
                selectedStyle={styles.sliderSelected}
                unselectedStyle={styles.sliderUnselected}
              />
            </View>
          </>
        )}
        <Divider style={styles.divider} />
        <Text style={{ ...TextStyles.p1, ...styles.title }}>{t('Товары рейтингом выше')}</Text>
        <View style={styles.btnsContainer}>
          {ratings.map((value) => (
            <RatingButton key={value} rating={rating} value={value} setValue={setRating} />
          ))}
        </View>
        <Divider style={styles.divider} />
        {char.map((item) => (
          <Characteristics
            key={item.characteristic}
            title={item.characteristic}
            items={item.values}
            characteristics={characteristics}
            setCharacteristics={setCharValue}
            deleteCharacteristics={deleteCharValue}
          />
        ))}
      </ScrollView>
      <Button onPress={confirm}>{t('Применить')}</Button>
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 15,
    paddingHorizontal: 15,
    flex: 1,
  },
  title: {
    marginBottom: 5,
  },
  divider: {
    marginVertical: 8,
    backgroundColor: Colors.Basic500,
  },
  btnsContainer: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  slideContainer: {
    marginHorizontal: 10,
  },
  sliderMarker: {
    backgroundColor: Colors.Primary500,
    padding: 10,
  },
  sliderSelected: {
    backgroundColor: Colors.Primary500,
    height: 3,
  },
  sliderUnselected: {
    backgroundColor: Colors.Basic500,
    height: 3,
  },
});
