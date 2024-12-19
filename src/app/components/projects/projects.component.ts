import { Component } from '@angular/core';
import { Project } from '../../interfaces/project';
import { ApiService } from '../../services/api.service';
import { Router } from '@angular/router';
import { Skill } from '../../interfaces/skill';
import { Candidate } from '../../interfaces/candidate';

@Component({
  selector: 'app-projects',
  imports: [],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.css'
})
export class ProjectsComponent {

  public projects: Project[] = [];

  constructor(private apiService: ApiService, private router: Router) { };
  
  ngOnInit() {
    this.apiService.getAllProjects().subscribe((response) => {
      console.log(response);
      if (response === null || response.length === 0) {
        this.projects = [];
        return;
      }
      this.projects = response;
    });
  }

  viewProject(projectId: number) {
    this.router.navigate(['/view-project', projectId]);
  }

  editProject(projectId: number) {
    this.router.navigate(['/edit-project', projectId]);
  }

  addProject() {
    this.router.navigate(['/add-project']);
  }

  viewProjectById(projectId: number) {
    this.router.navigate(['/view-project', projectId]);
  }

}
