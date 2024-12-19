import { Component } from '@angular/core';
import { Project } from '../../interfaces/project';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-view-project',
  imports: [CommonModule],
  templateUrl: './view-project.component.html',
  styleUrl: './view-project.component.css'
})
export class ViewProjectComponent {

  public project: Project = {
    id: 0,
    projectName: '',
    skillIds: [],
    candidateIds: [],
    skillNames: [],
    candidateNames: []
  };

  public skillNames: string[] = [];
  public candidateNames: string[] = [];

  constructor(private route: ActivatedRoute, private apiService: ApiService) { }

  ngOnInit() {
    this.apiService.getProjectById(this.route.snapshot.params['id']).subscribe((response) => {
      console.log(response);
      this.project = response;
      this.loadData();
    });
  }

  loadData(){
    if(this.project.skillIds.length > 0){
      for(let i = 0; i < this.project.skillIds.length; i++){
        this.apiService.getSkillbyId(this.project.skillIds[i]).subscribe(data =>{
          console.log(data.skill.skillName);
          this.skillNames.push(data.skill.skillName);
        });
      }
    }
    if(this.project.candidateIds.length > 0){
      for(let i = 0; i < this.project.candidateIds.length; i++){
        this.apiService.getCandidateById(this.project.candidateIds[i]).subscribe(data =>{
          console.log(data.candidate.candidateName);
          this.candidateNames.push(data.candidate.candidateName);
        });
      }
    }
  }



}
