import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../environments/environment';
import { List, ListWrapper, ListPostWrapper } from './list-view/list.model';

@Injectable()

export class ListService {

  constructor( private http: HttpClient ) {

  }

  getLists(): Observable<List[]> {
    return this.http.get<ListWrapper>( `${environment.backendPath}lists/`).map(
      (wrapper: ListWrapper) => {
        return wrapper.data;
      },
      (error) => {

      }
    );
  }

  getListItems(idlist: string): Observable<List[]> {
    return this.http.get<ListWrapper>(`${environment.backendPath}lists/${idlist}/items`)
      .map(
      (list: ListWrapper) => {
        return list.data;
      }
    );
  }

  addList(list): Observable<List> {
    return this.http.post(`${environment.backendPath}lists/`, list, { headers: new HttpHeaders().set('Content-Type', 'application/json') }).
    map((newList: ListPostWrapper) => {
      const customList = newList.data;
      const dataList: List = {
        _id: customList.id,
        name: customList.attributes.name,
        owner: customList.attributes.owner,
        description: customList.attributes.description
      };
      return dataList;
    });
  }

  loadImage(imageElement) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        resolve(reader.result);
      };
      reader.readAsDataURL(imageElement);
    });
  }

  deleteList(listId): Observable<List> {
    return this.http.delete <List>(`${environment.backendPath}lists/${listId}`);
  }

  addItem(listId, item): Observable<ListWrapper> {
    return this.http.post <ListWrapper> (
      `${environment.backendPath}lists/${listId}/items`,
      item,
      {headers: new HttpHeaders().set('Content-Type',
      'application/json')}).
    map ((list: ListWrapper) => {
      return list;
    });
  }
}
