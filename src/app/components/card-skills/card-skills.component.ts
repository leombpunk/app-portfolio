import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-card-skills',
  templateUrl: './card-skills.component.html',
  styleUrls: ['./card-skills.component.css']
})
export class CardSkillsComponent implements OnInit {
  @Input() titleSkill: string = "";
  @Input() nivelSkill: number = 0;
  @Input() senioritySkill: string = "";
  
  constructor() { }

  ngOnInit(): void {
  }

}
