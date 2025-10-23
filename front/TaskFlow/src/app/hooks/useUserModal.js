import { useSelector, useDispatch } from 'react-redux';
import { openModal, closeModal, changeMode } from '../../Components/modalSlicer';

export function useUserModal(){
     const dispatch = useDispatch();
  const isOpen = useSelector((state) => state.userModal.isOpen);
  const mode = useSelector((state) => state.userModal.mode);
  const title = useSelector((state) => state.userModal.title);

  return {
    isOpen,
    mode,
    title,
    open: (mode = 'create',  title = "New user") => dispatch(openModal({ mode, title })),
    close: () => dispatch(closeModal()),
    setMode: (mode) => dispatch(changeMode({ mode }))
  };

}
