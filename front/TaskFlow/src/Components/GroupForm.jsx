import { Form, Input, InputNumber, Radio, Select } from 'antd';
import { useUserModal } from '../app/hooks/useUserModal';
import { useDispatch, useSelector } from 'react-redux';
import { addGroup } from '../app/Reducers/groupsSlicer';

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

const GroupForm = ({ form }) => {
  const { close } = useUserModal();
  const disp = useDispatch();
  const onFinish = (values) => {
    console.log('Raw form values:', values);

    console.log(values);
    disp(addGroup(values));
    close();
    form.resetFields();
  };

  const handleChange = (value) => {
    console.log(`selected ${value}`);
  };

  const variant = Form.useWatch('variant', form);

  const users = useSelector((state) => state.users);
  const projects = useSelector((state) => state.projects);

  const userOptions = users.map((user) => ({
    label: user.name,
    value: user.id,
  }));

  const projectsOptions = projects.map((project) => ({
    label: project.key,
    value: project.id,
  }));

  return (
    <Form
      {...layout}
      name="nest-messages"
      onFinish={onFinish}
      style={{ maxWidth: 600 }}
      form={form}
    >
      <Form.Item
        name="groupName"
        label="Group title"
        tooltip="it must be unique title"
        rules={[{ required: true, message: 'Please group title' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item name="groupDescription" label="Group Description">
        <Input.TextArea />
      </Form.Item>

      <Form.Item name="groupUsers" label="Add users">
        <Select
          mode="multiple"
          showSearch
          filterOption={(input, option) => option.label.toLowerCase().includes(input.toLowerCase())}
          style={{ width: '100%' }}
          placeholder="Select at least one employee"
          onChange={handleChange}
          options={userOptions}
        />
      </Form.Item>

      <Form.Item name="groupAllowedProjects" label="Add projects">
        <Select
          mode="multiple"
          showSearch
          filterOption={(input, option) => option.label.toLowerCase().includes(input.toLowerCase())}
          style={{ width: '100%' }}
          placeholder="Select at least one project"
          onChange={handleChange}
          options={projectsOptions}
        />
      </Form.Item>

      <Form.Item name="role" label="Choice access level" tooltip="1 - watcher, 2 - user, 3 - admin">
        <InputNumber min={1} max={3} initialvalues={1} />
      </Form.Item>
    </Form>
  );
};

export default GroupForm;
