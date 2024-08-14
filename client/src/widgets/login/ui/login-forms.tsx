import { Button, Form, Input, Radio, Spin, message } from 'antd';
import { rulesForFormItems } from 'shared/ui/forms';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ButtonLinkStyled, ButtonWrapperStyled } from 'shared/ui/forms';
import { EnumRoutesName } from 'shared/config';
import {
  ILoginEmailDetails,
  ILoginPhoneDetails,
  initialValuesEmailForm,
  initialValuesPhoneForm,
  useLoginStore,
} from 'features/auth';

export const LoginFormEmail = () => {
  const [form] = Form.useForm();
  const [messageApi, contextHolder] = message.useMessage();
  const { loginEmail, error, loading } = useLoginStore();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const onSubmit = async (values: ILoginEmailDetails) => {
    try {
      await loginEmail(values);
      switch (values.role) {
        case 'Customer':
          setTimeout(() => navigate(EnumRoutesName.PROFILE_CUSTOMER), 1000);
          break;
        case 'Vendor':
          setTimeout(() => navigate(EnumRoutesName.PROFILE_VENDOR), 1000);
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
    navigate(EnumRoutesName.REGISTER);
  };

  return (
    <Form
      form={form}
      name="email-form"
      onFinish={onSubmit}
      autoComplete="on"
      layout="vertical"
      initialValues={initialValuesEmailForm}
    >
      {contextHolder}
      <ButtonLinkStyled type="link" onClick={handleLinkClick}>
        {t('Нет аккаунта? Зарегистрируйтесь!')}
      </ButtonLinkStyled>
      <Form.Item
        label={t('Адрес электронной почты')}
        name="email"
        rules={rulesForFormItems(t).email}
        validateTrigger="onBlur"
      >
        <Input type="email" placeholder="mail@mail.ru" />
      </Form.Item>
      <Form.Item label={t('Пароль')} name="password">
        <Input.Password autoComplete="on" />
      </Form.Item>
      <Form.Item name="role" label={t('Войти как')}>
        <Radio.Group>
          <Radio value="Customer">{t('Покупатель')}</Radio>
          <Radio value="Vendor">{t('Продавец')}</Radio>
        </Radio.Group>
      </Form.Item>
      <Form.Item>
        <ButtonWrapperStyled>
          {loading && <Spin />}
          <Button type="primary" htmlType="submit" disabled={loading}>
            {t('Войти')}
          </Button>
        </ButtonWrapperStyled>
      </Form.Item>
    </Form>
  );
};

export const LoginFormPhone = () => {
  const [form] = Form.useForm();
  const [messageApi, contextHolder] = message.useMessage();
  const { loginPhone, error, loading } = useLoginStore();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const onSubmit = async (values: ILoginPhoneDetails) => {
    try {
      await loginPhone(values);
      switch (values.role) {
        case 'Customer':
          setTimeout(() => navigate(EnumRoutesName.PROFILE_CUSTOMER), 1000);
          break;
        case 'Vendor':
          setTimeout(() => navigate(EnumRoutesName.PRODUCTS_VENDOR), 1000);
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
    navigate(EnumRoutesName.REGISTER);
  };

  return (
    <Form
      form={form}
      name="phone-number-form"
      onFinish={onSubmit}
      autoComplete="on"
      layout="vertical"
      initialValues={initialValuesPhoneForm}
    >
      {contextHolder}
      <ButtonLinkStyled type="link" onClick={handleLinkClick}>
        {t('Нет аккаунта? Зарегистрируйтесь!')}
      </ButtonLinkStyled>
      <Form.Item
        label={t('Номер телефона')}
        name="phone_number"
        rules={rulesForFormItems(t).phone}
        validateTrigger="onBlur"
      >
        <Input type="tel" placeholder="+12345678901" />
      </Form.Item>
      <Form.Item label={t('Пароль')} name="password">
        <Input.Password autoComplete="on" />
      </Form.Item>
      <Form.Item name="role" label={t('Войти как')}>
        <Radio.Group>
          <Radio value="Customer">{t('Покупатель')}</Radio>
          <Radio value="Vendor">{t('Продавец')}</Radio>
        </Radio.Group>
      </Form.Item>
      <Form.Item>
        <ButtonWrapperStyled>
          {loading && <Spin />}
          <Button type="primary" htmlType="submit" disabled={loading}>
            {t('Войти')}
          </Button>
        </ButtonWrapperStyled>
      </Form.Item>
    </Form>
  );
};
