import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-content',
  template: '<ng-content></ng-content>',
  styleUrls: ['./content.component.css']
})
export class ContentComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
