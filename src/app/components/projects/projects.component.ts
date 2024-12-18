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
  public skills: Skill[] = [];
  public candidates: Candidate[] = [];

  constructor(private apiService: ApiService, private router: Router) { };
  
  ngOnInit() {
    this.apiService.getAllProjects().subscribe(response => {
      console.log(response); // Log the response to inspect its structure
      if (response.projects === null) {
        this.projects = [];
        return;
      }
      this.projects = response; // Assuming response.projects is the correct key
      for (let index = 0; index < this.projects.length; index++) {
        if (this.projects[index].skillIds === null) {
          this.projects[index].skillIds = [];
        } else {
          for (let index2 = 0; index2 < this.projects[index].skillIds.length; index2++) {
            this.apiService.getSkillbyId(this.projects[index].skillIds[index2]).subscribe(data => {
              this.skills.push({id: data.skill.id, 
                skillName: data.skill.skillName,
                yearsOfExperience: 0, 
                proficiency: '', 
                lastYearUsed: 0,
                isSelected: true}
              );
            });
          }
        }
        if (this.projects[index].candidateIds === null) {
          this.projects[index].candidateIds = [];
        } else {
          for (let index2 = 0; index2 < this.projects[index].candidateIds.length; index2++) {
            this.apiService.getCandidateById(this.projects[index].candidateIds[index2]).subscribe(data => {
              this.candidates.push(data.candidate);
            });
          }
        }
      }
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

}
