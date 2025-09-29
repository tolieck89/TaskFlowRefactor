// src/main.jsx
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { ConfigProvider, theme } from "antd";
import "antd/dist/reset.css"; // важливо для нормального ресету стилів

ReactDOM.createRoot(document.getElementById("root")).render(

    <ConfigProvider
      theme={{
        algorithm: theme.darkAlgorithm, // або lightAlgorithm
        token: {
          colorPrimary: "#1677ff", // твій бренд-колір
        },
      }}
    >
      <App />
    </ConfigProvider>
  
);
