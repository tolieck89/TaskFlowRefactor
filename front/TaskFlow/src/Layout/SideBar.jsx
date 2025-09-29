import React from "react";
import { Layout, Menu, theme } from "antd";
import {
  UserOutlined,
  LaptopOutlined,
  NotificationOutlined,
} from "@ant-design/icons";

const { Sider} = Layout;

const SideBar = () => {
    const {
      token: { colorBgContainer },
    } = theme.useToken();
  
    
    return (
         <Sider width={200} theme="dark">
                  <Menu
                    mode="inline"
                    defaultSelectedKeys={["1"]}
                    style={{ height: "100%", borderRight: 0}}
                    items={[
                      { key: "1", icon: <UserOutlined />, label: "Users" },
                      { key: "2", icon: <LaptopOutlined />, label: "Projects" },
                      { key: "3", icon: <NotificationOutlined />, label: "Notifications" },
                    ]}
                  />
                </Sider>
    )


}

export default SideBar;

