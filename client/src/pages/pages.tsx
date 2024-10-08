import { ICustomRouteProps } from 'app';
import { MainPage } from './main';
import { ProfileCustomerPage } from './profile-customer';
import { ProfileVendorPage } from './profile-vendor';
import { MapPage } from './map';
import { RegisterPage } from './register';
import { LoginPage } from './login';
import { OrdersPage } from './orders';
import { OrderPage } from './order';
import { EnumRoutesName } from 'shared/config';
import { CategoryPage } from './category';
import { CatalogPage } from './catalog';
import { ProductsVendorPage } from './products-vendor';

export const pages: Record<EnumRoutesName, ICustomRouteProps> = {
  [EnumRoutesName.MAIN]: {
    path: EnumRoutesName.MAIN,
    element: <MainPage />,
    isAuth: true,
  },
  [EnumRoutesName.PROFILE_CUSTOMER]: {
    path: EnumRoutesName.PROFILE_CUSTOMER,
    element: <ProfileCustomerPage />,
    isAuth: false,
    role: 'Customer',
  },
  [EnumRoutesName.PROFILE_VENDOR]: {
    path: EnumRoutesName.PROFILE_VENDOR,
    element: <ProfileVendorPage />,
    isAuth: false,
    role: 'Vendor',
  },
  [EnumRoutesName.LOGIN]: {
    path: EnumRoutesName.LOGIN,
    element: <LoginPage />,
    isAuth: true,
  },
  [EnumRoutesName.REGISTER]: {
    path: EnumRoutesName.REGISTER,
    element: <RegisterPage />,
    isAuth: true,
  },
  [EnumRoutesName.MAP]: {
    path: EnumRoutesName.MAP,
    element: <MapPage />,
    isAuth: true,
  },
  [EnumRoutesName.ORDERS]: {
    path: EnumRoutesName.ORDERS,
    element: <OrdersPage />,
    isAuth: false,
  },
  [EnumRoutesName.ORDER]: {
    path: EnumRoutesName.ORDER,
    element: <OrderPage />,
    isAuth: false,
  },
  [EnumRoutesName.CATALOG]: {
    path: EnumRoutesName.CATALOG,
    element: <CatalogPage />,
    isAuth: true,
  },
  [EnumRoutesName.CATEGORY]: {
    path: EnumRoutesName.CATEGORY,
    element: <CategoryPage />,
    isAuth: true,
  },
  [EnumRoutesName.PRODUCTS_VENDOR]: {
    path: EnumRoutesName.PRODUCTS_VENDOR,
    element: <ProductsVendorPage />,
    isAuth: false,
    role: 'Vendor',
  },
};
