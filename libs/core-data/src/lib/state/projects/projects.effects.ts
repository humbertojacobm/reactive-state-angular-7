import {Injectable} from "@angular/core";
import { Actions,
         Effect,
         ofType} from "@ngrx/effects";
import { ProjectsService } from "../../projects/projects.service";
import { ProjectsActionTypes,
         LoadProjects,
         ProjectsLoaded,
         AddProject,
         ProjectAdded,
         ProjectUpdated,
         ProjectDeleted,
         DeleteProject,
         UpdateProject} from "./projects.actions";
import { switchMap,
         map } from "rxjs/operators";
import { Project } from "../../projects/project.model";

@Injectable({providedIn: 'root'})
export class ProjectsEffects {

  @Effect() loadProjects$ = this.actions$.pipe(
    ofType(ProjectsActionTypes.LoadProjects),//trigger event
    switchMap((action : LoadProjects) =>
      this.projectsService.all()
        .pipe(
          map((res: Project[]) => new ProjectsLoaded(res)) // completion event
        )
    )
  );

  @Effect() addProject$ = this.actions$.pipe(
    ofType(ProjectsActionTypes.AddProject), //trigger event
    switchMap( (action: AddProject) =>
      this.projectsService.create(action.payload)
        .pipe(map((res: Project) => new ProjectAdded(res)))//completion event
    )
  );

  @Effect() update$ = this.actions$.pipe(
    ofType(ProjectsActionTypes.UpdateProject), //trigger event
    switchMap( (action: UpdateProject) =>
      this.projectsService.update(action.payload)
        .pipe(map((res: Project) => new ProjectUpdated(res)))//completion event
    )
  );

  @Effect() delete$ = this.actions$.pipe(
    ofType(ProjectsActionTypes.DeleteProject), //trigger event
    switchMap( (action: DeleteProject) =>
      this.projectsService.delete(action.payload)
        .pipe(map((res: Project) => new ProjectDeleted(res)))//completion event
    )
  );

  constructor(
    private actions$: Actions,
    private projectsService: ProjectsService
  ){}


}
