import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ApiService } from './services/api.service';
import { Candidate } from './interfaces/candidate';
import { CommonModule } from '@angular/common';
import { Skill } from './interfaces/skill';
import { CandidateSkill } from './interfaces/candidate-skill';
import { Observable, forkJoin, from } from 'rxjs';
import { mergeMap, map, toArray } from 'rxjs/operators';
import { CandidatesComponent } from "./components/candidates/candidates.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, CandidatesComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'talentmatch-frontend';
}
