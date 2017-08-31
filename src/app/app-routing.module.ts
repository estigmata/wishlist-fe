import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HomepageComponent } from './homepage/homepage.component';
import { ListsComponent } from './lists/lists.component';
import { ItemsViewComponent } from './lists/items-view/items-view.component';
import { CreateListComponent } from './lists/create-list/create-list.component';
import { EditListComponent } from './lists/edit-list/edit-list.component';

@NgModule({
  imports: [
    RouterModule.forRoot([
      {
        path: 'lists',
        component: ListsComponent,
        children: [
          {
            path: ':id/items',
            component: ItemsViewComponent
          },
          {
            path: ':id/edit',
            component: EditListComponent
          },
          {
            path: 'create',
            component: CreateListComponent
          }
        ]
      },
      {
        path: 'home',
        component: HomepageComponent
      },
      {
        path: '',
        redirectTo: 'lists',
        pathMatch: 'full'
      }
    ], { useHash: false })
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
