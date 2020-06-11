import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ProjectStateModel } from '../../projects/project.model';
import * as projectReducer from '../projects/projects.reducer';
import * as projectBasicSelectors from "../projects/projects.reducer.basic.selectors";
import { selectAllCustomers } from '../customers/customers.reducer.super.selectors';
//-----------------------------------------
//PROJECTS SELECTORS
//-----------------------------------------
export const selectProjectsState
   = createFeatureSelector<projectReducer.ProjectsState>('projects');
export const selectProjectIds
   = createSelector(selectProjectsState, projectBasicSelectors.selectProjectIds);
export const selectProjectEntities
   = createSelector(selectProjectsState, projectBasicSelectors.selectProjectEntities);
export const selectAllProjects
   = createSelector(selectProjectsState, projectBasicSelectors.selectAllProjects);
export const selectCurrentProjectId
   = createSelector(selectProjectsState, projectBasicSelectors.getSelectedProjectId);
const emptyProject: ProjectStateModel = {
  id: null,
  title: '',
  details: '',
  percentComplete: 0,
  approved: false,
  customerId: null
};
export const selectCurrentProject
  = createSelector(selectProjectEntities, selectCurrentProjectId, (projectEntities, projectId) => {
      return projectId ? projectEntities[projectId] : emptyProject;
    });
export const selectCustomersProjects
  = createSelector(selectAllCustomers, selectAllProjects, (customers, projects) => {
      return customers.map(customer => {
        return Object.assign({}, {
          ...customer,
          projects: projects.filter(project => project.customerId === customer.id)
        });
      });
    });
