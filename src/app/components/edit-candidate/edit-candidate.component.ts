import { Component } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Candidate } from '../../interfaces/candidate';
import { FormsModule } from '@angular/forms';
import { Skill } from '../../interfaces/skill';
import { CandidateSkill } from '../../interfaces/candidate-skill';

@Component({
  selector: 'app-edit-candidate',
  imports: [FormsModule],
  templateUrl: './edit-candidate.component.html',
  styleUrl: './edit-candidate.component.css'
})
export class EditCandidateComponent {

  candidate: Candidate = {id: 0, candidateName: '', email: '', dasId: '', candidateSkills: []}; // Initialize with empty values
  public skills: Skill[] = [];

  constructor(private apiService: ApiService, private router: Router, private route: ActivatedRoute) {}

  ngOnInit() {
    const candidateId = this.route.snapshot.params['candidateId'];
    if (candidateId) {
      this.loadCandidateDetails(candidateId);
    }
  }

  cancel(){
    this.router.navigate(['/']);
  }

  updateCandidate(candidateId: number, candidate: Candidate){
    const candidataSkills: CandidateSkill[] = [];
  
  for (let index = 0; index < this.skills.length; index++) {
    console.log(this.skills[index].id);
    if (this.skills[index].isSelected) {
      candidataSkills.push({
        skillId: this.skills[index].id,
        lastYearsOfExperience: this.skills[index].lastYearUsed,
        proficiency: this.skills[index].proficiency,
        yearsOfExperience: this.skills[index].yearsOfExperience
      } as CandidateSkill);
    }
  }
  
  candidate.candidateSkills = candidataSkills;
    this.apiService.updateCandidate(candidateId, candidate).subscribe(response => {
      console.log(response); // Log the response to inspect its structure
      this.router.navigate(['/']);
    });
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

  addSkill() {
    let skillName = window.prompt('Enter the skill name:', '');

    if (skillName !== null && skillName != '') {
      
      console.log(skillName);

    this.apiService.getSkillByName(skillName).subscribe(data => {
      if (data.skill.skillId == null ) {
        this.apiService.addSkill(skillName);
        this.apiService.getSkillbyId(data.skill.id).subscribe(data => {
          this.skills.push({
            id: data.skill.id,
            skillName: data.skill.skillName,
            yearsOfExperience: 0,
            proficiency: '',
            lastYearUsed: 0,
            isSelected: false
          });
        });
      }
    });
      
    } else {
      window.alert('The skill must have a name');
      return;
    }

    
  }
}
