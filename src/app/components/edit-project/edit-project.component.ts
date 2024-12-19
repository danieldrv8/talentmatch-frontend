import { Component } from '@angular/core';
import { Project } from '../../interfaces/project';
import { Skill } from '../../interfaces/skill';
import { Candidate } from '../../interfaces/candidate';
import { ApiService } from '../../services/api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-edit-project',
  imports: [FormsModule],
  templateUrl: './edit-project.component.html',
  styleUrl: './edit-project.component.css',
})
export class EditProjectComponent {
  public project: Project = {
    id: 0,
    projectName: '',
    skillIds: [],
    candidateIds: [],
    skillNames: [],
    candidateNames: [],
  };

  public skills: Skill[] = [];

  public candidates: Candidate[] = [];

  constructor(
    private apiService: ApiService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    const projectId = this.route.snapshot.params['id'];
    console.log(projectId);
    if (projectId) {
      this.loadProjectDetails(projectId);
    }
  }

  loadProjectDetails(projectId: number) {
    this.apiService.getProjectById(projectId).subscribe((data) => {
      if (data != null) {
        this.project = data;
        console.log(this.project.projectName);
        for (let index = 0; index < this.project.skillIds.length; index++) {
          this.apiService
            .getSkillbyId(this.project.skillIds[index])
            .subscribe((data) => {
              this.skills.push({
                id: data.skill.id,
                skillName: data.skill.skillName,
                yearsOfExperience: 0,
                proficiency: '',
                lastYearUsed: 0,
                isSelected: true,
              });
            });
        }
        for (let index = 0; index < this.project.candidateIds.length; index++) {
          this.apiService
            .getCandidateById(this.project.candidateIds[index])
            .subscribe((data) => {
              this.candidates.push(data.candidate);
            });
        }
      }
    });
  }

  cancel() {
    this.router.navigate(['/projects']);
  }

  addSkill() {
    let skillName = window.prompt('Enter the skill name:', '');

    if (skillName == null) {
      return;
    }

    console.log(skillName);

    this.apiService.getSkillByName(skillName).subscribe((data) => {
      console.log(data);
      if (data.skill.skillName === skillName) {
        this.apiService.getSkillbyId(data.skill.id).subscribe((data) => {
          this.skills.push({
            id: data.skill.id,
            skillName: data.skill.skillName,
            yearsOfExperience: 0,
            proficiency: '',
            lastYearUsed: 0,
            isSelected: true,
          });
        });
        return;
      }
      this.apiService.addSkill(skillName).subscribe((response) => {
        console.log(response); // Log the response to inspect its structure
        this.skills.push({
          id: response.skill.id,
          skillName: response.skill.skillName,
          yearsOfExperience: 0,
          proficiency: '',
          lastYearUsed: 0,
          isSelected: true,
        });
      });
    });
  }

  addCandidate() {
    let candidateId = window.prompt('Enter the candidate id:', '');
    
    if (candidateId == null) {
      return;
    }
    let id: number = parseInt(candidateId);
    this.apiService.getCandidateById(id).subscribe((data) => {
      this.candidates.push(data.candidate);
    });
  }

  updateProject(projectId: number, project: Project) {

    for (let index = 0; index < this.skills.length; index++) {
      console.log(this.skills[index].id);
      if (this.skills[index].isSelected) {
        project.skillIds.push(this.skills[index].id);
      } else {
        project.skillIds.splice(project.skillIds.indexOf(this.skills[index].id), 1);
      }
    }

    for (let index = 0; index < this.candidates.length; index++) {
      console.log(this.candidates[index].id);
     
        project.candidateIds.push(this.candidates[index].id);
      
    }

    this.apiService.updateProject(projectId, project).subscribe((response) => {
      console.log(response); // Log the response to inspect its structure
      window.location.reload();
    });
  }
}
