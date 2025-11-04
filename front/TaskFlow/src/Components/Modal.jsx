import {Modal, Form}  from "antd";
import { useUserModal } from "../app/hooks/useUserModal";
import { useSelector } from "react-redux";
import UserForm from "./UserForm";
import ProjectForm from "../Pages/Projects/ProjectForm";
import UserCard from "../Pages/Users/UserCard";
import { useState } from "react";
import GroupForm from "./GroupForm";

const UserModal = () => {
  const [form] = Form.useForm();
  
  const { close, mode, title, user } = useUserModal();
    
  const isModalOpen = useSelector(state => state.userModal.isOpen);

  const handleCancel = () => {
    close();
}


let content;
if (mode === "groupForm") {
  console.log("Саме це я отримую в User Modal", mode, user);
  content = <GroupForm form={form}/>;
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