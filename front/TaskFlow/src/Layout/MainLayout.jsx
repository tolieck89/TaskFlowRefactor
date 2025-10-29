import { Layout, theme } from "antd";
import HeaderBar from "./HeaderBar";
import MyContent from "./MyContent";
import SideBar from "./SideBar";
import { Outlet, Link } from 'react-router-dom';


const MainLayout = () => {
    const {
    token: { colorBgContainer },
    } = theme.useToken();

    return (
        <Layout style={{ minHeight: "100vh" }}>
            <HeaderBar/>
            <Layout >
                <SideBar />
                <Layout style={{ padding: "16px" }} >
                    <MyContent>
                     <Outlet />
                    </MyContent>
                </Layout>
            </Layout>
        </Layout>

        )
    }

export default MainLayout;