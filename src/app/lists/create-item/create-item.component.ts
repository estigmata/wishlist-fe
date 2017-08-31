import { Component, OnInit, OnDestroy, Input, Output, EventEmitter} from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { ListService } from '../list.service';
import { List, ListWrapper, Item } from '../list-view/list.model';
import { ListDataService } from '../list-data.service';


@Component({
  selector: 'app-create-item',
  templateUrl: './create-item.component.html',
  styleUrls: ['./create-item.component.css']
})


export class CreateItemComponent implements OnInit {
  @Input () viewAddItem;
  @Output () closeAddItem = new EventEmitter();
  private listId: string;
  private item: Item = { name: '', price: 0, quantity: 0, responsible: '' };
  private newList: ListWrapper;
  
  constructor(
    private listService: ListService,
    private listDataService: ListDataService,
    private route: ActivatedRoute
   ) {
  }

  ngOnInit() {
  }

  save() {
    this.route.params.subscribe((param) => { this.listId = param['id']; });
    this.listService.addItem(this.listId, {item: this.item}).subscribe(
      newList => {
        this.newList = newList;
        this.listDataService.addItemInList(this.newList);
        this.closeAddItem.emit({flag : false});
      },
      error => {  }
    );
  }

  closeEvent (event) {
    this.closeAddItem.emit({flag : false});
  }
}
