import { Layout, Menu, theme, Button, Space, Switch } from "antd";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { useUserModal } from "../app/hooks/useUserModal";

const { Header} = Layout;

const HeaderBar = () => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();

const dispatch = useDispatch();
const {open} = useUserModal();

  const [buttontext, setButtontext] = useState('➕ New user');

  const handleClick = () => {
    console.log('clicked')

    open();
  }


return (
  <Header style={{ display: "flex", alignItems: "center", justifyContent: "space-between"}} >
    <div style={{ display: "flex",  alignItems: "center"}}>
   
    <Link to="/home">
    <div style={{ color: "white", fontWeight: "bold", marginRight: 20 }}>
      <img src="/logoTask.png" alt="go home" width={36} />
      TaskFlow
    </div>
    </Link>
    
    <Menu
      style={{ lineHeight: "36px" }}
      theme="dark"
      mode="horizontal"
      defaultSelectedKeys={["1"]}
      items={[
      
        { key: "1", label: <Link to="/dashboard">Dashboard</Link>  },
        { key: "2", label: <Link to="/tasks">Tasks</Link> },
        { key: "3", label: <Link to="/settings">Settings</Link> },
    
            ]}
    />
    </div>
      <div style={{ display: "flex",  alignItems: "center"}}>
        <Button type="primary" onClick={handleClick}>{buttontext}  </Button>
      </div>  
  


  </Header>
  
)
}

export default HeaderBar;