import React from 'react';
import { Layout, Menu, theme, Button, Space, Table, Tag } from 'antd';
import { useUserModal } from '../../app/hooks/useUserModal';
import { useSelector } from 'react-redux';
import ActionsBlock from '../../Components/Actions';

const Projects = () => {
  const data = useSelector((state) => state.projects);
  const { open } = useUserModal();

  const handleClick = () => {
    open('newProject', 'New Project');
  };

  const columns = [
    {
      title: 'Project key',
      dataIndex: 'key',
      key: 'key',
      width: 'auto',
    },
    {
      title: 'Project name',
      dataIndex: 'name',
      key: 'name',
      render: (text) => <a>{text}</a>,
    },

    {
      title: 'Short description',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: 'Issue types',
      key: 'issuetype',
      dataIndex: 'issuetype',
      render: (_, { issuetype }) => (
        <>
          {issuetype &&
            issuetype.map((tag) => {
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
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <ActionsBlock
          item={record}
          onEdit={(item) => console.log('Edit project', item)}
          onDelete={(item) => console.log('Delete project', item)}
          onCopy={(item) => console.log('Copy project', item)}
          onLock={(item) => console.log('Lock project', item)}
        />
      ),
    },
  ];

  return (
    <div className="projects" style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <Button type="primary" style={{ alignSelf: 'flex-start' }} onClick={handleClick}>
        ➕ New project
      </Button>

      <Table columns={columns} dataSource={data} rowKey="id" />
    </div>
  );
};

export default Projects;
