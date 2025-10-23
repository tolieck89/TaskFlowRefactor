import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../../Layout/MainLayout";
import Projects from "../../Pages/Projects/Projects";
import Users from "../../Pages/Users/Users";
import Tasks from "../../Pages/Tasks/Tasks";
import Notifications from "../../Pages/Notiifcations/Notifications";
import Home from "../../Pages/Home";
import AuthPage from "../../Pages/Auth/AuthPage";
import Profile from "../../Pages/Profile/Profile";
import ProjectDashboard from "../../Pages/Projects/ProjectDashboard";
import ProjectTasks from "../../Pages/Tasks/ProjectTasks";
import ProtectedRoute from "./ProtectedRoute";
import ProjectSettings from "../../Pages/Projects/ProjectSettings";
import TaskDetails from "../../Pages/Tasks/TaskDetails";
import TaskSettings from "../../Pages/Tasks/TaskSettings";
import ProfileSettings from "../../Pages/Profile/ProfileSettings";
import MyAssignedTasks from "../../Pages/Tasks/MyAssignedTasks";


const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      { path: 'login', element: <AuthPage /> },
      { path: 'home', element: <Home /> },

      {
  path: 'projects',
  children: [
    { index: true, element: <Projects /> }, // /projects
    {
      path: ':projectId',
      children: [
        { index: true, element: <ProjectDashboard /> }, // /projects/:projectId
        { path: 'dashboard', element: <ProjectDashboard /> }, // /projects/:projectId/dashboard
        { path: 'tasks', element: <ProjectTasks /> },
        {
          path: 'settings',
          element: (
            <ProtectedRoute minRole={2}>
              <ProjectSettings />
            </ProtectedRoute>
          ),
        },
      ],
    },
  ],
},


      {
        path: 'tasks',
        children: [
          { index: true, element: <Tasks /> },
          {
            path: ':taskId',
            children: [
              { path: 'details', element: <TaskDetails /> },
              {
                path: 'settings',
                element: (
                  <ProtectedRoute minRole={2}>
                    <TaskSettings />
                  </ProtectedRoute>
                ),
              },
            ],
          },
        ],
      },

      {
        path: 'user-profile',
        children: [
          { index: true, element: <Profile /> },
          { path: 'tasks', element: <MyAssignedTasks /> },
          {
            path: 'settings',
            element: (
              <ProtectedRoute minRole={1}>
                <ProfileSettings />
              </ProtectedRoute>
            ),
          },
        ],
      },

      {
        path: 'users',
        element: (
          <ProtectedRoute minRole={2}>
            <Users />
          </ProtectedRoute>
        ),
      },

      {
        path: 'notifications',
        element: <Notifications />,
      },
    ],
  },
]);

export default router;