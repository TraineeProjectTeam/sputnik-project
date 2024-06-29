import { Button, Form, Input, Radio, Spin, Typography, message } from 'antd';
import { ICustomer } from 'entities/customer';
import { IVendor } from 'entities/vendor';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from 'shared/api';
import { rulesForFormItems } from 'shared/ui/forms/model/form-rules';
import { IRegisterDetails } from '../model/register.types';
import { ButtonWrapperStyled } from 'shared/ui/forms/ui/form.styles';
import { WrapperStyled } from './register-form.styles';

export const RegisterForm = () => {
  const [form] = Form.useForm();
  const [messageApi, contextHolder] = message.useMessage();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const onSubmit = async (values: IRegisterDetails) => {
    try {
      setLoading(true);
      await api.post<ICustomer | IVendor>('/users/registration', values);
      messageApi.open({
        type: 'success',
        content: 'Регистрация прошла успешна! Вы будете перенаправлены на страницу входа.',
      });
      setTimeout(() => navigate('/login'), 3000);
    } catch (error) {
      showError('Не удалось совершить попытку регистрации! Пожалуйста, попробуйте еще раз.');
    } finally {
      setLoading(false);
    }
  };

  const showError = (error: string) => {
    messageApi.open({
      type: 'error',
      content: error,
    });
  };

  return (
    <WrapperStyled>
      <Typography.Title>Зарегистрироваться</Typography.Title>
      <Form
        form={form}
        name="register-form"
        onFinish={onSubmit}
        autoComplete="on"
        layout="vertical"
      >
        {contextHolder}
        <Form.Item label="Имя" name="first_name" rules={rulesForFormItems.firstName}>
          <Input placeholder="Иван" />
        </Form.Item>
        <Form.Item label="Фамилия" name="last_name" rules={rulesForFormItems.lastName}>
          <Input placeholder="Иванов" />
        </Form.Item>
        <Form.Item label="Номер телефона" name="phone_number" rules={rulesForFormItems.phone}>
          <Input type="tel" placeholder="+12345678901" />
        </Form.Item>
        <Form.Item label="Адрес электронной почты" name="email" rules={rulesForFormItems.email}>
          <Input type="email" placeholder="mail@mail.ru" />
        </Form.Item>
        <Form.Item label="Пароль" name="password" rules={rulesForFormItems.password}>
          <Input.Password autoComplete="on" />
        </Form.Item>
        <Form.Item name="role" label="Зарегистрироваться как:">
          <Radio.Group>
            <Radio value="Customer">Покупатель</Radio>
            <Radio value="Vendor">Продавец</Radio>
          </Radio.Group>
        </Form.Item>
        <Form.Item>
          <ButtonWrapperStyled>
            {loading && <Spin />}
            <Button type="primary" htmlType="submit" disabled={loading}>
              Зарегистрироваться
            </Button>
          </ButtonWrapperStyled>
        </Form.Item>
      </Form>
    </WrapperStyled>
  );
};
