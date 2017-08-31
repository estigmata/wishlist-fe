import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { List } from '../list-view/list.model';
import { ListService } from '../list.service';
import { ListDataService } from '../list-data.service';

@Component({
  selector: 'app-edit-list',
  templateUrl: './edit-list.component.html',
  styleUrls: ['./edit-list.component.css']
})
export class EditListComponent implements OnInit {

  private listId: string;
  public dataList;
  public error;
  public list: List = { name: '', owner: '', description: ' ', image: ' ' };

  constructor(private listService: ListService, private route: ActivatedRoute) {
    this.route.params.subscribe(param => {
      this.listId = param['id'];
      this.getDataList(this.listId);
    });
  }

  ngOnInit() {
    this.route.params.subscribe(param => {
      this.listId = param['id'];
      this.getDataList(this.listId);
    });
  }

  getDataList(id) {
    this.listService.getListItems(this.listId)
      .subscribe(
        (list: List[]) => {
          this.dataList = list;
          this.dataList.description.trim();
        }, error => this.error
      );
  }

  dataLoad() {
    this.list.name = this.dataList.name;
  }

  save(name) {
    console.log(name);
  }

}
