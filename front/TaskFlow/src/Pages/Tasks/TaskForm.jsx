import { Form, Input, Radio, Select, Space } from 'antd';
import { useUserModal } from '../../app/hooks/useUserModal';
import { useDispatch } from 'react-redux';
import { addTask } from './TaskSlicer';

//to do  - optimize this form for task creation

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};
const validateMessages = {
  required: '${label} is required!',
  types: {
    email: '${label} is not a valid email!',
    number: '${label} is not a valid number!',
  },
  number: {
    range: '${label} must be between ${min} and ${max}',
  },
};

const TaskForm = ({ form }) => {
  const { close } = useUserModal();
  const disp = useDispatch();

  const onFinish = (values) => {
    console.log(values);

    disp(addTask(values));
    close();
  };

  const variant = Form.useWatch('variant', form);

  const options = [];
  for (let i = 10; i < 36; i++) {
    options.push({
      value: i.toString(36) + i,
      label: i.toString(36) + i,
    });
  }

  const handleChange = (value) => {
    console.log(`selected ${value}`);
  };

  return (
    <Form
      {...layout}
      name="nest-messages"
      onFinish={onFinish}
      style={{ maxWidth: 600 }}
      validateMessages={validateMessages}
      form={form}
    >
      <Form.Item
        name={['task', 'name']}
        label="Project name"
        tooltip="it must be unique title"
        rules={[{ required: true, message: 'Please input project name!' }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name={['project', 'key']}
        label="Project key"
        tooltip="it must be unique title"
        rules={[{ required: true, message: 'Please input project key!' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item name={['project', 'group']} label="Grant access for groups">
        <Select
          mode="multiple"
          style={{ width: '100%' }}
          placeholder="select one country"
          defaultValue={['china']}
          onChange={handleChange}
          options={options}
          optionRender={(option) => (
            <Space>
              <span role="img" aria-label={option.data.label}>
                {option.data.emoji}
              </span>
              {option.data.desc}
            </Space>
          )}
        />
      </Form.Item>
      <Form.Item name={['project', 'issuetype']} label="Issue types">
        <Select
          mode="tags"
          style={{ width: '100%' }}
          placeholder="Input isue types for this project"
          onChange={handleChange}
          options={options}
        />
      </Form.Item>
      <Form.Item name={['project', 'description']} label="Project description">
        <Input />
      </Form.Item>

      <Form.Item label="isProtected" name={['project', 'isProtected']}>
        <Radio.Group>
          <Radio value="yes"> Yes </Radio>
          <Radio value="no"> No </Radio>
        </Radio.Group>
      </Form.Item>
    </Form>
  );
};

export default TaskForm;
