import { Action } from "@ngrx/store";
import { ProjectStateModel } from "../../projects/project.model";

// 01 define our possible action types
export enum ProjectsActionTypes {
  ProjectSelected = '[Projects] selected',
  LoadProjects = '[Projects] Load Data',
  ProjectsLoaded = '[Projects] Data Loaded',
  AddProject = '[Projects] Add Data',
  ProjectAdded = '[Projects] Data Added',
  UpdateProject = '[Projects] Update Data',
  ProjectUpdated = '[Projects] Data updated',
  DeleteProject = '[Projects] Delete Data',
  ProjectDeleted = '[Projects] Data Deleted'
}

//02 create our actions
export class SelectProject implements Action {
  readonly type = ProjectsActionTypes.ProjectSelected;
  constructor(public payload: number){}
}

export class LoadProjects implements Action {
  readonly type = ProjectsActionTypes.LoadProjects;
}

export class ProjectsLoaded implements Action {
  readonly type = ProjectsActionTypes.ProjectsLoaded;
  constructor(private payload: ProjectStateModel[]){}
}

export class AddProject implements Action {
  readonly type = ProjectsActionTypes.AddProject;
  constructor(public payload: ProjectStateModel){}
}

export class ProjectAdded implements Action {
  readonly type = ProjectsActionTypes.ProjectAdded;
  constructor(private payload: ProjectStateModel){}
}

export class UpdateProject implements Action {
  readonly type = ProjectsActionTypes.UpdateProject;
  constructor(public payload: ProjectStateModel){}
}

export class ProjectUpdated implements Action {
  readonly type = ProjectsActionTypes.ProjectUpdated;
  constructor(private payload: ProjectStateModel){}
}

export class DeleteProject implements Action {
  readonly type = ProjectsActionTypes.DeleteProject;
  constructor(public payload: ProjectStateModel){}
}

export class ProjectDeleted implements Action {
  readonly type = ProjectsActionTypes.ProjectDeleted;
  constructor(private payload: ProjectStateModel){}
}

//03 expose projects actions as union type

export type ProjectsActions = SelectProject
  | ProjectsLoaded
  | LoadProjects
  | ProjectsLoaded
  | AddProject
  | ProjectAdded
  | UpdateProject
  | ProjectUpdated
  | DeleteProject
  | ProjectDeleted
  ;
