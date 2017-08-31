import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { List } from '../list-view/list.model';
import { ListService } from '../list.service';
import { ListDataService } from '../list-data.service';

@Component({
  selector: 'app-create-list',
  templateUrl: './create-list.component.html',
  styleUrls: ['./create-list.component.css']
})

export class CreateListComponent implements OnInit {

  private listSubscription: Subscription;
  list: List = { name: '', owner: '', description: ' ', image: ' ' };
  image;
  imageValid = true;
  constructor(
    private listService: ListService,
    private listDataService: ListDataService,
    private router: Router) {
  }

  ngOnInit() {
  }

  loadImage(fileImage, imagePreview) {
    this.listService.loadImage(fileImage.target.files[0]).then((image64) => {
      if(fileImage.target.files[0].size/1000000 <= 4) {
        imagePreview.src = image64;
        this.image = image64;
        this.imageValid = true;
      }else{
        this.imageValid = false;
        this.list.image = ""
        imagePreview.src = "../../../assets/images/default_image.jpg";
      }   
    }).catch(error => {
      console.error(error);
    });
  }

  save() {   
    if(this.imageValid){
      this.list.image = this.image;
      this.listSubscription = this.listService.addList(this.list)
        .subscribe((list: List) => {
          this.listDataService.addCreatedList(list);
          this.router.navigate(['/lists', list._id, 'items']);
        });
    } 
  }
}