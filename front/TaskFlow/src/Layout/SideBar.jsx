import { Layout, Menu, theme, Badge } from 'antd';
import {
  UserOutlined,
  LaptopOutlined,
  NotificationOutlined,
  TeamOutlined,
} from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

const { Sider } = Layout;

const SideBar = () => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const username = useSelector((state) => state.auth.authUser);

  return (
    <Sider width={200}>
      <Menu
        mode="inline"
        theme="dark"
        defaultSelectedKeys={['1']}
        style={{ height: '100%', borderRight: 0 }}
        items={[
          { key: '1', icon: <UserOutlined />, label: <Link to="/user-profile">{username}</Link> },
          { key: '2', icon: <TeamOutlined />, label: <Link to="/users">Users</Link> },
          { key: '3', icon: <LaptopOutlined />, label: <Link to="/projects">Projects</Link> },
          {
            key: '4',

            icon: (
              <Badge size="big" count={2}>
                {' '}
                <NotificationOutlined />{' '}
              </Badge>
            ),
            label: <Link to="/notifications">Notifications</Link>,
          },
        ]}
      />
    </Sider>
  );
};

export default SideBar;
