import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ListsComponent } from './lists.component';
import { ListViewComponent } from './list-view/list-view.component';
import { ListService } from './list.service';
import { ListDataService } from './list-data.service';
import { ItemsViewComponent } from './items-view/items-view.component';
import { ItemViewComponent } from './item-view/item-view.component';
import { CreateListComponent } from './create-list/create-list.component';
import { CreateItemComponent } from './create-item/create-item.component';

import {NgbModule, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { EditListComponent } from './edit-list/edit-list.component';

@NgModule({
  imports: [
    CommonModule,
    TranslateModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule
  ],
  declarations: [
    ListsComponent,
    ListViewComponent,
    ItemsViewComponent,
    ItemViewComponent,
    CreateListComponent,
    ListsComponent,
    CreateItemComponent,
    EditListComponent
  ],
  providers: [
    ListService,
    ListDataService,
  ],
  exports: [
    ListViewComponent,
    ItemsViewComponent,
    ItemViewComponent,
    CreateListComponent,
    ListsComponent,
    CreateItemComponent
  ]

})

export class ListsModule {}
