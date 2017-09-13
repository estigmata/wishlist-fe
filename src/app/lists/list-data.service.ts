import { Injectable } from '@angular/core';

import { Subject } from 'rxjs/Subject';

import { List, ListWrapper } from './list-view/list.model';

@Injectable()

export class ListDataService {

  private listUpdatedSource = new Subject<List>();
  private itemUpdatedSource = new Subject<List>();

  listUpdated$ = this.listUpdatedSource.asObservable();
  itemUpdated$ = this.itemUpdatedSource.asObservable();

  addCreatedList(list: List) {
    this.listUpdatedSource.next(list);
  }

  addItemInList(item: List) {
    this.itemUpdatedSource.next(item);
  }
}
