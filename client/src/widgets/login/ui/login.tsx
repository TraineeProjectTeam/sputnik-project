import { Typography } from 'antd';
import { Tabs } from 'antd';
import { LoginFormEmail, LoginFormPhone } from 'features/login-forms';
import { LoginStyled } from './login.styles';
import { useTranslation } from 'react-i18next';

interface ITab {
  key: string;
  label: string;
  children: React.ReactNode;
}

export const Login = () => {
  const { t } = useTranslation(['common']);
  const tabs: ITab[] = [
    {
      key: 'phone',
      label: t('По номеру телефона'),
      children: <LoginFormPhone />,
    },
    {
      key: 'email',
      label: t('По почте'),
      children: <LoginFormEmail />,
    },
  ];

  return (
    <LoginStyled>
      <Typography.Title>{t('Вход в личный кабинет')}</Typography.Title>
      <Tabs type="card" defaultActiveKey="phone" items={tabs} />
    </LoginStyled>
  );
};
