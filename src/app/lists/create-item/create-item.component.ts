import { Component, OnInit, OnDestroy, Input, Output, EventEmitter} from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

import { Subscription } from 'rxjs/Subscription';

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
  private imageSubscription: Subscription;
  private listId: string;
  private item: Item = { name: '', price: 0, quantity: 0, responsible: '' };
  private newList: ListWrapper;
  image;
  constructor(
    private listService: ListService,
    private listDataService: ListDataService,
    private route: ActivatedRoute
   ) {
  }

  ngOnInit() {
  }

  save() {
    this.item.image = this.image;
    this.route.params.subscribe((param) => { this.listId = param['id']; });
    this.listService.addItem(this.listId, {item: this.item}).subscribe(
      newList => {
        const actualList = newList;
        actualList.item.forEach(element => {
          if (element.image) {
            this.imageSubscription = this.listService.getImageItems(element.image).subscribe((imageItem: string) => {
              element.image = imageItem;
            });
          }
        });
        this.listDataService.addItemInList(actualList);
        this.closeAddItem.emit({flag : false});
      }
    );
  }

  loadImage(fileImage, imagePreview) {
    this.listService.loadImage(fileImage.target.files[0]).then((image64) => {
      imagePreview.src = image64;
      this.image = image64;
    }).catch(error => {
      console.error(error);
    });
  }

  closeEvent (event) {
    this.closeAddItem.emit({flag : false});
  }
}
