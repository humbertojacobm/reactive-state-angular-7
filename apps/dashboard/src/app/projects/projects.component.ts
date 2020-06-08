import { Component, OnInit } from '@angular/core';
import { Store,
         select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Customer,
         Project,
         ProjectsService,
         NotificationsService,
         CustomersService,
         ProjectsState,
         AddProject,
         UpdateProject,
         DeleteProject,
         LoadProjects,
         selectAllProjects,
         initialProjects}
from '@workshop/core-data';

const emptyProject: Project = {
  id: null,
  title: '',
  details: '',
  percentComplete: 0,
  approved: false,
  customerId: null
}

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent implements OnInit {
  projects$: Observable<Project[]>;
  customers$: Observable<Customer[]>;
  currentProject: Project;

  constructor(
    private customerService: CustomersService,
    private store: Store<ProjectsState>,
    private ns: NotificationsService) {
      this.projects$ = store.pipe(
        select(selectAllProjects)
      );
    }

  ngOnInit() {
    this.getProjects();
    this.getCustomers();
    this.resetCurrentProject();
  }

  resetCurrentProject() {
    this.currentProject = emptyProject;
  }

  selectProject(project) {
    this.currentProject = project;
  }

  cancel(project) {
    this.resetCurrentProject();
  }

  getCustomers() {
    this.customers$ = this.customerService.all();
  }

  getProjects() {
    // this.projects$ = this.projectsService.all();
    this.store.dispatch(new LoadProjects());
  }

  saveProject(project) {
    if (!project.id) {
      this.createProject(project);
    } else {
      this.updateProject(project);
    }
  }

  createProject(project) {
    this.store.dispatch(new AddProject(project));
    this.ns.emit('Project created!');
  }

  updateProject(project) {
    this.store.dispatch(new UpdateProject(project));
    this.ns.emit('Project saved!');
  }

  deleteProject(project) {
    this.store.dispatch(new DeleteProject(project));
    this.ns.emit('Project deleted!');
  }
}

