import { Component, OnInit } from '@angular/core';

import { BIOGRAPHY } from '../../mocks/biography-mock';
import { Biography } from '../../mocks/biography';

@Component({
  selector: 'app-sections',
  templateUrl: './sections.component.html',
  styleUrls: ['./sections.component.css']
})
export class SectionsComponent implements OnInit {
  biography: Biography[] = BIOGRAPHY;

  constructor() { }

  ngOnInit(): void {
  }

}
