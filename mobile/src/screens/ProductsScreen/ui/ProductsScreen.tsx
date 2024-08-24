import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Layout } from '@ui-kitten/components';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { BottomSheetModal, BottomSheetModalProvider } from '@gorhom/bottom-sheet';

import { CatalogStackParams } from '@/app/navigation/navigationTypes';
import { ProductList } from '@/widgets/ProductList';
import { SortList } from '@/features/SortList';
import { FilterList } from '@/features/FilterList';
import { useProductStore } from '@/entities/Product';

import { TextStyles } from '@/shared/libs/textStyles';
import { FilterIcon, SortIcon } from '@/shared/libs/icons';
import { Colors } from '@/shared/libs/colors';
import { useAppNavigation } from '@/shared/libs/useAppNavigation';
import { Screens } from '@/app/navigation/navigationEnum';
import { useTranslation } from 'react-i18next';

type Props = NativeStackScreenProps<CatalogStackParams, 'Products'>;

export const ProductsScreen: React.FC<Props> = ({ route }) => {
  const { category } = route.params;
  const {
    products,
    isLoading,
    getProducts,
    totalPages,
    currentPage,
    refreshProducts,
    onEndReached,
    reset,
    filters,
  } = useProductStore();

  const navigation = useAppNavigation();
  const { t } = useTranslation();

  useEffect(() => {
    getProducts({ ...filters, category, sortBy: 'reviews_count', order: 'desc' });

    const onLeave = navigation.addListener('beforeRemove', () => {
      reset();
    });
    return onLeave;
  }, []);

  const getMoreData = () => {
    const hasMore = totalPages > currentPage;
    if (!isLoading && hasMore) {
      onEndReached();
    }
  };

  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);

  const navigateToFilters = () => {
    navigation.navigate(Screens.FILTERS);
  };

  return (
    <View style={styles.container}>
      <Layout style={styles.buttonsLayout}>
        <Pressable onPress={handlePresentModalPress} style={styles.pressable}>
          <SortIcon size={24} color={Colors.Primary600} />
          <Text style={TextStyles.s2}>{t('Сортировка')}</Text>
        </Pressable>
        <Pressable onPress={navigateToFilters} style={styles.pressable}>
          <FilterIcon size={24} color={Colors.Primary600} />
          <Text style={TextStyles.s2}>{t('Фильтры')}</Text>
        </Pressable>
      </Layout>
      <ProductList
        products={products}
        isLoading={isLoading}
        refreshProducts={refreshProducts}
        onEndReached={getMoreData}
      />
      <SortList refer={bottomSheetModalRef} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  buttonsLayout: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
  },
  pressable: {
    paddingBottom: 5,
    paddingHorizontal: 15,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
});
