//SettingsGroups.jsx

import { Button, Flex, Table, Space } from 'antd';
import { useUserModal } from '../../app/hooks/useUserModal';
import { useSelector } from 'react-redux';
import ActionsBlock from '../../Components/Actions';
import { Outlet, useParams, useLocation } from 'react-router-dom';

const SettingsGroups = () => {
  const location = useLocation();
  const { open } = useUserModal();
  const { groupID } = useParams();
  const groups = useSelector((state) => state.groups || []);
  const group = location.state?.item || groups.find((g) => String(g.id) === groupID);

  const handleClick = () => {
    open('groupForm', 'Create group');
  };

  const columns = [
    {
      title: 'Group',
      dataIndex: 'groupName',
      key: 'groupName',
      width: 'auto',
    },
    {
      title: 'Description',
      dataIndex: 'groupDescription',
      key: 'groupDescription',
    },
    {
      title: 'Role',
      key: 'role',
      dataIndex: 'role',
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <ActionsBlock item={record} />
        </Space>
      ),
    },
  ];
  return (
    <div className="groups" style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <Button type="primary" style={{ alignSelf: 'flex-start' }} onClick={handleClick}>
        ➕ New group
      </Button>

      <Table columns={columns} dataSource={groups} rowKey="id" />
      <Outlet />
    </div>
  );
};

export default SettingsGroups;
