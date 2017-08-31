import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { ListService } from './../list.service';
import { ListDataService } from '../list-data.service';
import { List } from './list.model';
import {NgbModal, NgbModalRef} from '@ng-bootstrap/ng-bootstrap';
import {ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-list-view',
  templateUrl: './list-view.component.html',
  styleUrls: ['./list-view.component.css']
})
export class ListViewComponent implements OnInit, OnDestroy {

  @Input() userName: string;
  lists: List[];
  selectedList: List;
  listSubscription: Subscription;
  params: string;
  selectedListToDelete: List;
  modalRef: NgbModalRef;

  constructor(
    private listService: ListService,
    private listDataService: ListDataService,
    private router: Router,
    private modalService: NgbModal) {

  }

  ngOnInit() {
    this.listSubscription = this.listService.getLists().subscribe(
      (nameLists: List[]) => this.lists = nameLists,
      (error: Error) => this.lists = []
    );
    this.listDataService.listUpdated$.subscribe(
      (newList: List) => this.lists.push(newList)
    );
  }

  ngOnDestroy() {
    if (this.listSubscription) {
      this.listSubscription.unsubscribe();
    }
  }

  selectList(list: List) {
    this.selectedList = list;
    this.router.navigate(['/lists', this.selectedList._id, 'items']);
  }

  onDeleteList () {
    this.listService.deleteList(`${this.selectedListToDelete._id}`).subscribe(
      () => this.lists = this.lists.filter(list => list._id !== this.selectedListToDelete._id),
      error => { }
    );

  }

  open(content, list) {
    this.selectedListToDelete = list;
    this.modalRef = this.modalService.open(content);
  }

  closeModal() {
    this.modalRef.close();
  }

}
