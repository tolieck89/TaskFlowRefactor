import ReactDOM from "react-dom/client";
import { ConfigProvider, theme, Spin } from "antd";
import "antd/dist/reset.css"; 
import { RouterProvider } from "react-router-dom";
import router  from "./Routers/routes/Routes";



ReactDOM.createRoot(document.getElementById("root")).render(

    <ConfigProvider
      theme={{
        algorithm: theme.darkAlgorithm, // або lightAlgorithm
        token: {
          colorPrimary: "#1677ff", 
        },
      }}
    >
        <RouterProvider
         router={router} 
          fallbackElement={
    <div style={{ display: "flex", justifyContent: "center", marginTop: 50 }}>
      <Spin size="large" />
    </div>}
        />
    </ConfigProvider>
  
);
