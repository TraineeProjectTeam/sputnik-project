import 'antd/dist/reset.css'; // сброс стилей с помощью antd
import 'shared/styles/styles.scss'; // общие стили для всего приложения
import { Suspense } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Router } from './router';
import { pages } from 'pages';

export const App = () => {
  return (
    <BrowserRouter>
      <Suspense fallback={<div>Loading...</div>}>
        <Router pages={pages} />
      </Suspense>
    </BrowserRouter>
  );
};
