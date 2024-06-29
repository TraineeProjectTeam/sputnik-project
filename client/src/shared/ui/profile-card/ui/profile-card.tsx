import { ChangeEvent, useState } from "react";
import { Avatar, Card, Descriptions, Button, Row, Col, Input, Form } from "antd";
import { IProfileCardProps, IUserProfile } from "../model/profile-card.types";
import { Rule } from "antd/es/form";
import { useTranslation } from "react-i18next";

export const ProfileCard = (props: IProfileCardProps) => {
  const { title, user, callback } = props;
  const [isEditing, setIsEditing] = useState(false);
  const [editableUser, setEditableUser] = useState<IUserProfile>(user);
  const [form] = Form.useForm();
  const { t } = useTranslation(['common', 'errors', 'user']);

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
          [name]: value
        }
      });
    }
  }

  const toggleEditMode = () => {
    setIsEditing((prevIsEditing) => {
      if (prevIsEditing) {
        setEditableUser(user);
      }
      return !prevIsEditing;
    });
  };

  const saveChanges = () => {
    form.validateFields()
      .then(() => {
        callback(editableUser);
        setIsEditing(false);
      })
      .catch((errorInfo) => {
        console.log('Validation Failed:', errorInfo);
      });
  };

  const fields: { label: string, name: string, value?: string, rules: Rule[] }[] = [
    {
      label: t("user:first_name"),
      name: "first_name",
      value: editableUser.first_name,
      rules: [{ required: true, message: t('please_input_first_name') }]
    },
    {
      label: t("user:last_name"),
      name: "last_name",
      value: editableUser.last_name,
      rules: [{ required: true, message: t('please_input_last_name') }]
    },
    {
      label: t("user:email"),
      name: "email",
      value: editableUser.email,
      rules: [{
        required: true,
        type: 'email',
        message: t('please_input_valid_email')
      }]
    },
    {
      label: t("user:phone_number"),
      name: "phone_number",
      value: editableUser.phone_number,
      rules: [
        {
          required: true,
          message: t('please_input_phone_number')
        },
        {
          pattern: /^\+\d{10,15}$/,
          message: t('phone_number_format')
        }
      ]
    },
    {
      label: t("user:company_name"),
      name: "company_name",
      value: editableUser.company_name,
      rules: [
        {
          required: true,
          message: t('please_input_company')
        }
      ]
    },
  ];

  const addressFields = [
    {
      label: t("user:street_name"),
      name: "street_name",
      value: editableUser.address?.street_name
    },
    {
      label: t("user:street_number"),
      name: "street_number",
      value: editableUser.address?.street_number,
    },
    {
      label: t("user:city"),
      name: "city",
      value: editableUser.address?.city
    },
    {
      label: t("user:region"),
      name: "region",
      value: editableUser.address?.region
    },
  ];

  return (
    <Card title={title} id={`user_id_${user.id}_card`}>
      <Avatar size={64} style={{ marginBottom: 16 }}>
        {editableUser.first_name[0]}{editableUser.last_name[0]}
      </Avatar>
      <Form form={form}>
        <Descriptions layout="vertical">
          {fields.map((field) => (
            (field.name !== 'company_name' || editableUser.company_name) && (
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
                      onChange={handleInputChange}
                    />
                  </Form.Item> :
                  field.value
                }
              </Descriptions.Item>
            )))}
          {editableUser.address && addressFields.map(field => (
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
                    onChange={handleInputAddressChange}
                  />
                </Form.Item> :
                field.value
              }
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
            {isEditing ? t("common:cancel") : t("common:edit")}
          </Button>
        </Col>
        <Col>
          {isEditing &&
            <Button
              type='primary'
              onClick={saveChanges}
            >
              {t("common:save")}
            </Button>
          }
        </Col>
      </Row>
    </Card >
  );
};