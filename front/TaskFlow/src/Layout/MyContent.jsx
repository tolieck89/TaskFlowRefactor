import { Layout, theme } from "antd";

const { Content } = Layout;

const MyContent = ({children}) => {
    const {
      token: { colorBgContainer },
    } = theme.useToken();
  
    return(
      <Content
        style={{
        padding: 24,
        background: colorBgContainer,
        minHeight: 280,
              }}
      >
            {children}
      </Content>
    )
}

export default MyContent;