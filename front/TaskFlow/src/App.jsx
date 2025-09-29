import React from "react";
import { Layout, Menu, theme } from "antd";
import {
  UserOutlined,
  LaptopOutlined,
  NotificationOutlined,
} from "@ant-design/icons";

import MainLayout from "./Layout/MainLayout";

const { Header, Sider, Content } = Layout;

const App = () => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    // <Layout style={{ minHeight: "100vh" }}>
    //   {/* Верхній хедер */}
    //   <Header style={{ display: "flex", alignItems: "center" }}>
    //     <div style={{ color: "white", fontWeight: "bold", marginRight: 20 }}>
    //       TaskFlow
    //     </div>
    //     <Menu
    //       theme="dark"
    //       mode="horizontal"
    //       defaultSelectedKeys={["1"]}
    //       items={[
    //         { key: "1", label: "Dashboard" },
    //         { key: "2", label: "Tasks" },
    //         { key: "3", label: "Settings" },
    //       ]}
    //     />
    //   </Header>

    //   {/* Внутрішній Layout: сайдбар + контент */}
    //   <Layout>
    //     <Sider width={200} theme="dark">
    //       <Menu
    //         mode="inline"
    //         defaultSelectedKeys={["1"]}
    //         style={{ height: "100%", borderRight: 0 }}
    //         items={[
    //           { key: "1", icon: <UserOutlined />, label: "Users" },
    //           { key: "2", icon: <LaptopOutlined />, label: "Projects" },
    //           { key: "3", icon: <NotificationOutlined />, label: "Notifications" },
    //         ]}
    //       />
    //     </Sider>

    //     <Layout style={{ padding: "24px" }}>
    //       <Content
    //         style={{
    //           padding: 24,
    //           margin: 0,
    //           background: colorBgContainer,
    //           minHeight: 280,
    //         }}
    //       >
    //         Тут буде твій SPA контент
    //       </Content>
    //     </Layout>
    //   </Layout>
    // </Layout>

    <MainLayout />


  );
};

export default App;
