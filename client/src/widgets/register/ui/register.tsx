import { Button, Form, Input, Radio, RadioChangeEvent, Spin, Typography, message } from 'antd';
import { useCustomerStore } from 'entities/customer';
import { useVendorStore } from 'entities/vendor';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ButtonLinkStyled, ButtonWrapperStyled, rulesForFormItems } from 'shared/ui/forms';
import { WrapperStyled } from './register.styles';
import { useTranslation } from 'react-i18next';
import { saveAccessToken, saveRole, saveUserData } from 'shared/lib';
import { EnumRoutesName } from 'shared/config';
import {
  IRegisterDetails,
  IRegisterFormValues,
  registrationRequest,
  useLoginStore,
} from 'features/auth';
import { initialRegisterFormValues } from '../model/register.constants';

export const RegisterForm = () => {
  const [form] = Form.useForm();
  const [messageApi, contextHolder] = message.useMessage();
  const navigate = useNavigate();
  const [selectedRole, setSelectedRole] = useState<'Customer' | 'Vendor'>('Customer');

  const [loading, setLoading] = useState(false);
  const { t } = useTranslation();

  const setCustomer = useCustomerStore((state) => state.setCustomer);
  const setVendor = useVendorStore((state) => state.setVendor);
  const setIsLogin = useLoginStore((state) => state.setIsLogin);
  const setRole = useLoginStore((state) => state.setRole);

  const onChangeRole = (e: RadioChangeEvent) => {
    setSelectedRole(e.target.value);
  };

  const onSubmit = async (values: IRegisterFormValues) => {
    try {
      const dataForRequest: IRegisterDetails =
        values.role === 'Customer'
          ? values
          : {
              first_name: values.first_name,
              last_name: values.last_name,
              phone_number: values.phone_number,
              email: values.email,
              role: values.role,
              password: values.password,
              address: {
                region: values.region || '',
                city: values.city || '',
                street_name: values.street_name || '',
                street_number: values.street_number || '',
              },
              company_name: values.company_name || '',
            };
      setLoading(true);
      const data = (await registrationRequest(dataForRequest)).data;
      switch (values.role) {
        case 'Customer':
          setCustomer(data.user, false);
          setTimeout(() => navigate(EnumRoutesName.PROFILE_CUSTOMER), 1000);
          break;
        case 'Vendor':
          if ('company_name' in data.user && 'address' in data.user) {
            setVendor(data.user, false);
            setTimeout(() => navigate(EnumRoutesName.PROFILE_VENDOR), 1000);
            break;
          }
      }
      saveAccessToken(data.access_token);
      saveUserData(data.user);
      saveRole(values.role);
      setIsLogin(true);
      setRole(values.role);
      messageApi.open({
        type: 'success',
        content: t('Регистрация прошла успешна! Вы будете перенаправлены на страницу входа.'),
      });
    } catch (error) {
      showError(t('Не удалось совершить попытку регистрации! Пожалуйста, попробуйте еще раз.'));
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
    navigate(EnumRoutesName.LOGIN);
  };

  return (
    <WrapperStyled>
      <Typography.Title>{t('Зарегистрироваться')}</Typography.Title>
      <Form
        initialValues={initialRegisterFormValues}
        form={form}
        name="register-form"
        onFinish={onSubmit}
        autoComplete="on"
        layout="vertical"
      >
        {contextHolder}
        <ButtonLinkStyled type="link" onClick={handleLinkClick}>
          {t('Уже есть аккаунт? Войдите!')}
        </ButtonLinkStyled>
        <Form.Item
          label={t('Имя')}
          name="first_name"
          rules={rulesForFormItems(t).firstName}
          validateTrigger="onBlur"
        >
          <Input placeholder="Иван" />
        </Form.Item>
        <Form.Item
          label={t('Фамилия')}
          name="last_name"
          rules={rulesForFormItems(t).lastName}
          validateTrigger="onBlur"
        >
          <Input placeholder="Иванов" />
        </Form.Item>
        <Form.Item
          label={t('Номер телефона')}
          name="phone_number"
          rules={rulesForFormItems(t).phone}
          validateTrigger="onBlur"
        >
          <Input type="tel" placeholder="+12345678901" />
        </Form.Item>
        <Form.Item
          label={t('Адрес электронной почты')}
          name="email"
          rules={rulesForFormItems(t).email}
          validateTrigger="onBlur"
        >
          <Input type="email" placeholder="mail@mail.ru" />
        </Form.Item>
        {selectedRole === 'Vendor' && (
          <>
            <Form.Item
              label={t('Компания')}
              name="company_name"
              rules={rulesForFormItems(t).company_name}
              validateTrigger="onBlur"
            >
              <Input placeholder="Google" />
            </Form.Item>
            <Form.Item
              label={t('Регион')}
              name="region"
              rules={rulesForFormItems(t).region}
              validateTrigger="onBlur"
            >
              <Input placeholder="Томская область" />
            </Form.Item>
            <Form.Item
              label={t('Город')}
              name="city"
              rules={rulesForFormItems(t).city}
              validateTrigger="onBlur"
            >
              <Input placeholder="Томск" />
            </Form.Item>
            <Form.Item
              label={t('Улица')}
              name="street_name"
              rules={rulesForFormItems(t).street_name}
              validateTrigger="onBlur"
            >
              <Input placeholder="ул.Ленина" />
            </Form.Item>
            <Form.Item
              label={t('Номер дома')}
              name="street_number"
              rules={rulesForFormItems(t).street_number}
              validateTrigger="onBlur"
            >
              <Input placeholder="2а" />
            </Form.Item>
          </>
        )}
        <Form.Item
          label={t('Пароль')}
          name="password"
          rules={rulesForFormItems(t).password}
          validateTrigger="onBlur"
        >
          <Input.Password autoComplete="on" />
        </Form.Item>
        <Form.Item
          name="role"
          label={t('Зарегистрироваться как')}
          rules={rulesForFormItems(t).role}
        >
          <Radio.Group onChange={onChangeRole}>
            <Radio value="Customer">{t('Покупатель')}</Radio>
            <Radio value="Vendor">{t('Продавец')}</Radio>
          </Radio.Group>
        </Form.Item>
        <Form.Item>
          <ButtonWrapperStyled>
            {loading && <Spin />}
            <Button type="primary" htmlType="submit" disabled={loading}>
              {t('Зарегистрироваться')}
            </Button>
          </ButtonWrapperStyled>
        </Form.Item>
      </Form>
    </WrapperStyled>
  );
};
