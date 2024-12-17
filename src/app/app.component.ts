import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ApiService } from './api.service';
import { Candidate } from './candidate';
import { CommonModule } from '@angular/common';
import { Skill } from './skill';
import { CandidateSkill } from './candidate-skill';
import { Observable, forkJoin, from } from 'rxjs';
import { mergeMap, map, toArray } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'talentmatch-frontend';
  public candidates: Candidate[] = [];

  constructor(private apiService: ApiService) {}

  ngOnInit() {
    this.apiService.getAllCandidates().subscribe(response => {
      console.log(response); // Log the response to inspect its structure
      this.candidates = response.candidates; // Assuming response.candidates is the correct key
    });
  }
}
