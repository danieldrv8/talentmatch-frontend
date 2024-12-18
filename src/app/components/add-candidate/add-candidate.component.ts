import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Candidate } from '../../interfaces/candidate';
import { Skill } from '../../interfaces/skill';
import { CandidateSkill } from '../../interfaces/candidate-skill';

@Component({
  selector: 'app-add-candidate',
  imports: [FormsModule],
  templateUrl: './add-candidate.component.html',
  styleUrl: './add-candidate.component.css'
})
export class AddCandidateComponent {

  candidate: Candidate = {id: 0, candidateName: '', email: '', dasId: '', candidateSkills: []};
  public skills: Skill[] = [];

  constructor(private apiService: ApiService, private router: Router, private route: ActivatedRoute) {}
  
  ngOnInit() {
    this.apiService.getAllSkills().subscribe(response => {
      console.log(response); // Log the response to inspect its structure
      this.skills = response.skills; // Assuming response.skills is the correct key
    });
  }

  cancel(){
    this.router.navigate(['/']);
  }

  addCandidate(candidate: Candidate){
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
    this.apiService.addCandidate(candidate).subscribe(response => {
      console.log(response); // Log the response to inspect its structure
      this.router.navigate(['/']);
    });
  }
}
