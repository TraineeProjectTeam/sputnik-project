import { Button, Input, Radio, Spin, message } from 'antd';
import Form from 'antd/es/form';
import { ILoginPhoneDetails } from 'features/login-forms/model/login.types';
import { rulesForFormItems } from 'shared/ui/forms/model/form-rules';
import useLoginStore from '../model/login.store';
import { useNavigate } from 'react-router-dom';
import { ButtonWrapperStyled } from 'shared/ui/forms/ui/form.styles';
import { useTranslation } from 'react-i18next';

const initialValues: ILoginPhoneDetails = {
  phone_number: '',
  password: '',
  role: 'Customer',
};

export const LoginFormPhone = () => {
  const [form] = Form.useForm();
  const [messageApi, contextHolder] = message.useMessage();
  const { loginPhone, error, loading } = useLoginStore();
  const navigate = useNavigate();
  const [tErrors] = useTranslation('errors');
  const [tForm] = useTranslation('form');
  const [tCommon] = useTranslation('common');

  const onSubmit = async (values: ILoginPhoneDetails) => {
    try {
      await loginPhone(values);
      navigate('/');
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
  return (
    <Form
      form={form}
      name="phone-number-form"
      onFinish={onSubmit}
      autoComplete="on"
      layout="vertical"
      initialValues={initialValues}
    >
      {contextHolder}
      <Form.Item
        label={tForm('Номер телефона')}
        name="phone_number"
        rules={rulesForFormItems(tErrors).phone}
      >
        <Input type="tel" placeholder="+12345678901" />
      </Form.Item>
      <Form.Item
        label={tForm('Пароль')}
        name="password"
        rules={rulesForFormItems(tErrors).password}
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
