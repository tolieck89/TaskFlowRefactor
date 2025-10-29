import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Checkbox, Form, Input, Flex } from 'antd';
import { useDispatch } from 'react-redux';
import { login, logOut } from "./AuthSlicer"
import { useUserModal } from "../../app/hooks/useUserModal";



const AuthPage = () => {
  const dispatch = useDispatch();

  const {open} = useUserModal();


    const userInfo = JSON.parse(localStorage.getItem("users") || '[]')

    const onFinish = (values) => {
      console.log('Received values of form: ', values);
  
      const index = userInfo.findIndex(user => user.name === values.username);
        
      if(index === -1){
        return "There is no user with this username"
      } else if (userInfo[index].password === values.password){
        dispatch(login(values.username));
        } else {
            return "Wrong password"
          }
};



  return (
    <Form
      name="login"
      initialValues={{ remember: true }}
      style={{ maxWidth: 360 }}
      onFinish={onFinish}
    >
      <Form.Item
        name="username"
        rules={[{ required: true, message: 'Please input your Username!' }]}
      >
        <Input prefix={<UserOutlined />} placeholder="Username" />
      </Form.Item>
      <Form.Item
        name="password"
        rules={[{ required: true, message: 'Please input your Password!' }]}
      >
        <Input prefix={<LockOutlined />} type="password" placeholder="Password" />
      </Form.Item>
      <Form.Item>
        <Flex justify="space-between" align="center">
          <Form.Item name="remember" valuePropName="checked" noStyle>
            <Checkbox>Remember me</Checkbox>
          </Form.Item>
          <a href="">Forgot password</a>
        </Flex>
      </Form.Item>

      <Form.Item>
        <Button block type="primary" htmlType="submit">
          Log in
        </Button>
        Don't have account yet?  <a onClick={() => open()}>Register now!</a>

      </Form.Item>
    </Form>
  );
};

export default AuthPage;