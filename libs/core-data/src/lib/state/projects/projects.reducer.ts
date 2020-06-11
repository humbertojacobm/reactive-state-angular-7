import { ProjectStateModel } from './../../projects/project.model';
import { ProjectsActionTypes } from './projects.actions';
import { EntityState,
         EntityAdapter,
         createEntityAdapter } from '@ngrx/entity';

export const initialProjects: ProjectStateModel[] = [
  {
    id: '1',
    title: 'Project One',
    details: 'This is a sample project',
    percentComplete: 20,
    approved: false,
    customerId: null
  },
  {
    id: '2',
    title: 'Project Two',
    details: 'This is a sample project',
    percentComplete: 40,
    approved: false,
    customerId: null
  },
  {
    id: '3',
    title: 'Project Three',
    details: 'This is a sample project',
    percentComplete: 100,
    approved: true,
    customerId: null
  }
];

const createProject = (projects, project) => [...projects, project];
const updateProject = (projects, project) => projects.map(p => {
  return p.id === project.id ? Object.assign({}, project) : p;
});
const deleteProject = (projects, project) => projects.filter(w => project.id !== w.id);

// 01 define the shape of our state

export interface ProjectsState extends EntityState<ProjectStateModel> {
  selectedProjectId: string | null;
}

//02 create entity adapter
export const adapter: EntityAdapter<ProjectStateModel> = createEntityAdapter<ProjectStateModel>();

//03 define the initial state
export const initialState: ProjectsState = adapter.getInitialState({
  selectedProjectId: null
});

//04 build the most simplest reducer

export function projectsReducer(
  state = initialState,
  action) : ProjectsState
{
  switch(action.type){
    case ProjectsActionTypes.ProjectSelected:
      return Object.assign({},
                           state,
                           {selectedProjectId: action.payload});
    case ProjectsActionTypes.ProjectsLoaded:
      return adapter.addMany(action.payload, state);
    case ProjectsActionTypes.ProjectAdded:
      return adapter.addOne(action.payload, state);
    case ProjectsActionTypes.ProjectUpdated:
      return adapter.upsertOne(action.payload, state);
    case ProjectsActionTypes.ProjectDeleted:
      return adapter.removeOne(action.payload, state);
    default:
      return state;
  }
}
