import { useSelector, useDispatch } from 'react-redux';
import { openModal, closeModal, changeMode } from '../../Components/modalSlicer';

export function useUserModal() {
  const dispatch = useDispatch();
  const isOpen = useSelector((state) => state.userModal.isOpen);
  const mode = useSelector((state) => state.userModal.mode);
  const title = useSelector((state) => state.userModal.title);
  const user = useSelector((state) => state.userModal.user);

  return {
    isOpen,
    mode,
    title,
    user,
    open: (mode = 'create', title = 'New user', user = {}) => {
      console.log('Hello from useUserModal при відкритті модалки', user);
      dispatch(openModal({ mode, title, user }));
    },
    close: () => dispatch(closeModal()),
    setMode: (mode) => dispatch(changeMode({ mode })),
  };
}
