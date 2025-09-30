import { Layout, Menu, theme } from "antd";
import { Link } from "react-router-dom";

const { Header} = Layout;

const HeaderBar = () => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();


return (
  <Header style={{ display: "flex", alignItems: "center" }}>
    <Link to="/home">
    <div style={{ color: "white", fontWeight: "bold", marginRight: 20 }}>
      <img src="../../public/logoTask.png" alt="go home" width={36} />
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
  </Header>
  
)
}

export default HeaderBar;