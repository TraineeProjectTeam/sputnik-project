import { ChangeEvent, useState } from 'react';
import { Descriptions, Button, Input, Form, Avatar } from 'antd';
import { IProfileCardProps, IUserProfile } from '../model/profile-card.types';
import { useTranslation } from 'react-i18next';
import { getProfileCardAddressFields, getProfileCardFields } from '../lib/profile-card.lib';
import { StyledButtons, StyledCard } from './profile-card.styles';

export const ProfileCard = (props: IProfileCardProps) => {
  const { title, user, callback } = props;
  const [isEditing, setIsEditing] = useState(false);
  const [editableUser, setEditableUser] = useState<IUserProfile>(user);
  const [form] = Form.useForm();
  const { t: tErr } = useTranslation('errors');
  const { t: tCom } = useTranslation('common');
  const { t: tUsr } = useTranslation('user');
  const profileCardFields = getProfileCardFields(tErr, tUsr, editableUser).filter(
    (field) => field.value,
  );
  const profileCardAddressFields = getProfileCardAddressFields(tUsr, editableUser);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditableUser({ ...editableUser, [name]: value });
  };

  const handleInputAddressChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (editableUser.address) {
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
          {profileCardAddressFields.map((field) => (
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
                field.value || `${tUsr('Не указан', { field: field.label })}`
              )}
            </Descriptions.Item>
          ))}
        </Descriptions>
      </Form>
      <StyledButtons>
        <Button type={isEditing ? 'default' : 'primary'} onClick={toggleEditMode}>
          {isEditing ? tCom('Отмена') : tCom('Редактировать')}
        </Button>
        {isEditing && (
          <Button type="primary" onClick={saveChanges}>
            {tCom('Сохранить')}
          </Button>
        )}
      </StyledButtons>
    </StyledCard>
  );
};
