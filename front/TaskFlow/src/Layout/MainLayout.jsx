// src/App.jsx
import React from "react";
import { Layout, Menu, theme } from "antd";
import {
  UserOutlined,
  LaptopOutlined,
  NotificationOutlined,
} from "@ant-design/icons";

import HeaderBar from "./HeaderBar";
import MyContent from "./MyContent";
import SideBar from "./SideBar";

const { Header, Sider, Content } = Layout;




    const MainLayout = () => {
          const {
    token: { colorBgContainer },
  } = theme.useToken();

        return (
                <Layout style={{ minHeight: "100vh" }}>
                  
                <HeaderBar/>
                <Layout >
                <SideBar />
                <Layout style={{ padding: "24px" }} >
                <MyContent />
                </Layout>
                </Layout>
                </Layout>

        )
    }

    export default MainLayout;