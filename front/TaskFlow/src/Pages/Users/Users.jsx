import { Space, Table, Tag } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import ActionsBlock from '../../Components/Actions';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { removeUser } from '../../app/Reducers/userSlicer';

const Users = () => {
  const data = useSelector((state) => state.users);
  const location = useLocation();
  const user = location.state?.item;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const columns = [
    {
      title: 'Username',
      dataIndex: 'name',
      key: 'name',
      width: 'auto',
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
            // onView={item => state={item}}
            onEdit={(item) => {
              navigate(`/users/${item.id}`, { state: { item, editMode: true } });
            }}
            onDelete={(item) => dispatch(removeUser(item.id))}
            onCopy={(item) => console.log('Copy user:', item)}
            onLock={(item) => console.log('Lock user:', item)}
          />
        </Space>
      ),
    },
  ];

  return (
    <div className="users" style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* <Button type="primary" style={{ alignSelf: "flex-start" }} onClick={handleClick}>➕ New project</Button> */}

      <Table columns={columns} dataSource={data} rowKey="id" />
    </div>
  );
};

export default Users;
