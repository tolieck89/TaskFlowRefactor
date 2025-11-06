import { Layout, theme } from 'antd';
const { Content } = Layout;
import { useSelector } from 'react-redux';
import AuthPage from '../Pages/Auth/AuthPage';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import {
  DeleteOutlined,
  EditOutlined,
  EyeOutlined,
  CopyOutlined,
  ArrowLeftOutlined,
  ArrowRightOutlined,
} from '@ant-design/icons';

const MyContent = ({ children }) => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const navigate = useNavigate();

  const isAuth = useSelector((state) => state.auth.isAuth);

  useEffect(() => {
    if (!isAuth) {
      navigate('/login');
    } else {
      navigate('/projects');
    }
  }, [isAuth]);

  return !isAuth ? (
    <AuthPage />
  ) : (
    <Content
      style={{
        padding: 24,
        background: colorBgContainer,
        minHeight: 280,
      }}
    >
      {children}
    </Content>
  );
};

export default MyContent;
