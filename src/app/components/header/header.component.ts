import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  @Output() onLogOutEvent: EventEmitter<any> = new EventEmitter();

  @Input() isLogged: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

  onLogOut(){
    //intentar usar un eventemiter
    console.log("emitiendo");
    this.onLogOutEvent.emit();
    this.isLogged = false;
  }

}
