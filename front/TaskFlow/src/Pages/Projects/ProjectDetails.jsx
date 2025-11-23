import BackButton from '../../Components/BackButton';
import { Flex, Button, Switch, Form, Descriptions, Input, Select, Tag } from 'antd';
import { useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { editProject } from '../../app/Reducers/ProjectSlicer';

const ProjectDashboard = () => {
  const location = useLocation();
  const initialEdit = location.state?.editMode || false;
  const [form] = Form.useForm();
  const [project, setProject] = useState(location.state?.item || {});
  const groups = useSelector((state) => state.groups);
  const users = useSelector((state) => state.users);

  const handleChange = (value) => {
    // console.log(`selected ${value}`);
  };

  const usersNorm = (users) => {
    return users.map((user) => ({
      value: user.name,
      label: user.name,
    }));
  };

  const userOptions = usersNorm(users);
  const groupOptions = groups.map((group) => ({
    value: group.groupName,
    label: group.groupName,
  }));

  const options = [...groupOptions, ...userOptions];

  useEffect(() => {
    if (project) {
      form.setFieldsValue({
        name: project.name,
        key: project.key,
        projectTasks: project.projectTasks,
        isProtected: project.isProtected,
        description: project.description,
        group: project.group,
      });
    }
  }, [project]);

  const boxStyle = {
    marginBottom: 24,
    width: '100%',
  };

  const items = (project) => {
    return [
      {
        key: '1',
        label: 'Project ID',
        children: project.id,
      },
      {
        key: '2',
        label: 'Project',
        children: project.name,
      },
      {
        key: '3',
        label: 'Project key',
        children: project.key,
      },
      {
        key: '4',
        label: 'Project Tasks',
        children: project.projectTasks,
      },

      {
        key: '6',
        label: 'Allowed groups and users',
        children:
          Array.isArray(project.group) && project.group.length > 0 ? (
            <>
              {project.group.map((group, index) => (
                <Tag key={index}>{group}</Tag>
              ))}
            </>
          ) : (
            '-'
          ),
      },
    ];
  };

  const [editMode, setEditMode] = useState(false);
  const dispatch = useDispatch();

  const handleSubmit = (values) => {
    const updatedproject = {
      ...project,
      ...values,
    };

    dispatch(editProject(updatedproject));
    setProject(updatedproject);
    setEditMode(false);
  };

  if (!project) return <div>❌ Project not found</div>;

  return (
    <>
      <Flex style={boxStyle} justify="space-between" align="center">
        <BackButton />
        <Switch
          checked={editMode}
          onChange={setEditMode}
          checkedChildren="Edit"
          unCheckedChildren="View"
        />
      </Flex>

      <h2>{project.name}</h2>

      {!editMode ? (
        <Descriptions title="Project Info" layout="vertical" bordered items={items(project)} />
      ) : (
        <Form form={form} onFinish={handleSubmit} layout="vertical">
          <Form.Item name="name" label="Project">
            <Input />
          </Form.Item>
          <Form.Item name="key" label="Project">
            <Input />
          </Form.Item>

          <Form.Item name="group" label="Add users">
            <Select
              mode="multiple"
              showSearch
              filterOption={(input, option) =>
                option.label.toLowerCase().includes(input.toLowerCase())
              }
              style={{ width: '100%' }}
              placeholder="Select at least one employee"
              onChange={handleChange}
              options={options}
            />
          </Form.Item>

          <Descriptions layout="vertical" bordered>
            <Descriptions.Item label="Project ID">{project.id}</Descriptions.Item>
          </Descriptions>
          <Button type="primary" htmlType="submit">
            Save
          </Button>
        </Form>
      )}
    </>
  );
};

export default ProjectDashboard;
