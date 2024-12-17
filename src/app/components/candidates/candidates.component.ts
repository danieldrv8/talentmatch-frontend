import { Component } from '@angular/core';
import { Candidate } from '../../interfaces/candidate';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-candidates',
  imports: [],
  templateUrl: './candidates.component.html',
  styleUrl: './candidates.component.css'
})
export class CandidatesComponent {

  public candidates: Candidate[] = [];
  
    constructor(private apiService: ApiService) {}
  
    ngOnInit() {
      this.apiService.getAllCandidates().subscribe(response => {
        console.log(response); // Log the response to inspect its structure
        this.candidates = response.candidates; // Assuming response.candidates is the correct key
      });
    }
}
