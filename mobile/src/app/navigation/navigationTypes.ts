import { NavigatorScreenParams } from '@react-navigation/native';
import { IOrder, IProduct, IReview } from '@/shared/libs/types';

export type RootStackParamList = {
  Loading: undefined;
  Main: NavigatorScreenParams<MainTabsStackParams>;
  Catalog: NavigatorScreenParams<CatalogStackParams>;
  Account: NavigatorScreenParams<AccountStackParams>;
  Cart: undefined;
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
  Order: IOrderPageParams;
  CustomerReviews: undefined;
  CreateReview: ICreateReviewPageParams;
  EditReview: IEditReviewPageParams;
  Language: undefined;
  Favorites: undefined;
  Product: IProductPageParams;
  ProductReviews: IProductReviewPageParams;
};

export type CatalogStackParams = {
  CatalogScreen: undefined;
  Product: IProductPageParams;
  ProductReviews: IProductReviewPageParams;
};

export type IOrderPageParams = {
  order: IOrder;
};

export type IProductPageParams = {
  product: IProduct;
};

export type ICreateReviewPageParams = {
  product: IProduct;
};

export type IEditReviewPageParams = {
  review: IReview;
};

export type IProductReviewPageParams = {
  reviews: string[];
  reviews_count: number;
  rating: number;
};
