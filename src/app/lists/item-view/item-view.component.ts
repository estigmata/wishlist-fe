import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-item-view',
  templateUrl: './item-view.component.html',
  styleUrls: ['./item-view.component.css']
})
export class ItemViewComponent implements OnInit {
  @Input() item;
  constructor() { }

  ngOnInit() {
  }
}

