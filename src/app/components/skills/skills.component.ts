import { Component, Input } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { Skill } from '../../interfaces/skill';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-skills',
  imports: [FormsModule],
  templateUrl: './skills.component.html',
  styleUrl: './skills.component.css'
})
export class SkillsComponent {

  @Input() user: any;
  public skills: Skill[] = [];

  constructor(private apiService: ApiService) { } 

  ngOnInit() {
    this.apiService.getAllSkills().subscribe(response => {
      console.log(response); // Log the response to inspect its structure
      this.skills = response.skills; // Assuming response.skills is the correct key
    });
  }

}
