import {Injectable} from "@angular/core";
import { Actions,
         Effect,
         ofType} from "@ngrx/effects";
import { DataPersistence } from "@nrwl/nx";
import {  switchMap,
          tap,
          map } from "rxjs/operators";
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
import { ProjectStateModel } from "../../projects/project.model";
import { ProjectsState } from "./projects.reducer";


@Injectable({providedIn: 'root'})
export class ProjectsEffects {

  @Effect() loadProjects$ =
       this.dataPersistence
        .fetch(ProjectsActionTypes.LoadProjects,
               { run: (action: LoadProjects, state: ProjectsState) => {
                        return this.projectsService.all()
                                  .pipe(map( (res: ProjectStateModel[]) => new ProjectsLoaded(res) )   );
                      },
                 onError: ( action: LoadProjects, error) => {
                   console.log('ERROR',error);
                 }
               }
          );

  @Effect() addProject$ =
    this.dataPersistence
        .pessimisticUpdate(ProjectsActionTypes.AddProject,
              { run: ( action: AddProject, state: ProjectsState) => {
                      return this.projectsService.create(action.payload)
                          .pipe(map((res: ProjectStateModel) => new ProjectAdded(res)));
                    },
                onError: (action: AddProject, error) => {
                  console.log('ERROR',error);
                }
              }
          );

  @Effect() update$ =
    this.dataPersistence
    .pessimisticUpdate(ProjectsActionTypes.UpdateProject,
          { run: ( action: UpdateProject, state: ProjectsState) => {
                  return this.projectsService.update(action.payload)
                      .pipe(map((res: ProjectStateModel) => new ProjectUpdated(res)));
                },
            onError: (action: UpdateProject, error) => {
              console.log('ERROR',error);
            }
          }
      );

  @Effect() delete$ =
    this.dataPersistence
    .pessimisticUpdate(ProjectsActionTypes.DeleteProject,
          { run: ( action: DeleteProject, state: ProjectsState) => {
                  return this.projectsService.delete(action.payload)
                      .pipe(map((res: ProjectStateModel) => new ProjectDeleted(res)));
                },
            onError: (action: DeleteProject, error) => {
              console.log('ERROR',error);
            }
          }
      );

  constructor(
    private actions$: Actions,
    private dataPersistence: DataPersistence<ProjectsState>,
    private projectsService: ProjectsService
  ){}


}
