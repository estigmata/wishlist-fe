import { Injectable } from '@angular/core';

import { Subject } from 'rxjs/Subject';

import { List, ListWrapper } from './list-view/list.model';

@Injectable()

export class ListDataService {

  private listUpdatedSource = new Subject<List>();
  private itemUpdatedSource = new Subject<ListWrapper>();

  listUpdated$ = this.listUpdatedSource.asObservable();
  itemUpdated$ = this.itemUpdatedSource.asObservable();

  addCreatedList(list: List) {
    this.listUpdatedSource.next(list);
  }

  addItemInList(item: ListWrapper) {
    this.itemUpdatedSource.next(item);
  }
}
