import React, { useEffect } from 'react';
import { FlatList } from 'react-native';

import { Screens, Stacks } from '@/app/navigation/navigationEnum';
import { useUserFormStore } from '@/features/user-form';

import { useFavoriteStore } from '@/entities/Favorite';
import { useProductStore } from '@/entities/Product';
import { useCartStore } from '@/entities/Cart';

import { storage } from '@/shared/libs/storage';
import { useAppNavigation } from '@/shared/libs/useAppNavigation';
import { MenuItem } from '@/shared/ui/menuItem';
import i18n from '@/shared/config/i18n';

export const CategoriesScreen = () => {
  const { categories, getCategories } = useProductStore();
  const { getUser } = useUserFormStore();
  const { setFavoriteIds } = useFavoriteStore();
  const { setProductsIds } = useCartStore();
  const navigation = useAppNavigation();

  const isAuth = storage.contains('access_token');

  useEffect(() => {
    if (isAuth) {
      const getData = async () => {
        const data = await getUser();
        setFavoriteIds(data.featured);
        setProductsIds(data.cart);
      };
      getData();
    }
    const languageCode = storage.getString('language');
    i18n.changeLanguage(languageCode);
    getCategories();
  }, []);

  const keyExtractor = (item: string) => item;
  const renderItem = ({ item }: { item: string }) => {
    const navigateToProductCategory = () => {
      navigation.navigate(Stacks.CATALOG, {
        screen: Screens.PRODUCTS,
        params: { category: item },
      });
    };

    return <MenuItem onPress={navigateToProductCategory} title={item} />;
  };
  return <FlatList data={categories} renderItem={renderItem} keyExtractor={keyExtractor} />;
};
