import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../../Layout/MainLayout";
import Dashboards from "../../Pages/Dashboards/Dashboards";
import Projects from "../../Pages/Projects/Projects";
import Settings from "../../Pages/Settings/Settings";
import Users from "../../Pages/Users/Users";
import Tasks from "../../Pages/Tasks/Tasks";
import Notifications from "../../Pages/Notiifcations/Notifications";
import Home from "../../Pages/Home";

 const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,  
    children: [
      {
        path: "dashboard",
        element: <Dashboards />
      },
      {
        path: "projects",
        element: <Projects />
      },
      {
        path: "settings",
        element: <Settings />
      },
      {
        path: "users",
        element: <Users />
      },
      {
        path: "tasks",
        element: <Tasks />
      },
      {
        path: "notifications",
        element: <Notifications />
      },
      {
        path: "home",
        element: <Home />
      },
    ]
  }
]);

export default router;