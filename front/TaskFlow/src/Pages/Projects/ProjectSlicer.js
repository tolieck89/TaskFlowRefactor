import { createSlice } from '@reduxjs/toolkit';

const initialState = JSON.parse(localStorage.getItem('projects')) || [];

const projectSlice = createSlice({
  name: 'project',
  initialState,
  reducers: {
    addProject: (state, action) => {
    const newProject = action.payload;
 
    newProject.id= state.length;
    newProject.projectTasks = [];
     state.push(newProject);
      localStorage.setItem('projects', JSON.stringify(state));

    },
    removeProject: (state, action) => {
      const updated = state.filter(project => project.id == action.payload);

      localStorage.setItem('projects', JSON.stringify(updated));
      return updated;
    }, 
     editProject: (state, action) => {
        const updated = state.map(
            project => project.id===action.payload.id ? action.payload : project
        )
             localStorage.setItem('projects', JSON.stringify(updated));
      return updated;
    }


  }
});


export const {addProject, removeProject, editProject} = projectSlice.actions;
export default projectSlice.reducer;