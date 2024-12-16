import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ApiService } from './api.service';
import { Candidate } from './candidate';
import { CommonModule } from '@angular/common';
import { Skill } from './skill';
import { CandidateSkill } from './candidate-skill';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'talentmatch-frontend';

  public candidates: Candidate[] = [];
  public skills: Skill[] = []; 

  constructor(private apiService: ApiService) { }

  ngOnInit() {
    this.apiService.getAllCandidates().subscribe(response => {
      console.log(response); // Esto te permitirá inspeccionar la estructura en la consola
      this.candidates = response.candidates; // Ajusta según el nombre de la clave
      for (let index = 0; index < this.candidates.length; index++) {
        this.apiService.getSkillbyId(this.candidates[index].skills[0].skillId).subscribe(response => {
          console.log(response); // Esto te permitirá inspeccionar la estructura en la consola
          this.skills = response.skills; // Ajusta según el nombre de la clave
        });
        
      }
    });
  }


  
  
}
