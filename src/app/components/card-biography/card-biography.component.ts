import { Component, OnInit, Input } from '@angular/core';
import { faLinkedin, faGithub } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-card-biography',
  templateUrl: './card-biography.component.html',
  styleUrls: ['./card-biography.component.css']
})
export class CardBiographyComponent implements OnInit {
  faLinkedin = faLinkedin;
  faGithub = faGithub;
  faEnvelope = faEnvelope;

  @Input() githubLink: string = "";
  @Input() linkedinLink: string = "";
  @Input() imageURL: string = "";
  @Input() titleBio: string = "";
  @Input() descripcionBio: string = "";

  constructor() { }

  ngOnInit(): void {
  }

}
