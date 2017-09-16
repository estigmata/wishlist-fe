import { Injectable } from '@angular/core';

import { Subject } from 'rxjs/Subject';

import { List, ListWrapper } from './list-view/list.model';

@Injectable()

export class ListDataService {

  private listUpdatedSource = new Subject<List>();
  private listUpdatedSourceByEdit = new Subject<any>();
  private itemUpdatedSource = new Subject<List>();

  listUpdatedByCreate$ = this.listUpdatedSource.asObservable();
  listUpdatedByEdit$ = this.listUpdatedSourceByEdit.asObservable();
  itemUpdated$ = this.itemUpdatedSource.asObservable();

  addCreatedList(list: List) {
    this.listUpdatedSource.next(list);
  }

  updateList(list: List) {
    this.listUpdatedSourceByEdit.next(list);
  }

  addItemInList(item: List) {
    this.itemUpdatedSource.next(item);
  }


}
