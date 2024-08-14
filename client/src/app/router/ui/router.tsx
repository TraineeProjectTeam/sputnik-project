import { Navigate, Route, Routes } from 'react-router-dom';
import { IRouterProps } from '../model/routes.types';
import Cookies from 'js-cookie';
import { EnumRoutesName } from 'shared/config';
import { useLoginStore } from 'features/auth';

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
      <Route key={`route_default`} path="*" element={<Navigate to={EnumRoutesName.MAIN} />} />
    </Routes>
  );
};
