import ReactDOM from "react-dom/client";
import { ConfigProvider, theme, Spin } from "antd";
import "antd/dist/reset.css"; 
import { RouterProvider } from "react-router-dom";
import router  from "./Routers/routes/Routes";
import { Provider, useSelector } from 'react-redux';
import store from './app/store';
import UserModal from "./Components/Modal";

function AppWrapper(){
  const themeMode = useSelector((state) => state.theme.mode);

  return (
     <ConfigProvider
      theme={{
        algorithm: themeMode === 'dark' ? theme.darkAlgorithm : theme.defaultAlgorithm,
        token: {
          colorPrimary: "#1677ff",
        },
      }}
    >
             <UserModal />

      <RouterProvider
        router={router}
        fallbackElement={
          <div style={{ display: "flex", justifyContent: "center", marginTop: 50 }}>
            <Spin size="large" />
          </div>
        }
       
      />
    </ConfigProvider>

  )
}



ReactDOM.createRoot(document.getElementById("root")).render(
  
    
    <Provider store={store}>
      <AppWrapper />

    </Provider>
  
);
