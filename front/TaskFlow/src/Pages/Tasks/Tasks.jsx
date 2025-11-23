import { Layout, Menu, theme, Button, Space, Table, Tag } from 'antd';
import { useUserModal } from '../../app/hooks/useUserModal';
import { useSelector } from 'react-redux';
import ActionsBlock from '../../Components/Actions';
import { useNotify } from '../Notiifcations/NotificationsPopUp';

const Tasks = () => {
  const data = useSelector((state) => state.task);
  const { open } = useUserModal();

  const handleClick = () => {
    open('taskForm', 'New Task');
  };

  const columns = [
    {
      title: 'Task ID',
      dataIndex: 'id',
      key: 'id',
      width: 'auto',
    },

    {
      title: 'Task',
      dataIndex: 'taskSummary',
      key: 'taskSummary',
      render: (text) => <a>{text}</a>,
    },

    {
      title: 'Project',
      dataIndex: 'taskProject',
      key: 'taskProject',
      width: 'auto',
      render: (text) => <a>{text}</a>,
    },

    {
      title: 'Tags',
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
      title: 'Action',
      key: 'action',
      render: (_, record) => <ActionsBlock item={record} />,
    },
  ];
  return (
    <div className="tasks" style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <Button type="primary" style={{ alignSelf: 'flex-start' }} onClick={handleClick}>
        ➕ New task
      </Button>
      <Table columns={columns} dataSource={data} rowKey="id" />
    </div>
  );
};

export default Tasks;
