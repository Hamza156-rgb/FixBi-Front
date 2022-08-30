import { Component, OnInit } from '@angular/core';
import { ConfigService } from 'src/providers/config/config.service';
import {  ActivatedRoute, Router,NavigationExtras } from '@angular/router';
@Component({
  selector: 'app-favourite-user',
  templateUrl: './favourite-user.component.html',
  styleUrls: ['./favourite-user.component.scss']
})
export class FavouriteUserComponent implements OnInit {
  searchResult :any = [];
  random = -1;
  constructor(public config: ConfigService, public router: Router) { }

  ngOnInit(): void {
    this.getFavourites();
  }
  getFavourites() {
    this.config.getHttp('getAllFavouritesByCustomerId?customer_id='+ localStorage.getItem('user_id'), '').then((data: any) => {
      this.searchResult = data.data;
      console.log(this.searchResult);
      if(this.searchResult.length == 0){
        this.random = 0;
      }else{
        this.random = -1;
      }
    })
  }
  viewProfile(profile:any){
    let navigationExtras: NavigationExtras = {
      state: {
       profile: JSON.stringify(profile),
        
      }
    };
    this.router.navigate(['viewProfile'],navigationExtras);
  }
}
