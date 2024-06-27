import 'antd/dist/reset.css'; // сброс стилей с помощью antd
import 'shared/styles/styles.scss'; // общие стили для всего приложения
import { Suspense } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Router } from './router';
import { pages } from 'pages';
import { Layout } from 'widgets/layout';
import { Spin } from 'antd';

export const App = () => {
  return (
    <BrowserRouter>
      <Layout>
        <Suspense fallback={<Spin />}>
          <Router pages={pages} />
        </Suspense>
      </Layout>
    </BrowserRouter>
  );
};