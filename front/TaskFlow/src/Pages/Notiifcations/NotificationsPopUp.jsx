import { createContext, useContext } from 'react';
import { notification } from 'antd';
import { useSelector, useDispatch } from 'react-redux';

const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {
  const [api, contextHolder] = notification.useNotification();
  const currentUser = useSelector((state) => state.auth.authUser);

  const notify = ({ type = 'info', message, description, to }) => {
    if (!to.includes(currentUser)) return;
    api[type]({
      message,
      description,
    });
  };

  return (
    <NotificationContext.Provider value={notify}>
      {contextHolder}
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotify = () => useContext(NotificationContext);
