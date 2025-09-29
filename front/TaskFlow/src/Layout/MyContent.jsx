import React from "react";
import { Layout, Menu, theme } from "antd";
import {
  UserOutlined,
  LaptopOutlined,
  NotificationOutlined,
} from "@ant-design/icons";

const { Header, Sider, Content } = Layout;


const MyContent = () => {
    const {
      token: { colorBgContainer },
    } = theme.useToken();
  
    return(
       
          <Content
            style={{
              padding: 24,
              // margin: 4,
              background: colorBgContainer,
              minHeight: 280,
            }}
          >
            Тут буде мій SPA контент
          </Content>
    )
}

export default MyContent;