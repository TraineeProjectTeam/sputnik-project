import React, { useState } from "react";
import { Avatar, Card, Descriptions, Button, Input, Row, Col, } from "antd";
import { IProfileCardProps } from "../model/profile-card.types";

export const ProfileCard = (props: IProfileCardProps) => {
  const { title, user, callback } = props;
  const [isEditing, setIsEditing] = useState(false);
  const [editableUser, setEditableUser] = useState(user);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditableUser({ ...editableUser, [name]: value });
  };

  const toggleEditMode = () => {
    setIsEditing(!isEditing);
  };

  const saveChanges = () => {
    callback(editableUser)
    setIsEditing(false);
  };

  return (
    <Card title={title}>
      <Avatar size={64} style={{ marginBottom: 16 }}>
        {editableUser.first_name[0]}{editableUser.last_name[0]}
      </Avatar>
      <Descriptions column={2} layout="vertical">
        <Descriptions.Item label="Имя">
          {isEditing ? (
            <Input name="first_name" value={editableUser.first_name} onChange={handleInputChange} />
          ) : (
            editableUser.first_name
          )}
        </Descriptions.Item>
        <Descriptions.Item label="Фамилия">
          {isEditing ? (
            <Input name="last_name" value={editableUser.last_name} onChange={handleInputChange} />
          ) : (
            editableUser.last_name
          )}
        </Descriptions.Item>
        <Descriptions.Item label="Email">
          {isEditing ? (
            <Input name="email" value={editableUser.email} onChange={handleInputChange} />
          ) : (
            editableUser.email
          )}
        </Descriptions.Item>
        <Descriptions.Item label="Телефон">
          {isEditing ? (
            <Input name="phone_number" value={editableUser.phone_number} onChange={handleInputChange} />
          ) : (
            editableUser.phone_number
          )}
        </Descriptions.Item>
        {editableUser.company_name && (
          <Descriptions.Item label="Компания">
            {isEditing ? (
              <Input name="company_name" value={editableUser.company_name} onChange={handleInputChange} />
            ) : (
              editableUser.company_name
            )}
          </Descriptions.Item>
        )}
        {editableUser.address && (
          <Descriptions.Item label="Адрес">
            {isEditing ? (
              <>
                <Input name="street_name" value={editableUser.address.street_name} onChange={handleInputChange} />
                <Input name="street_number" value={editableUser.address.street_number} onChange={handleInputChange} />
                <Input name="city" value={editableUser.address.city} onChange={handleInputChange} />
                <Input name="region" value={editableUser.address.region} onChange={handleInputChange} />
              </>
            ) : (
              `${editableUser.address.street_name} ${editableUser.address.street_number}, ${editableUser.address.city}, ${editableUser.address.region}`
            )}
          </Descriptions.Item>
        )}
      </Descriptions>
      <Row gutter={4}>
        <Col className="gutter-row">
          <Button type={isEditing ? 'default' : 'primary'} onClick={toggleEditMode}>{isEditing ? "Cancel" : "Edit"}</Button>
        </Col>
        <Col>
          {isEditing && <Button type='primary' onClick={saveChanges}>Save</Button>}
        </Col>
      </Row>
    </Card>
  );
};