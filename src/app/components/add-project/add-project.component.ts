import { Component } from '@angular/core';
import { Project } from '../../interfaces/project';
import { Skill } from '../../interfaces/skill';
import { Candidate } from '../../interfaces/candidate';
import { ApiService } from '../../services/api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-add-project',
  imports: [FormsModule],
  templateUrl: './add-project.component.html',
  styleUrl: './add-project.component.css'
})
export class AddProjectComponent {
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
    this.apiService.getAllSkills().subscribe(response => {
      console.log(response); // Log the response to inspect its structure
      this.skills = response.skills; // Assuming response.skills is the correct key
    });
    this.apiService.getAllCandidates().subscribe(response => {
      console.log(response); // Log the response to inspect its structure
      this.candidates = response.candidates; // Assuming response.candidates is the correct key
      console.log('Candidates: ', this.candidates);
    });
  }

  cancel(){
    this.router.navigate(['/projects']);
  }

  addProject(project: Project){

    const skillIds: number[] = [];
    const candidateIds: number[] = [];

    for (let i = 0; i < this.skills.length; i++) {
      skillIds.push(this.skills[i].id);
    }
    for (let i = 0; i < this.candidates.length; i++) {
      candidateIds.push(this.candidates[i].id);
    }

    project.skillIds = skillIds;
    project.candidateIds = candidateIds;

    this.apiService.addProject(project).subscribe(response => {
      console.log(response); // Log the response to inspect its structure
      this.router.navigate(['/projects']);
    });

  }
  
}
