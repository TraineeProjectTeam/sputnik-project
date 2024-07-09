import { Button, Input, Radio, Spin, message } from 'antd';
import Form from 'antd/es/form';
import { ILoginEmailDetails } from 'features/login-forms/model/login.types';
import { rulesForFormItems } from 'shared/ui/forms/model/form-rules';
import useLoginStore from '../model/login.store';
import { useNavigate } from 'react-router-dom';
import { ButtonLinkStyled, ButtonWrapperStyled } from 'shared/ui/forms/ui/form.styles';
import { useTranslation } from 'react-i18next';

const initialValues: ILoginEmailDetails = {
  email: '',
  password: '',
  role: 'Customer',
};

export const LoginFormEmail = () => {
  const [form] = Form.useForm();
  const [messageApi, contextHolder] = message.useMessage();
  const { loginEmail, error, loading } = useLoginStore();
  const navigate = useNavigate();
  const [tErrors] = useTranslation('errors');
  const [tForm] = useTranslation('form');
  const [tCommon] = useTranslation('common');

  const onSubmit = async (values: ILoginEmailDetails) => {
    try {
      await loginEmail(values);
      switch (values.role) {
        case 'Customer':
          setTimeout(() => navigate('/profile-customer'), 1000);
          break;
        case 'Vendor':
          setTimeout(() => navigate('/profile-vendor'), 1000);
          break;
      }
    } catch {
      showError(error);
    }
  };

  const showError = (error: string) => {
    messageApi.open({
      type: 'error',
      content: error,
    });
  };

  const handleLinkClick = () => {
    navigate('/register');
  };

  return (
    <Form
      form={form}
      name="email-form"
      onFinish={onSubmit}
      autoComplete="on"
      layout="vertical"
      initialValues={initialValues}
    >
      {contextHolder}
      <ButtonLinkStyled type="link" onClick={handleLinkClick}>
        {tForm('Нет аккаунта? Зарегистрируйтесь!')}
      </ButtonLinkStyled>
      <Form.Item
        label={tForm('Адрес электронной почты')}
        name="email"
        rules={rulesForFormItems(tErrors).email}
      >
        <Input type="email" placeholder="mail@mail.ru" />
      </Form.Item>
      <Form.Item
        label={tForm('Пароль')}
        name="password"
      >
        <Input.Password autoComplete="on" />
      </Form.Item>
      <Form.Item name="role" label={tForm('Войти как')}>
        <Radio.Group>
          <Radio value="Customer">{tCommon('Покупатель')}</Radio>
          <Radio value="Vendor">{tCommon('Продавец')}</Radio>
        </Radio.Group>
      </Form.Item>
      <Form.Item>
        <ButtonWrapperStyled>
          {loading && <Spin />}
          <Button type="primary" htmlType="submit" disabled={loading}>
            {tCommon('Войти')}
          </Button>
        </ButtonWrapperStyled>
      </Form.Item>
    </Form>
  );
};
