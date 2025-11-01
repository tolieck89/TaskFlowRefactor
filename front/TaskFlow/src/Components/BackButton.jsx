import { useNavigate } from 'react-router-dom';
import { ArrowLeftOutlined } from '@ant-design/icons';

const BackButton = () => {
  const navigate = useNavigate();

  return (
  
     <ArrowLeftOutlined onClick={() => navigate(-1)}  />
   
  );
};

export default BackButton;

