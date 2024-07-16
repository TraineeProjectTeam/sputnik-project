import { NavigatorScreenParams } from '@react-navigation/native';
import { IProduct } from '@/shared/libs/types';

export type RootStackParamList = {
  Loading: undefined;
  Main: NavigatorScreenParams<MainTabsStackParams>;
  Catalog: NavigatorScreenParams<CatalogStackParams>;
  Account: NavigatorScreenParams<AccountStackParams>;
  Cart: undefined;
  Product: { product: IProduct };
};

export type MainTabsStackParams = {
  Catalog: undefined;
  Cart: undefined;
  Account: undefined;
};

export type AccountStackParams = {
  AccountScreen: undefined;
  LoginByEmail: undefined;
  LoginByPhone: undefined;
  Registration: undefined;
  Profile: undefined;
  Orders: undefined;
  Reviews: undefined;
  Language: undefined;
};

export type CatalogStackParams = {
  CatalogScreen: undefined;
};
