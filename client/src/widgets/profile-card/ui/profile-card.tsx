import { ChangeEvent, useState } from 'react';
import { Descriptions, Button, Input, Form, Avatar } from 'antd';
import { IProfileCardProps } from '../model/profile-card.types';
import { useTranslation } from 'react-i18next';
import { getProfileVendorFields, getProfileCardFields } from '../lib/profile-card.lib';
import { StyledButtons, StyledCard } from './profile-card.styles';
import { useLoginStore } from 'features/auth';
import { IVendor } from 'entities/vendor';
import { ICustomer } from 'entities/customer';

export const ProfileCard = (props: IProfileCardProps) => {
  const { title, user, callback } = props;
  const [isEditing, setIsEditing] = useState(false);
  const [editableUser, setEditableUser] = useState<IVendor | ICustomer>(user);
  const [form] = Form.useForm();
  const { role } = useLoginStore();
  const { t } = useTranslation();
  const profileCardFields = getProfileCardFields(t, editableUser).filter((field) => field.name);
  const profileVendorFields = getProfileVendorFields(
    t,
    'company_name' in editableUser && 'address' in editableUser ? editableUser : null,
  );

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditableUser({ ...editableUser, [name]: value });
  };

  const handleInputAddressChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if ('address' in editableUser) {
      setEditableUser({
        ...editableUser,
        address: {
          ...editableUser.address,
          [name]: value,
        },
      });
    }
  };

  const toggleEditMode = () => {
    setIsEditing((prevIsEditing) => {
      if (prevIsEditing) {
        setEditableUser(user);
      }
      return !prevIsEditing;
    });
  };

  const saveChanges = () => {
    form
      .validateFields()
      .then(() => {
        callback(editableUser);
        setIsEditing(false);
      })
      .catch((errorInfo) => {
        console.log('Validation Failed:', errorInfo);
      });
  };

  return (
    <StyledCard title={title} id={`user_id_${user._id}_card`}>
      <Avatar size={64}>
        {editableUser.first_name[0]}
        {editableUser.last_name[0]}
      </Avatar>
      <Form form={form}>
        <Descriptions layout="vertical">
          {profileCardFields.map((field) => (
            <Descriptions.Item label={field.label} key={field.name} span={1}>
              {isEditing ? (
                <Form.Item name={field.name} initialValue={field.value} rules={field.rules}>
                  <Input value={field.value} name={field.name} onChange={handleInputChange} />
                </Form.Item>
              ) : (
                field.value
              )}
            </Descriptions.Item>
          ))}
          {role === 'Vendor' &&
            profileVendorFields.map((field) => (
              <Descriptions.Item label={field.label} key={field.name} span={1}>
                {isEditing ? (
                  <Form.Item name={field.name} initialValue={field.value}>
                    <Input
                      value={field.value}
                      name={field.name}
                      onChange={handleInputAddressChange}
                    />
                  </Form.Item>
                ) : (
                  field.value || `${t('Не указан', { field: field.label })}`
                )}
              </Descriptions.Item>
            ))}
        </Descriptions>
      </Form>
      <StyledButtons>
        <Button type={isEditing ? 'default' : 'primary'} onClick={toggleEditMode}>
          {isEditing ? t('Отмена') : t('Редактировать')}
        </Button>
        {isEditing && (
          <Button type="primary" onClick={saveChanges}>
            {t('Сохранить')}
          </Button>
        )}
      </StyledButtons>
    </StyledCard>
  );
};
