import { useState, useEffect } from 'react';
import { Badge, Descriptions,  Switch, Form, Input, Button, Flex, Checkbox, Radio, DatePicker, InputNumber }  from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import {editUser} from "./userSlicer";
import { useLocation } from 'react-router-dom';
import BackButton from '../../Components/BackButton';


const UserCard = () => {

  const location = useLocation();
  const initialEdit = location.state?.editMode || false;
  const [form] = Form.useForm();
  const [user, setUser] = useState(location.state?.item || {});

  useEffect(() => {
    if (user) {
      form.setFieldsValue({
        name: user.name,
        email: user.email,
        role: user.role,
        groups: user.groups,
        allowedProjects: user.allowedProjects,
        realName: user.realName,
        isLocked: user.isLocked,
        gender: user.gender,
      });
    }
  }, [user]);

  const boxStyle = {
    marginBottom: 24,
    width: '100%',
    // height: auto,
  };
 
  const items = (user) => {
    const status = user.isLocked;
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
    label: 'Gender',
    children: user.gender,
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
    key: '13',
    label: 'Password',
    children: user.password,
  },
 
] }

  const [editMode, setEditMode] = useState(false);
  const dispatch = useDispatch();

const handleSubmit = (values) => {
  const updatedUser = {
    ...user,
    ...values,
  };
  dispatch(editUser(updatedUser));
  setUser(updatedUser); 
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
    <Form form={form} onFinish={handleSubmit} layout="vertical"
  
  >
    <Form.Item name="name" label="Username">
      <Input />
    </Form.Item>
    <Form.Item name="email" label="Email">
      <Input />
    </Form.Item>
    <Form.Item name="realName" label="Real Name">
      <Input />
    </Form.Item>
    <Form.Item name="isLocked" label="Lokced" valuePropName="checked">
     <Checkbox>isLocked</Checkbox>
    </Form.Item>
      <Form.Item label="Gender" name='gender'>
          <Radio.Group>
            <Radio value="Male"> Male </Radio>
            <Radio value="Female"> Female </Radio>
            <Radio value="Desk"> Desk </Radio>
          </Radio.Group>
        </Form.Item>
               <Form.Item name='menarche' label="Menarche at">
        <DatePicker />
      </Form.Item> 
          <Form.Item name= 'role' label="Choice access level" tooltip="1 - watcher, 2 - user, 3 - admin">
      <    InputNumber min={0} max={3} defaultValue={1}/>
    </Form.Item>
    
    <Descriptions layout="vertical" bordered>
  <Descriptions.Item label="User ID">{user.id}</Descriptions.Item>
  <Descriptions.Item label="Registered">{new Date(user.regdate).toLocaleString()}</Descriptions.Item>
 
</Descriptions>
    <Button type="primary" htmlType="submit">Save</Button>
  </Form>
)}
  </>
)
};


export default UserCard;