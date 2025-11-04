import { Tabs } from 'antd';
import { useNavigate, useLocation, Outlet } from 'react-router-dom';
import BackButton from '../../Components/BackButton';

const tabItems = [
  { label: 'General', key: 'general', path: '/settings' },
  { label: 'Groups', key: 'groups', path: '/settings/groups' },
  { label: 'Roles', key: 'roles', path: '/settings/roles' },
  { label: 'Users', key: 'users', path: '/settings/users' },
];

const Settings = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const activeKey = tabItems.find(tab => location.pathname.includes(tab.key))?.key || 'general';

  return (
    <>
     <BackButton />
      <Tabs
        activeKey={activeKey}
        onChange={(key) => {
          const tab = tabItems.find(t => t.key === key);
          if (tab) navigate(tab.path);
        }}
        items={tabItems.map(({ label, key }) => ({ label, key }))}
      />
      <Outlet />
    </>
  );
};

export default Settings;