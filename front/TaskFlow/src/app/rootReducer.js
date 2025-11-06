import { combineReducers } from '@reduxjs/toolkit';
import themeReducer from '../Layout/layoutSlicer';
import userModalSlice from '../Components/modalSlicer';
import userSlice from '../Pages/Users/userSlicer';
import authSlice from '../Pages/Auth/AuthSlicer';
import projectSlice from '../Pages/Projects/ProjectSlicer';
import taskSlicer from '../Pages/Tasks/TaskSlicer';
import groupSlicer from '../Pages/Settings/groupsSlicer';

const rootReducer = combineReducers({
  theme: themeReducer,
  userModal: userModalSlice,
  users: userSlice,
  auth: authSlice,
  projects: projectSlice,
  task: taskSlicer,
  groups: groupSlicer,
});

export default rootReducer;
