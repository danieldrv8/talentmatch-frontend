import { Component, Input } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { Skill } from '../../interfaces/skill';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-skills',
  imports: [FormsModule],
  templateUrl: './skills.component.html',
  styleUrl: './skills.component.css'
})
export class SkillsComponent {
  public skills: Skill[] = [];

  constructor(private apiService: ApiService, private router: Router) { } 

  ngOnInit() {
    this.apiService.getAllSkills().subscribe(response => {
      console.log(response); // Log the response to inspect its structure
      this.skills = response.skills; // Assuming response.skills is the correct key
    });
  }

  addSkill() {
    let skillName = window.prompt('Enter the skill name:', '');

    if (skillName == null) {
      return;
    }

    console.log(skillName);

    if (this.skills.find(skill => skill.skillName === skillName)) {
      alert('Skill already exists');
      return;
    }

    this.apiService.addSkill(skillName).subscribe(response => {
      console.log(response); // Log the response to inspect its structure
      window.location.reload();
    });
      
    }


  editSkill(skillId: number) {
    // todo
  }

  deleteSkill(skillId: number) {
    this.apiService.deleteSkill(skillId).subscribe(response => {
      console.log(response); // Log the response to inspect its structure
      window.location.reload();
    });
  }

}
