import { Component, OnInit, Input } from '@angular/core';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-button-edit',
  templateUrl: './button-edit.component.html',
  styleUrls: ['./button-edit.component.css']
})
export class ButtonEditComponent implements OnInit {
  faPenToSquare = faPenToSquare;
  @Input() btnEditID: string = "pitos";
  constructor() { }

  ngOnInit(): void {
  }

}
