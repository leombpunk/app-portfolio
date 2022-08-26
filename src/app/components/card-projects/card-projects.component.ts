import { Component, OnInit, Input } from '@angular/core';
import { faBook, faGlobe } from '@fortawesome/free-solid-svg-icons';
import { Project } from '../../mocks/projects';
@Component({
  selector: 'app-card-projects',
  templateUrl: './card-projects.component.html',
  styleUrls: ['./card-projects.component.css']
})
export class CardProjectsComponent implements OnInit {
  
  faBook = faBook;
  faGlobe = faGlobe;

  @Input() imageProject: string = "";
  @Input() titleProject: string = "";
  @Input() descripcionProject: string = "";
  @Input() inicioProject: string = "";
  @Input() finProject: string = "";
  @Input() enlaceProject: string = "";
  @Input() sitioProject: string = "";

  @Input() projectData: Project = new Project();
  
  constructor() { }

  ngOnInit(): void {

  }

}
