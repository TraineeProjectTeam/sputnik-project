import { ReactNode } from 'react';
import { EnumRoutesName } from 'shared/config';

export interface IRoute {
  url: string;
  label: string;
}

export interface ICustomRouteProps {
  path: string;
  element: ReactNode;
  isAuth: boolean;
  role?: 'Customer' | 'Vendor';
}

export interface IRouterProps {
  pages: Record<EnumRoutesName, ICustomRouteProps>;
}
