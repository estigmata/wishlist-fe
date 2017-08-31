import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';

import { Subscription } from 'rxjs/Subscription';

import { ListService } from './../list.service';
import { List, ListWrapper } from '../list-view/list.model';
import { ListDataService } from '../list-data.service';
import { CreateItemComponent } from '../create-item/create-item.component';

@Component({
  selector: 'app-items-view',
  templateUrl: './items-view.component.html',
  styleUrls: ['./items-view.component.css']
})

export class ItemsViewComponent implements OnInit, OnDestroy {

  public items;
  public error;
  public idList = '';
  private listSubscription: Subscription;
  public viewAddItem = false;

  constructor(
    private listService: ListService,
    private route: ActivatedRoute,
    private routeNavigate: Router,
    private listDataService: ListDataService,
    private modalService: NgbModal) {
    this.route.params.subscribe((param) => {
      this.idList = param['id'];
      this.getItemsForList(this.idList);
    });
  }

  ngOnInit() {
    this.route.params.subscribe((param) => { this.idList = param['id']; });
    this.getItemsForList(this.idList);
    this.listDataService.itemUpdated$.subscribe(
      (newList) => {
        this.items = newList.data;
      }
    );
  }

  getItemsForList(idList) {
    this.listSubscription = this.listService.getListItems(idList)
      .subscribe((listItems: List[]) => {
      this.items = listItems;
    },
    error => {
      this.error = error;
    });
  }

  ngOnDestroy() {
    if (this.listSubscription) {
      this.listSubscription.unsubscribe();
    }
  }

  createItemClick() {
    this.viewAddItem = true;
  }

  closeAdd(event) {
    this.viewAddItem = event.flag;
  }
}
