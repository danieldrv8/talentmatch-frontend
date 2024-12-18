import { Component } from '@angular/core';
import { Candidate } from '../../interfaces/candidate';
import { ApiService } from '../../services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-candidates',
  imports: [],
  templateUrl: './candidates.component.html',
  styleUrl: './candidates.component.css'
})
export class CandidatesComponent {

  public candidates: Candidate[] = [];
  
  constructor(private apiService: ApiService, private router: Router) {}

  ngOnInit() {
    this.apiService.getAllCandidates().subscribe(response => {
      console.log(response); // Log the response to inspect its structure
      this.candidates = response.candidates; // Assuming response.candidates is the correct key
    });
  }

  editCandidate(candidateId: number) {
    this.router.navigate(['/edit', candidateId]);
  }

  viewCandidate(candidateId: number) {
    this.router.navigate(['/view', candidateId]);
  }

  addCandidate() {
    this.router.navigate(['/add']);
  }
}
