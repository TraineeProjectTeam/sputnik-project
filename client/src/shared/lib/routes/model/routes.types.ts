import { ReactNode } from 'react';
import { EnumRoutesName } from './routes';

export interface ICustomRouteProps {
  path: string;
  element: ReactNode;
  isAuth: boolean;
}

export interface IRouterProps {
  pages: Record<EnumRoutesName, ICustomRouteProps>
}