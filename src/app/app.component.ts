import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ApiService } from './api.service';
import { Candidate } from './candidate';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'talentmatch-frontend';

  public candidates: Candidate[] = [];

  constructor(private apiService: ApiService) { }

  ngOnInit() {
    this.apiService.getAllCandidates().subscribe(candidates => this.candidates = candidates);
  }
}
