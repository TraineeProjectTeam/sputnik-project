import { Navigate, Route, Routes } from 'react-router-dom';
import { routes } from '../model/routes';
import { IRouterProps } from '../model/routes.types';
import Cookies from 'js-cookie';
import useLoginStore from 'features/login-forms/model/login.store';

export const Router = (props: IRouterProps) => {
  const { pages } = props;
  const token = Cookies.get('access_token');
  const role = useLoginStore((state) => state.role);

  return (
    <Routes>
      {Object.values(pages).map((page) => {
        if (!page.isAuth && !token) {
          return false;
        }
        if (page.role && page.role !== role) {
          return false;
        }
        return <Route key={`route_${page.path}`} path={page.path} element={page.element} />;
      })}
      <Route key={`route_default`} path="*" element={<Navigate to={routes.main} />} />
    </Routes>
  );
};
