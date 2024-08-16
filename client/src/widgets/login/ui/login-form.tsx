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
import { ILoginForm } from '../model/login-form.types';

export const LoginForm = (props: ILoginForm) => {
  const { formType } = props;
  const [form] = Form.useForm();
  const [messageApi, contextHolder] = message.useMessage();
  const { loginEmail, loginPhone, error, loading } = useLoginStore();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const onSubmit = async (values: ILoginEmailDetails | ILoginPhoneDetails) => {
    try {
      if ('email' in values) {
        loginEmail(values);
      } else if ('phone_number' in values) {
        loginPhone(values);
      }

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
      name={formType === 'email' ? 'email-form' : 'phone-form'}
      onFinish={onSubmit}
      autoComplete="on"
      layout="vertical"
      initialValues={formType === 'email' ? initialValuesEmailForm : initialValuesPhoneForm}
    >
      {contextHolder}
      <ButtonLinkStyled type="link" onClick={handleLinkClick}>
        {t('Нет аккаунта? Зарегистрируйтесь!')}
      </ButtonLinkStyled>
      {formType === 'email' ? (
        <Form.Item
          label={t('Адрес электронной почты')}
          name="email"
          rules={rulesForFormItems(t).email}
          validateTrigger="onBlur"
        >
          <Input type="email" placeholder="mail@mail.ru" />
        </Form.Item>
      ) : (
        <Form.Item
          label={t('Номер телефона')}
          name="phone_number"
          rules={rulesForFormItems(t).phone}
          validateTrigger="onBlur"
        >
          <Input type="tel" placeholder="+12345678901" />
        </Form.Item>
      )}
      <Form.Item label={t('Пароль')} name="password" rules={rulesForFormItems(t).password}>
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
