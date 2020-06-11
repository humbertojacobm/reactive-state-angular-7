import { ActionReducerMap } from '@ngrx/store';

import * as fromCustomers from './customers/customers.reducer';
import * as projectReducer from './projects/projects.reducer';


export interface AppState {
  customers: fromCustomers.CustomersState,
  projects: projectReducer.ProjectsState
}

export const reducers: ActionReducerMap<AppState> = {
  customers: fromCustomers.customersReducer,
  projects: projectReducer.projectsReducer
};


