import { EnumRoutesName, ICustomRouteProps, routes } from 'app/router';
import { MainPage } from './main';

export const pages: Record<EnumRoutesName, ICustomRouteProps> = {
  [EnumRoutesName.MAIN]: {
    path: routes.main,
    element: <MainPage />,
    isAuth: true,
  },
};
