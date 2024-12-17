import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Candidate } from '../../interfaces/candidate';

@Component({
  selector: 'app-add-candidate',
  imports: [FormsModule],
  templateUrl: './add-candidate.component.html',
  styleUrl: './add-candidate.component.css'
})
export class AddCandidateComponent {

  candidate: Candidate = {id: 0, candidateName: '', email: '', dasId: '', candidateSkills: []};

  constructor(private apiService: ApiService, private router: Router, private route: ActivatedRoute) {}
  
  cancel(){
    this.router.navigate(['/']);
  }

  addCandidate(candidate: Candidate){
    this.apiService.addCandidate(candidate).subscribe(response => {
      console.log(response); // Log the response to inspect its structure
      this.router.navigate(['/']);
    });
  }
}
