import { Routes } from '@angular/router';
import { EditCandidateComponent } from './components/edit-candidate/edit-candidate.component';
import { CandidatesComponent } from './components/candidates/candidates.component';
import { AddCandidateComponent } from './components/add-candidate/add-candidate.component';
import { ViewCandidateComponent } from './view-candidate/view-candidate.component';
import { SkillsComponent } from './components/skills/skills.component';
import { ProjectsComponent } from './components/projects/projects.component';

export const routes: Routes = [
  {
    path: 'edit/:candidateId', component: EditCandidateComponent
  },
  {
    path: '', component: CandidatesComponent
  },
  {
    path: 'add', component: AddCandidateComponent
  },
  {
    path: 'view/:id', component: ViewCandidateComponent
  },
  {
    path: 'skills', component: SkillsComponent
  },
  {
    path: 'projects', component: ProjectsComponent
  }
];
