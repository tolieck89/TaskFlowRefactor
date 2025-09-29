import React from "react";
import { Layout, Menu, theme } from "antd";
import {
  UserOutlined,
  LaptopOutlined,
  NotificationOutlined,
} from "@ant-design/icons";

const { Header, Sider, Content } = Layout;

const HeaderBar = () => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();


return (

  
      
       <Header style={{ display: "flex", alignItems: "center" }}>
          <div style={{ color: "white", fontWeight: "bold", marginRight: 20 }}>
            TaskFlow
          </div>
          <Menu
           style={{ lineHeight: "36px" }}
            theme="dark"
            mode="horizontal"
            defaultSelectedKeys={["1"]}
            items={[
              { key: "1", label: "Dashboard" },
              { key: "2", label: "Tasks" },
              { key: "3", label: "Settings" },
            ]}
          />
        </Header>
      
     
)


}

export default HeaderBar;