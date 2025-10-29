import React, { useState, useEffect } from 'react';
import { EditOutlined, EllipsisOutlined, SettingOutlined } from '@ant-design/icons';
import { Badge, Descriptions,  Switch, Form, Input, Button } from 'antd';
import { useDispatch } from 'react-redux';

const items = [
  {
    key: '1',
    label: 'Username',
    children: 'Tolieck89',
  },
  {
    key: '2',
    label: 'Reg date',
    children: '21-02-25',
  },
  {
    key: '3',
    label: 'Email',
    children: 'gt-89@ya.ua',
  },
  {
    key: '4',
    label: 'Real name',
    children: 'Cotton Flower',
  },
  {
    key: '5',
    label: 'Allowed projects',
    span: 2,
    children: '2019-04-24 18:00:00',
  },
  {
    key: '6',
    label: 'Status',
    // span: 3,
    children: <Badge status="success" text="Active" />,
  },
  {
    key: '7',
    label: 'Role',
    children: 'Admin',
  },
 
];

const UserCard = ({user}) => {




    const [editMode, setEditMode] = useState(false);
  const [form] = Form.useForm();
  const dispatch = useDispatch();

  const handleSubmit = (values) => {
    dispatch(editUser({ uid: user.id, ...values }));
    setEditMode(false);
  };

    useEffect(() => {
  if (user) {
    form.setFieldsValue(user);
  }
}, [user]);

  return (
    <>  
      <Switch
        checked={editMode}
        onChange={setEditMode}
        style={{ marginBottom: 16 }}
      />

    {!editMode ? (
<Descriptions title="User Info" layout="vertical" bordered items={items} />) :
(
  <Form form={form} onFinish={handleSubmit} layout="vertical">
          <Form.Item name="name" label="Name">
            <Input />
          </Form.Item>
          <Form.Item name="email" label="Email">
            <Input />
          </Form.Item>
          <Form.Item name="role" label="Role">
            <Input />
          </Form.Item>
          <Button type="primary" htmlType="submit">Save</Button>
        </Form>

)}
 </>
  )
  
};
export default UserCard;