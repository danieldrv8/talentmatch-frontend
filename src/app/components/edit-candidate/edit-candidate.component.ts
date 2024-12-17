import { Component } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Candidate } from '../../interfaces/candidate';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-edit-candidate',
  imports: [FormsModule],
  templateUrl: './edit-candidate.component.html',
  styleUrl: './edit-candidate.component.css'
})
export class EditCandidateComponent {

  candidate: Candidate = {id: 0, candidateName: '', email: '', dasId: '', candidateSkills: []}; // Initialize with empty values

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
    this.apiService.updateCandidate(candidateId, candidate).subscribe(response => {
      console.log(response); // Log the response to inspect its structure
      this.router.navigate(['/']);
    });
  }

  loadCandidateDetails(candidateId: number) {
    this.apiService.getCandidateById(candidateId).subscribe(data => {
      this.candidate = data.candidate;
    });
  }
  
  
}
