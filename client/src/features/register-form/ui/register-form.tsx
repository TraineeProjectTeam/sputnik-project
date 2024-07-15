import { Button, Form, Input, Radio, Spin, Typography, message } from 'antd';
import { useCustomerStore } from 'entities/customer';
import { useVendorStore } from 'entities/vendor';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from 'shared/api';
import { rulesForFormItems } from 'shared/ui/forms/model/form-rules';
import { IRegisterDetails, IResponseRegister } from '../model/register.types';
import { ButtonLinkStyled, ButtonWrapperStyled } from 'shared/ui/forms/ui/form.styles';
import { WrapperStyled } from './register-form.styles';
import { useTranslation } from 'react-i18next';
import { saveAccessToken, saveRole, saveUserData } from 'shared/lib';
import useLoginStore from 'features/login-forms/model/login.store';

export const RegisterForm = () => {
  const [form] = Form.useForm();
  const [messageApi, contextHolder] = message.useMessage();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [tErrors] = useTranslation('errors');
  const [tForm] = useTranslation('form');
  const [tCommon] = useTranslation('common');

  const setCustomer = useCustomerStore((state) => state.setCustomer);
  const setVendor = useVendorStore((state) => state.setVendor);
  const setIsLogin = useLoginStore((state) => state.setIsLogin);
  const setRole = useLoginStore((state) => state.setRole);

  const onSubmit = async (values: IRegisterDetails) => {
    try {
      setLoading(true);
      const { data } = await api.post<IResponseRegister>('/users/registration', values);
      switch (values.role) {
        case 'Customer':
          setCustomer(data.user, false);
          setTimeout(() => navigate('/profile-customer'), 1000);
          break;
        case 'Vendor':
          setVendor(data.user, false);
          setTimeout(() => navigate('/profile-vendor'), 1000);
          break;
      }
      saveAccessToken(data.access_token);
      saveUserData(data.user);
      saveRole(values.role);
      setIsLogin(true);
      setRole(values.role);
      messageApi.open({
        type: 'success',
        content: tForm('Регистрация прошла успешна! Вы будете перенаправлены на страницу входа.'),
      });
    } catch (error) {
      showError(
        tErrors('Не удалось совершить попытку регистрации! Пожалуйста, попробуйте еще раз.'),
      );
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

  const handleLinkClick = () => {
    navigate('/login');
  };

  return (
    <WrapperStyled>
      <Typography.Title>{tCommon('Зарегистрироваться')}</Typography.Title>
      <Form
        form={form}
        name="register-form"
        onFinish={onSubmit}
        autoComplete="on"
        layout="vertical"
      >
        {contextHolder}
        <ButtonLinkStyled type="link" onClick={handleLinkClick}>
          {tForm('Уже есть аккаунт? Войдите!')}
        </ButtonLinkStyled>
        <Form.Item
          label={tForm('Имя')}
          name="first_name"
          rules={rulesForFormItems(tErrors).firstName}
          validateTrigger="onBlur"
        >
          <Input placeholder="Иван" />
        </Form.Item>
        <Form.Item
          label={tForm('Фамилия')}
          name="last_name"
          rules={rulesForFormItems(tErrors).lastName}
          validateTrigger="onBlur"
        >
          <Input placeholder="Иванов" />
        </Form.Item>
        <Form.Item
          label={tForm('Номер телефона')}
          name="phone_number"
          rules={rulesForFormItems(tErrors).phone}
          validateTrigger="onBlur"
        >
          <Input type="tel" placeholder="+12345678901" />
        </Form.Item>
        <Form.Item
          label={tForm('Адрес электронной почты')}
          name="email"
          rules={rulesForFormItems(tErrors).email}
          validateTrigger="onBlur"
        >
          <Input type="email" placeholder="mail@mail.ru" />
        </Form.Item>
        <Form.Item
          label={tForm('Пароль')}
          name="password"
          rules={rulesForFormItems(tErrors).password}
          validateTrigger="onBlur"
        >
          <Input.Password autoComplete="on" />
        </Form.Item>
        <Form.Item name="role" label={tForm('Зарегистрироваться как')} rules={rulesForFormItems(tErrors).role}>
          <Radio.Group>
            <Radio value="Customer">{tCommon('Покупатель')}</Radio>
            <Radio value="Vendor">{tCommon('Продавец')}</Radio>
          </Radio.Group>
        </Form.Item>
        <Form.Item>
          <ButtonWrapperStyled>
            {loading && <Spin />}
            <Button type="primary" htmlType="submit" disabled={loading}>
              {tCommon('Зарегистрироваться')}
            </Button>
          </ButtonWrapperStyled>
        </Form.Item>
      </Form>
    </WrapperStyled>
  );
};
