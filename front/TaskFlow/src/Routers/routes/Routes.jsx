//Routes.jsx

import { createBrowserRouter } from 'react-router-dom';
import MainLayout from '../../Layout/MainLayout';
import Projects from '../../Pages/Projects/Projects';
import Users from '../../Pages/Users/Users';
import Tasks from '../../Pages/Tasks/Tasks';
import Notifications from '../../Pages/Notiifcations/Notifications';
import Home from '../../Pages/Home';
import AuthPage from '../../Pages/Auth/AuthPage';
import Profile from '../../Pages/Profile/Profile';
import ProjectDashboard from '../../Pages/Projects/ProjectDetails';
import ProjectTasks from '../../Pages/Tasks/ProjectTasks';
import TaskDetails from '../../Pages/Tasks/TaskDetails';
import MyAssignedTasks from '../../Pages/Tasks/MyAssignedTasks';
import UserCard from '../../Pages/Users/UserCard';
import SettingsGeneral from '../../Pages/Settings/SettingsGeneral';
import SettingsUsers from '../../Pages/Settings/SettingsUsers';
import SettingsGroups from '../../Pages/Settings/SettingsGroups';
import SettingsRoles from '../../Pages/Settings/SettingsRoles';
import Settings from '../../Pages/Settings/SettingsLayOut';
import SettingsGroup from '../../Pages/Settings/SettingsGroup';

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
              // { path: 'dashboard', element: <ProjectDashboard /> }, // /projects/:projectId/dashboard
              { path: 'tasks', element: <ProjectTasks /> },
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
            children: [{ index: true, element: <TaskDetails /> }],
          },
        ],
      },
      {
        path: 'settings',
        element: <Settings />,
        children: [
          { index: true, element: <SettingsGeneral /> }, // /settings
          {
            path: 'groups',
            element: <SettingsGroups />,
            children: [
              {
                path: ':groupID',

                element: <SettingsGroup />,
              },
            ],
          }, // /settings/groups
          { path: 'roles', element: <SettingsRoles /> }, // /settings/roles
          { path: 'users', element: <SettingsUsers /> }, // /settings/users
        ],
      },

      {
        path: 'user-profile',
        children: [
          { index: true, element: <Profile /> },
          { path: 'tasks', element: <MyAssignedTasks /> },
        ],
      },

      {
        path: 'users',
        children: [
          { index: true, element: <Users /> },
          {
            path: ':userID',
            children: [{ index: true, element: <UserCard /> }],
          },
        ],
      },
      {
        path: 'notifications',
        element: <Notifications />,
      },
    ],
  },
]);

export default router;
