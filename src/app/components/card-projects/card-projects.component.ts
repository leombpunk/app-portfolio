import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-card-projects',
  templateUrl: './card-projects.component.html',
  styleUrls: ['./card-projects.component.css']
})
export class CardProjectsComponent implements OnInit {
  @Input() imageProject: string = "";
  @Input() titleProject: string = "";
  @Input() descripcionProject: string = "";
  

  constructor() { }

  ngOnInit(): void {
  }

}
