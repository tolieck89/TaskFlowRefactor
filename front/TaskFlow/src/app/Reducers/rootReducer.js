import { combineReducers } from '@reduxjs/toolkit';
import themeReducer from './layoutSlicer';
import userModalSlice from './modalSlicer';
import userSlice from './userSlicer';
import authSlice from './AuthSlicer';
import projectSlice from './ProjectSlicer';
import taskSlicer from './TaskSlicer';
import groupSlicer from './groupsSlicer';
import notifySlicer from './NotificationsSlicer';

const rootReducer = combineReducers({
  theme: themeReducer,
  userModal: userModalSlice,
  users: userSlice,
  auth: authSlice,
  projects: projectSlice,
  task: taskSlicer,
  groups: groupSlicer,
  notifications: notifySlicer,
});

export default rootReducer;
