import { ReactNode } from 'react';
import { EnumRoutesName } from './routes';

export interface ICustomRouteProps {
  path: string;
  element: ReactNode;
  isAuth: boolean;
  role?: 'Customer' | 'Vendor';
}

export interface IRouterProps {
  pages: Record<EnumRoutesName, ICustomRouteProps>;
}
