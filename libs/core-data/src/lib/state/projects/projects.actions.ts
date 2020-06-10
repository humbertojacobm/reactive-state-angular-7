import { Action } from "@ngrx/store";
import { Project } from "../../projects/project.model";

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
  constructor(public payload: Project){}
}

export class LoadProjects implements Action {
  readonly type = ProjectsActionTypes.LoadProjects;
}

export class ProjectsLoaded implements Action {
  readonly type = ProjectsActionTypes.ProjectsLoaded;
  constructor(private payload: Project[]){}
}

export class AddProject implements Action {
  readonly type = ProjectsActionTypes.AddProject;
  constructor(public payload: Project){}
}

export class ProjectAdded implements Action {
  readonly type = ProjectsActionTypes.ProjectAdded;
  constructor(private payload: Project){}
}

export class UpdateProject implements Action {
  readonly type = ProjectsActionTypes.UpdateProject;
  constructor(public payload: Project){}
}

export class ProjectUpdated implements Action {
  readonly type = ProjectsActionTypes.ProjectUpdated;
  constructor(private payload: Project){}
}

export class DeleteProject implements Action {
  readonly type = ProjectsActionTypes.DeleteProject;
  constructor(public payload: Project){}
}

export class ProjectDeleted implements Action {
  readonly type = ProjectsActionTypes.ProjectDeleted;
  constructor(private payload: Project){}
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
