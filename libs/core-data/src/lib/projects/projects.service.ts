import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of, throwError } from 'rxjs';
import { switchMap, catchError } from 'rxjs/operators';
import { environment } from '@env/environment';
import { ProjectStateModel } from './project.model';
import { NotificationsService } from '../notifications/notifications.service';

@Injectable({
  providedIn: 'root'
})
export class ProjectsService {
  model = 'projects'

  constructor(
    private http: HttpClient,
    private notificationsService: NotificationsService
  ) { }

  getUrl() {
    return `${environment.apiEndpoint}${this.model}`;
  }

  getUrlForId(id) {
    return `${this.getUrl()}/${id}`;
  }

  all() {
    return this.http.get<ProjectStateModel[]>(this.getUrl());
  }

  load(id) {
    return this.http.get<ProjectStateModel>(this.getUrlForId(id));
  }

  loadByCustomer(customerId: string) {
    return this.http.get<ProjectStateModel[]>(this.getUrl(), {params: {customerId}})
      .pipe(
        switchMap(projects => {
          if (projects.length) {
            return of(projects);
          } else {
            return throwError(`No projects exist for customer with ID ${customerId}`);
          }
        }),
        catchError(error => {
          this.notificationsService.emit(error);

          return throwError(error);
        })
      )
  }

  create(project: ProjectStateModel) {
    return this.http.post(this.getUrl(), project);
  }

  update(project: ProjectStateModel) {
    return this.http.patch(this.getUrlForId(project.id), project);
  }

  delete(project: ProjectStateModel) {
    return this.http.delete(this.getUrlForId(project.id));
  }
}
