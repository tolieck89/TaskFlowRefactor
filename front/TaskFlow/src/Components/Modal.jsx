import {Modal, Form}  from "antd";
import { useUserModal } from "../app/hooks/useUserModal";
import { useSelector } from "react-redux";
import UserForm from "./UserForm";
import ProjectForm from "../Pages/Projects/ProjectForm";

const UserModal = () => {
  const [form] = Form.useForm();
    var  modalTitle = '';


  const { close, mode, title } = useUserModal();
    
  const isModalOpen = useSelector(state => state.userModal.isOpen);

  
const handleCancel = () => {
    close();
}

function handleTitle()  {

  switch (mode) {
    case "edit":
      modalTitle = "Edit user info"

    case "newProject":
      modalTitle = "New project"
     
      default: 
      modalTitle = "Registration"
      
  }

}

return (
        <Modal
        title = {title}
        closable={{ 'aria-label': 'Custom Close Button' }}
        open={isModalOpen}
        onOk={() => form.submit()}
        onCancel={handleCancel}
      >
           {mode !== "newProject"  ? <UserForm form={form} /> : <ProjectForm  form={form} />}



      </Modal>
)

}

export default UserModal;