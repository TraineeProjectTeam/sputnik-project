import { Typography } from 'antd';
import { Tabs } from 'antd';
import { LoginStyled } from './login.styles';
import { useTranslation } from 'react-i18next';
import { LoginForm } from './login-form';

interface ITab {
  key: string;
  label: string;
  children: React.ReactNode;
}

export const Login = () => {
  const { t } = useTranslation();

  const tabs: ITab[] = [
    {
      key: 'phone',
      label: t('По номеру телефона'),

      children: <LoginForm formType="phone" />,
    },
    {
      key: 'email',
      label: t('По почте'),
      children: <LoginForm formType="email" />,
    },
  ];

  return (
    <LoginStyled>
      <Typography.Title>{t('Вход в личный кабинет')}</Typography.Title>
      <Tabs type="card" defaultActiveKey="phone" items={tabs} />
    </LoginStyled>
  );
};
