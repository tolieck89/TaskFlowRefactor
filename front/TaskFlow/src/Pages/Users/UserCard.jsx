import { useState, useEffect, use } from 'react';
import { Badge, Descriptions,  Switch, Form, Input, Button, Flex, Segmented}  from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import {editUser} from "./userSlicer";
import { useLocation } from 'react-router-dom';
import BackButton from '../../Components/BackButton';


const UserCard = () => {
  const location = useLocation();
  const user = location.state?.item;
const initialEdit = location.state?.editMode || false;
const [form] = Form.useForm();


  const boxStyle = {
marginBottom: 24,
  width: '100%',
  // height: auto,
};
 
  const items = (user) => {
    const status = user.status;
const content = () => !status ?  <Badge status="success" text="Active" /> :  <Badge status="error" text="Locked" />

  return  [
  {
    key: '1',
    label: 'User ID',
    children: user.id,
  },
  {
    key: '2',
    label: 'Username',
    children: user.name,
  },
  {
    key: '3',
    label: 'Reg date',
    children: user.regdate,
  },
  {
    key: '4',
    label: 'Email',
    children: user.email,
  },
  {
    key: '5',
    label: 'Real name',
    children: user.realName,
  },
  {
    key: '6',
    label: 'Allowed projects',
    span: 2,
    children: user.allowedProjects,
  },
  {
    key: '7',
    label: 'Status',
    // span: 3,
    children: content(),
  },
  {
    key: '8',
    label: 'Role',
    children: user.role,
  },
  {
    key: '9',
    label: 'Role',
    children: user.role,
  },
  {
    key: '10',
    label: 'User Groups',
    children: user.group,
  },
  {
    key: '11',
    label: 'Menarche at',
    children: user.menarche,
  },
  {
    key: '12',
    label: 'Gender',
    children: user.gender,
  },
  {
    key: '13',
    label: 'Password',
    children: user.password,
  },
 
] }

  const [editMode, setEditMode] = useState(false);
  const dispatch = useDispatch();

  const handleSubmit = (values) => {
      if (!user || !user.id) {
    console.warn("User is missing or invalid");
    return;
  }

    dispatch(editUser({ id: user.id, ...values }));
    setEditMode(false);
  };

 if (!user) return <div>❌ User not found</div>;


  return (
    <>
       <Flex style={boxStyle} justify='space-between' align='center'>
            <BackButton />
             <Switch
  checked={editMode}
  onChange={setEditMode}
 
  checkedChildren="Edit" unCheckedChildren="View"
/>
     
  
 </Flex>

      <h2>{user.name}</h2>
{!editMode ? (
  <Descriptions
    title="User Info"
    layout="vertical"
    bordered
    items={items(user)}
  />
) : (
  <Form form={form} onFinish={handleSubmit} layout="vertical">
    <Form.Item name="name" label="Username">
      <Input />
    </Form.Item>
    <Form.Item name="email" label="Email">
      <Input />
    </Form.Item>
    <Form.Item name="realName" label="realName">
      <Input />
    </Form.Item>
    <Button type="primary" htmlType="submit">Save</Button>
  </Form>
)}


    </>
)
};
export default UserCard;