import { ChangeEvent, useState } from "react";
import { Avatar, Card, Descriptions, Button, Row, Col, Input, Form, } from "antd";
import { IProfileCardProps, IUserProfile } from "../model/profile-card.types";
import { useTranslation } from "react-i18next";
import { useLocation } from "react-router-dom";
import { getProfileCardAddressFields, getProfileCardFields, } from "../lib/get-profile-links";
import { EnumRoutesName } from "shared/config";

export const ProfileCard = (props: IProfileCardProps) => {
  const { title, user, callback } = props;
  const [isEditing, setIsEditing] = useState(false);
  const [editableUser, setEditableUser] = useState<IUserProfile>(user);
  const [form] = Form.useForm();
  const location = useLocation()
  const { t: tErr } = useTranslation('errors');
  const { t: tCom } = useTranslation('common');
  const { t: tUsr } = useTranslation('user');

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
    <>
      <Card title={title} id={`user_id_${user._id}_card`}>
        <Avatar size={64} style={{ marginBottom: 16 }}>
          {editableUser.first_name[0]}
          {editableUser.last_name[0]}
        </Avatar>

        <Form form={form}>
          <Descriptions layout="vertical">
            {getProfileCardFields(tErr, tUsr, editableUser)
              .filter(field => location.pathname === EnumRoutesName.PROFILE_CUSTOMER ? field.name !== 'company_name' : true)
              .map((field) => (
                <Descriptions.Item
                  label={field.label}
                  key={field.name}
                >
                  {isEditing ?
                    <Form.Item
                      name={field.name}
                      initialValue={field.value}
                      rules={field.rules}
                      style={{ marginBottom: 8 }}
                    >
                      <Input
                        value={field.value}
                        name={field.name}
                        onChange={handleInputChange} />
                    </Form.Item> :
                    field.value}
                </Descriptions.Item>
              ))}
            {getProfileCardAddressFields(tUsr, editableUser)
              .map(field => (
                <Descriptions.Item
                  label={field.label}
                  key={field.name}
                >
                  {isEditing ?
                    <Form.Item
                      style={{ marginBottom: 8 }}
                      name={field.name}
                      initialValue={field.value}
                    >
                      <Input
                        value={field.value}
                        name={field.name}
                        onChange={handleInputAddressChange} />
                    </Form.Item> :
                    field.value || `${tUsr('Не указан', { field: field.label })}`}
                </Descriptions.Item>
              ))}
          </Descriptions>
        </Form>
        <Row gutter={4}>
          <Col className="gutter-row">
            <Button
              type={isEditing ? 'default' : 'primary'}
              onClick={toggleEditMode}
            >
              {isEditing ? tCom("Отмена") : tCom("Редактировать")}
            </Button>
          </Col>
          <Col>
            {isEditing &&
              <Button
                type='primary'
                onClick={saveChanges}
              >
                {tCom("Сохранить")}
              </Button>}
          </Col>
        </Row>
      </Card></>
  );
};
