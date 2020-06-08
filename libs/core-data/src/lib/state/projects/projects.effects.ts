import {Injectable} from "@angular/core";
import { Actions,
         Effect,
         ofType} from "@ngrx/effects";
import { ProjectsService } from "../../projects/projects.service";
import { ProjectsActionTypes,
         LoadProjects,
         ProjectsLoaded} from "./projects.actions";
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

  constructor(
    private actions$: Actions,
    private projectsService: ProjectsService
  ){}


}
