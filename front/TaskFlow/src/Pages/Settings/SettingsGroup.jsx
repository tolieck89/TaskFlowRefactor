import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useLocation, useParams, useNavigate } from 'react-router-dom';
import { Descriptions, Form, Button } from 'antd';

const SettingsGroup = () => {
  const location = useLocation();
  const { groupID } = useParams();
  const navigate = useNavigate();
  const groups = useSelector((state) => state.groups || []);

  const resolvedGroup =
    location.state?.item || groups.find((g) => String(g.id) === String(groupID)) || null;

  const [form] = Form.useForm();

  useEffect(() => {
    if (!resolvedGroup) return;
    form.setFieldsValue({
      groupName: resolvedGroup.groupName || '',
      role: resolvedGroup.role || '',
      allowedProjects: resolvedGroup.groupAllowedProjects || [],
      groupDescription: resolvedGroup.groupDescription || '',
    });
  }, [resolvedGroup, form]);

  const projects = useSelector((state) => state.projects);

  const allowedProjects = (allowed) => {
    let arr = [];
    for (let p of allowed) {
      console.log('Еллауд масив', allowed);
      console.log('П', p);
      for (let a of projects) {
        console.log('AAA', a);
        console.log(p == a.id);

        if (p == a.id) {
          arr.push(a.key);
        }
      }

      console.log(arr);
    }
    return arr;
  };

  const items = (resolvedGroup) => {
    return [
      {
        key: '1',
        label: 'Group ID',
        children: resolvedGroup.id,
      },
      {
        key: '2',
        label: 'Group',
        children: resolvedGroup.groupName,
      },
      {
        key: '3',
        label: 'Group role',
        children: resolvedGroup.role,
      },
      {
        key: '4',
        label: 'groupDescription',
        children: resolvedGroup.groupDescription,
      },
      {
        key: '5',
        label: 'Allowed projects',
        children: allowedProjects(resolvedGroup.groupAllowedProjects),
      },
    ];
  };

  if (!resolvedGroup) {
    console.warn('⚠️ Group not found — rendering fallback (resolvedGroup is null)');
    return <div>❌ Group not found</div>;
  }

  return (
    <>
      <Button onClick={() => navigate('/settings/groups')}>⬅️ Back to list</Button>
      <Descriptions title="Group Info" layout="vertical" bordered items={items(resolvedGroup)} />
    </>
  );
};

export default SettingsGroup;
