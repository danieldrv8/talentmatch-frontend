import { Routes } from '@angular/router';
import { EditCandidateComponent } from './components/edit-candidate/edit-candidate.component';
import { CandidatesComponent } from './components/candidates/candidates.component';

export const routes: Routes = [
  {
    path: 'edit/:candidateId', component: EditCandidateComponent
  },
  {
    path: '', component: CandidatesComponent
  }
];
