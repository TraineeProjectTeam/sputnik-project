import { Button, Input, Radio, Spin, message } from 'antd';
import Form from 'antd/es/form';
import { ILoginPhoneDetails } from 'features/login-forms/model/login.types';
import { rulesForFormItems } from 'shared/ui/forms/model/form-rules';
import useLoginStore from '../model/login.store';
import { useNavigate } from 'react-router-dom';
import { ButtonWrapperStyled } from 'shared/ui/forms/ui/form.styles';

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
      <Form.Item label="Номер телефона" name="phone_number" rules={rulesForFormItems.phone}>
        <Input type="tel" placeholder="+12345678901" />
      </Form.Item>
      <Form.Item label="Пароль" name="password" rules={rulesForFormItems.password}>
        <Input.Password autoComplete="on" />
      </Form.Item>
      <Form.Item name="role" label="Войти как:">
        <Radio.Group>
          <Radio value="Customer">Покупатель</Radio>
          <Radio value="Vendor">Продавец</Radio>
        </Radio.Group>
      </Form.Item>
      <Form.Item>
        <ButtonWrapperStyled>
          {loading && <Spin />}
          <Button type="primary" htmlType="submit" disabled={loading}>
            Войти
          </Button>
        </ButtonWrapperStyled>
      </Form.Item>
    </Form>
  );
};
