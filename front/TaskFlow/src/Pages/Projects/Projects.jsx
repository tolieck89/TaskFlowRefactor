import React from 'react'
import { Layout, Menu, theme, Button, Space, Table, Tag } from "antd"; 
import { useUserModal } from '../../app/hooks/useUserModal';
import { useSelector } from 'react-redux';


const Projects = () => {

  const data = useSelector((state) => state.project);
  const {open} = useUserModal();
  const normalizedData = data.map(item => ({
  ...item.project,
  id: item.id,
}));
  
  const handleClick = () => {
    open("newProject", "New Project");
  }

  const columns = [
      {
    title: 'Project key',
    dataIndex: 'key',
    key: 'key',
    width: "auto"
  },
  {
    title: 'Project name',
    dataIndex: 'name',
    key: 'name',
    render: text => <a>{text}</a>,
  },

  {
    title: 'Short description',
    dataIndex: 'description',
    key: 'description',
  },
  {
    title: 'Tags',
    key: 'issuetype',
    dataIndex: 'issuetype',
    render: (_, { issuetype }) => (
      <>
        {issuetype && issuetype.map(tag => {
          let color = tag.length > 5 ? 'geekblue' : 'green';
          
          return (
            <Tag color={color} key={tag}>
              {tag.toUpperCase()}
            </Tag>
          );
        })}
      </>
    ),
  },
  {
    title: 'Action',
    key: 'action',
    render: (_, record) => (
      <Space size="middle">
        <a>Details</a>
        <a>Edit</a>
        <a>Delete</a>
      </Space>
    ),
  },
];


  return (
    <div className='projects' style={{ display: "flex", flexDirection:"column", gap: "24px"}}>
      <Button type="primary" style={{ alignSelf: "flex-start" }} onClick={handleClick}>➕ New project</Button>

      <Table columns={columns} dataSource={normalizedData}  rowKey="id"/>
    </div>
  )
}

export default Projects;
