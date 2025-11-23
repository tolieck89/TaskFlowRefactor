import { Layout, Menu, theme, Button, Space, Table, Tag } from 'antd';
import { useUserModal } from '../../app/hooks/useUserModal';
import { useDispatch, useSelector } from 'react-redux';
import { markAsRead } from '../../app/Reducers/NotificationsSlicer';

const Notifications = () => {
  const currentUser = useSelector((state) => state.auth.authUser);
  const dispatch = useDispatch();

  const notifications = useSelector((state) => state.notifications);

  const content = () =>  Array.isArray(notifications) && notifications.filter((not) => not.to.includes(currentUser));
  console.log(content())
       


  const columns = [

    {
      title: 'Event type',
      dataIndex: 'type',
      key: 'type',
      width: 'auto',
    },
    {
      title: 'Summary',
      dataIndex: 'entityId',
      key: 'entityId',
      width: 'auto',
    },
    {
      title: 'Changed By',
      dataIndex: 'by',
      key: 'by',
      width: 'auto',
    },
    {
      title: 'Changed At',
      dataIndex: 'createdAt',
      key: 'createdAt',
      width: 'auto',
    },







  ]





  return (
      <div className="tasks" style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <Table columns={columns} dataSource={content()} rowKey="id" />
    </div>
  )
};

export default Notifications;
