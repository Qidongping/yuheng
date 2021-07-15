import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-leftnav',
  templateUrl: './leftnav.component.html',
  styleUrls: ['./leftnav.component.css']
})
export class LeftnavComponent implements OnInit {
  isCollapsed = false;
  constructor() { }

  ngOnInit(): void {
  }
  toggleCollapsed(): void {
    this.isCollapsed = !this.isCollapsed;
  }
}
