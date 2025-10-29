import {Modal, Form}  from "antd";
import { useUserModal } from "../app/hooks/useUserModal";
import { useSelector } from "react-redux";
import UserForm from "./UserForm";
import ProjectForm from "../Pages/Projects/ProjectForm";
import UserCard from "../Pages/Users/UsersSettings";

const UserModal = () => {
  const [form] = Form.useForm();
    var  modalTitle = '';


  const { close, mode, title, user } = useUserModal();
    
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

    case "userCard":
      modalTitle = "User Card"
     
      default: 
      modalTitle = "Registration"
      
  }

}

let content;
if (mode === "userCard") {
  content = <UserCard user={user}/>;
} else if (mode !== "newProject") {
  content = <UserForm form={form} />;
} else {
  content = <ProjectForm form={form} />;
}


return (
        <Modal
        title = {title}
        closable={{ 'aria-label': 'Custom Close Button' }}
        open={isModalOpen}
        onOk={() => form.submit()}
        onCancel={handleCancel}
      >   

         {content}

      </Modal>
)

}

export default UserModal;