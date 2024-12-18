import { Component } from '@angular/core';
import { Candidate } from '../interfaces/candidate';
import { Skill } from '../interfaces/skill';
import { ApiService } from '../services/api.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-view-candidate',
  imports: [],
  templateUrl: './view-candidate.component.html',
  styleUrl: './view-candidate.component.css'
})
export class ViewCandidateComponent {

  candidate: Candidate = {id: 0, candidateName: '', email: '', dasId: '', candidateSkills: []}; // Initialize with empty values
  public skills: Skill[] = [];
  constructor(private apiService: ApiService, private router: Router, private route: ActivatedRoute) {}

  ngOnInit() {
    const candidateId = this.route.snapshot.params['id'];
    if (candidateId) {
      this.loadCandidateDetails(candidateId);
    }
  }
  
  loadCandidateDetails(candidateId: number) {

    this.apiService.getCandidateCS(candidateId).subscribe(data => {
      this.candidate = data.candidate;
      for (let index = 0; index < this.candidate.candidateSkills.length; index++) {
        const element = this.candidate.candidateSkills[index];
        console.log('Element:' + element);
        this.apiService.getSkillbyId(element.skillId).subscribe(data => {
          this.skills.push({id: element.skillId, 
            skillName: data.skill.skillName,
            yearsOfExperience: element.yearsOfExperience, 
            proficiency: element.proficiency, 
            lastYearUsed: element.lastYearsOfExperience,
            isSelected: true}
          );
        });
      }
    });
  }

  goBack(){
    this.router.navigate(['/']);
  }

}
