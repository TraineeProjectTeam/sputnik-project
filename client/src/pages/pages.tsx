import { EnumRoutesName, ICustomRouteProps, routes } from 'app/router';
import { MainPage } from './main';
import { ProfileCustomerPage } from './profile-customer';
import { ProfileVendorPage } from './profile-vendor';
import { MapPage } from './map';
import { RegisterPage } from './register';
import { LoginPage } from './login';
import { OrdersPage } from './orders';

export const pages: Record<EnumRoutesName, ICustomRouteProps> = {
  [EnumRoutesName.MAIN]: {
    path: routes.main,
    element: <MainPage />,
    isAuth: true,
  },
  [EnumRoutesName.PROFILE_CUSTOMER]: {
    path: routes.profile_customer,
    element: <ProfileCustomerPage />,
    isAuth: false,
    role: 'Customer',
  },
  [EnumRoutesName.PROFILE_VENDOR]: {
    path: routes.profile_vendor,
    element: <ProfileVendorPage />,
    isAuth: false,
    role: 'Vendor',
  },
  [EnumRoutesName.LOGIN]: {
    path: routes.login,
    element: <LoginPage />,
    isAuth: true,
  },
  [EnumRoutesName.REGISTER]: {
    path: routes.register,
    element: <RegisterPage />,
    isAuth: true,
  },
  [EnumRoutesName.MAP]: {
    path: routes.map,
    element: <MapPage />,
    isAuth: true,
  },
  [EnumRoutesName.ORDERS]: {
    path: routes.orders,
    element: <OrdersPage />,
    isAuth: false,
  },
};
