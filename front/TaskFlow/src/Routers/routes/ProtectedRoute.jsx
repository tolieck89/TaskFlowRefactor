import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children, minRole = 0 }) => {
  const { isAuth, role } = useSelector((state) => state.auth);

  if (!isAuth) return <Navigate to="/login" />;
  if (role < minRole) return <Navigate to="/dashboard" />;

  return children;
};

export default ProtectedRoute;
