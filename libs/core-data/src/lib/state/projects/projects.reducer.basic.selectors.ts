import { ProjectsState, adapter } from './projects.reducer';
//selectors
export const getSelectedProjectId = (state: ProjectsState) => state.selectedProjectId;
const { selectIds, selectEntities, selectAll } = adapter.getSelectors();
export const selectProjectIds = selectIds;
export const selectProjectEntities = selectEntities;
export const selectAllProjects = selectAll;
