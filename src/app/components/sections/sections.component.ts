import { Component, OnInit } from '@angular/core';

import { Biography } from '../../mocks/biography';
import { BIOGRAPHY } from '../../mocks/biography-mock';

import { Skills } from '../../mocks/skills';
import { SKILLS } from '../../mocks/skills-mock';

import { Projects } from '../../mocks/projects';
import { PROJECTS } from '../../mocks/projects-mock';

@Component({
  selector: 'app-sections',
  templateUrl: './sections.component.html',
  styleUrls: ['./sections.component.css']
})
export class SectionsComponent implements OnInit {
  biography: Biography[] = BIOGRAPHY;
  skills: Skills[] = SKILLS;
  projects: Projects[] = PROJECTS;
  
  constructor() { }

  ngOnInit(): void {
  }

}
