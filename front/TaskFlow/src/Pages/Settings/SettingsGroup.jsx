//SettingsGroup.jsx
import { useState, useEffect } from 'react';
import { Badge, Descriptions,  Switch, Form, Input, Button, Flex, Checkbox, Radio }  from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useParams } from 'react-router-dom';
import BackButton from '../../Components/BackButton';
import { editGroup } from './groupsSlicer';


const SettingsGroup = () => {


  const location = useLocation();
  const [form] = Form.useForm();
  const { groupID } = useParams();
  const groups = useSelector(state => state.groups);
  const group = groups.find(g => String(g.id) === groupID);
  const x = 1

   const [group, setGroup] = useState(null);

  useEffect(() => {
    const fromState = location.state?.item;
    const fromStore = groups.find(g => String(g.id) === groupID);
    setGroup(fromState || fromStore || null);
  }, [groupID, groups, location.state]);


    useEffect(() => {
    if (group) {
      form.setFieldsValue({
        groupName: group.groupName,
        role: group.role,
        allowedProjects: group.allowedProjects,
        groupDescription: group.groupDescription,
      });
    }
  }, [group]);

  const boxStyle = {
    marginBottom: 24,
    width: '100%',
  };

  const items = (group) => {
  return  [
    {
      key: '1',
      label: 'User ID',
      children: group.id,
    },
    {
      key: '2',
      label: 'groupName',
      children: group.groupName,
    },

    {
      key: '4',
      label: 'Allowed projects',
      span: 2,
      children: group.allowedProjects,
    },
    {
      key: '5',
      label: 'Role',
      children: group.role,
    },
  ] }

  const [editMode, setEditMode] = useState(false);
  const dispatch = useDispatch();

  const handleSubmit = (values) => {
  const updatedGroup = {
    ...group,
    ...values,
  };
    dispatch(editGroup(updatedGroup));
    setGroup(updatedGroup); 
    setEditMode(false);
};

if (!group) return <div>❌ Group not found</div>;

  return (
    <>
       <Flex style={boxStyle} justify='space-between' align='center'>
            <BackButton />
             <Switch
              checked={editMode}
              onChange={setEditMode}
              checkedChildren="Edit" unCheckedChildren="View"
            />
        </Flex> 

  {!editMode ? (
    <Descriptions
      title="User Info"
      layout="vertical"
      bordered
      items={items(group)}
    />
  ) : (
    <Form form={form} onFinish={handleSubmit} layout="vertical"
  
  >
    <Form.Item name="groupName" label="Group name">
      <Input />
  </Form.Item>

 
    
    
    <Descriptions layout="vertical" bordered>
  <Descriptions.Item label="Group ID">{group.id}</Descriptions.Item>
 
</Descriptions>
    <Button type="primary" htmlType="submit">Save</Button>
  </Form>
)}

 </>
)
};
export default SettingsGroup;