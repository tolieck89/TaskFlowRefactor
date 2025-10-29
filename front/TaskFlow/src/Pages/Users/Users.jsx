import React from 'react'
import { Layout, Menu, theme, Button, Space, Table, Tag } from "antd"; 
import { useUserModal } from '../../app/hooks/useUserModal';
import { useSelector } from 'react-redux';
import ActionsBlock from '../../Components/Actions';
import { DeleteOutlined, EditOutlined, EyeOutlined, CopyOutlined, LockOutlined } from '@ant-design/icons';
import UserCard from './UsersSettings';


const Users = () => {
  const data = useSelector((state) => state.users);
  const {open} = useUserModal();

  
  const handleClick = () => {
    open("newProject", "New Project");
  }

  const handleonView = (user) => {
    open("userCard", "userCard", user )
  }

  

  const columns = [
      {
    title: 'Username',
    dataIndex: 'name',
    key: 'name',
    width: "auto"
  },
  {
    title: 'Email',
    dataIndex: 'email',
    key: 'email',
  },

  {
    title: 'Groups',
    dataIndex: 'groups',
    key: 'groups',
  },
  {
    title: 'Role',
    key: 'role',
    dataIndex: 'role',
  },
  {
    title: 'Allowed projects',
    key: 'allowedProjects',
    dataIndex: 'allowedProjects',
  },
  {
    title: 'Action',
    key: 'action',
    render: (_, record) => (
      <Space size="middle">
   
        <ActionsBlock
            item={record}
        onView={item => handleonView(item)}
        onEdit={(item) => console.log('Edit user:', item)}
        onDelete={(item) => console.log('Delete user:', item)}
        onCopy={(item) => console.log('Copy user:', item)}
        onLock={(item) => console.log('Lock user:', item)}
        />
        
      </Space>
    ),
  },
];


  return (
    <div className='users' style={{ display: "flex", flexDirection:"column", gap: "24px"}}>
      {/* <Button type="primary" style={{ alignSelf: "flex-start" }} onClick={handleClick}>➕ New project</Button> */}

      <Table columns={columns} dataSource={data}  rowKey="id"/>



    </div>
  )
}

export default Users
