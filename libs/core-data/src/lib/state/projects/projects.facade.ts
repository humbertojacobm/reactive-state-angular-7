import { Injectable } from "@angular/core";
import { Store,
         select } from "@ngrx/store";
import { Observable } from "rxjs";
import { ProjectStateModel } from "../../projects/project.model";
import { ProjectsState } from "./projects.reducer";
import { selectCurrentProject,
         selectAllProjects } from "./projects.reducer.super.selectors";
import { LoadProjects,
         SelectProject,
         AddProject,
         UpdateProject,
         DeleteProject} from "./projects.actions";



@Injectable({providedIn: 'root'})
export class ProjectsFacade{
  projects$: Observable<ProjectStateModel[]>;
  currentProject$: Observable<ProjectStateModel>;

  constructor(private store: Store<ProjectsState>){
    this.projects$ = store.pipe(select(selectAllProjects));
    this.currentProject$ = store.pipe(select(selectCurrentProject));
  }

  getProjects(){
    this.store.dispatch(new LoadProjects());
  }

  selectProject(project){
    this.store.dispatch(new SelectProject(project ? project.id : null));
  }

  createProject(project){
    this.store.dispatch(new AddProject(project));
  }

  updateProject(project){
    this.store.dispatch(new UpdateProject(project));
  }

  deleteProject(project){
    this.store.dispatch(new DeleteProject(project));
  }

}
