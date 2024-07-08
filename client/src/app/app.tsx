import 'antd/dist/reset.css'; // сброс стилей с помощью antd
import 'shared/styles/styles.scss'; // общие стили для всего приложения
import './i18n';
import { Suspense } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Router } from './router';
import { Layout } from 'widgets/layout';
import { GlobalSpin } from 'shared/ui/global-spin';
import { pages } from 'pages';

export const App = () => {
  return (
    <BrowserRouter>
      <Layout>
        <Suspense fallback={<GlobalSpin size="large" />}>
          <Router pages={pages} />
        </Suspense>
      </Layout>
    </BrowserRouter>
  );
};
