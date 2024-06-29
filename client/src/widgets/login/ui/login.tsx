import { Typography } from 'antd';
import { Tabs } from 'antd';
import { LoginFormEmail, LoginFormPhone } from 'features/login-forms';
import { LoginStyled } from './login.styles';

interface ITab {
  key: string;
  label: string;
  children: React.ReactNode;
}

const tabs: ITab[] = [
  {
    key: 'phone',
    label: 'По номеру телефона',
    children: <LoginFormPhone />,
  },
  {
    key: 'email',
    label: 'По почте',
    children: <LoginFormEmail />,
  },
];

export const Login = () => {
  return (
    <LoginStyled>
      <Typography.Title>Вход в личный кабинет</Typography.Title>
      <Tabs type="card" defaultActiveKey="phone" items={tabs} />
    </LoginStyled>
  );
};
