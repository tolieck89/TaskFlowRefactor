import { DatePicker, Form, Input, Radio } from 'antd';
import { useUserModal } from '../app/hooks/useUserModal';
import { addUser } from '../app/Reducers/userSlicer';
import { useDispatch } from 'react-redux';
import { sanitizeUser } from '../app/hooks/sanitazeUser';
import { login } from '../app/Reducers/AuthSlicer';

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

const UserForm = ({ form }) => {
  const { close } = useUserModal();
  const disp = useDispatch();
  const onFinish = (values) => {
    console.log('Raw form values:', values);
    const cleanedUser = sanitizeUser(values.user);
    console.log('Cleaned user:', cleanedUser);

    disp(addUser(cleanedUser));
    disp(login(cleanedUser));
    close();
    form.resetFields();
  };

  const variant = Form.useWatch('variant', form);

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
        name={['user', 'name']}
        label="Username"
        tooltip="it must be unique username, not real name"
        rules={[{ required: true, message: 'Please input your name!' }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name={['user', 'realName']}
        label="Real Name"
        tooltip="Input your real name"
        rules={[{ required: true, message: 'Please input your real name!' }]}
      >
        <Input />
      </Form.Item>
      <Form.Item name={['user', 'email']} label="Email" rules={[{ type: 'email', required: true }]}>
        <Input />
      </Form.Item>
      <Form.Item
        name={['user', 'password']}
        label="Password"
        rules={[
          {
            required: true,
            message: 'Please input your password!',
          },
        ]}
        hasFeedback
      >
        <Input.Password />
      </Form.Item>
      <Form.Item
        name="confirm"
        label="Confirm Password"
        dependencies={['user', 'password']}
        hasFeedback
        rules={[
          {
            required: true,
            message: 'Please confirm your password!',
          },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue(['user', 'password']) === value) {
                return Promise.resolve();
              }
              return Promise.reject(new Error('The new password that you entered do not match!'));
            },
          }),
        ]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item name={['user', 'menarche']} label="Menarche at">
        <DatePicker />
      </Form.Item>

      <Form.Item name={['user', 'introduction']} label="Introduction">
        <Input.TextArea />
      </Form.Item>
      <Form.Item label="Gender" name={['user', 'gender']}>
        <Radio.Group>
          <Radio value="Male"> Male </Radio>
          <Radio value="Female"> Female </Radio>
          <Radio value="Desk"> Desk </Radio>
        </Radio.Group>
      </Form.Item>
    </Form>
  );
};

export default UserForm;
