import { Layout, Menu, theme } from "antd";
import {
  UserOutlined,
  LaptopOutlined,
  NotificationOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";

const { Sider} = Layout;

const SideBar = () => {
    const {
      token: { colorBgContainer },
    } = theme.useToken();
  
  return (

    <Sider width={200} >

      <Menu
        mode="inline"
        theme="dark"
        defaultSelectedKeys={["1"]}
        style={{ height: "100%", borderRight: 0}}
        items={[
          { key: "1", icon: <UserOutlined />, label: <Link to="/users">Users</Link> },
          { key: "2", icon: <LaptopOutlined />, label: <Link to="/projects">Projects</Link> },
          { key: "3", icon: <NotificationOutlined />, label: <Link to="/notifications">Notifications</Link> },
                ]}
      />
    </Sider>
    )


}

export default SideBar;

