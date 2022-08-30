import { Component, OnInit } from '@angular/core';
import { ConfigService } from 'src/providers/config/config.service';
import { NavigationExtras, Router } from '@angular/router';
import { SharedDataService } from 'src/providers/shared-data/shared-data.service';

@Component({
  selector: 'app-jobs-completed-provider',
  templateUrl: './jobs-completed-provider.component.html',
  styleUrls: ['./jobs-completed-provider.component.scss']
})
export class JobsCompletedProviderComponent implements OnInit {

  constructor(public config: ConfigService, public router: Router,
     public shared: SharedDataService,
  ) { }


  categories = [];
  searchResult: any = [];
  compareResult: any = [];
  id = localStorage.getItem('user_id');


  ngOnInit(): void {


    this.config.getHttp('auth/jobs/getAllJobsByProvider?user_id=' + this.id, '').then((data: any) => {
      console.log(data.data)
      this.searchResult = data.data;
      this.compareResult = data.data;
      this.getCategory();
      // console.log(this.searchResult);
    })
  }
  viewJob(job,profile) {
    let navigationExtras: NavigationExtras = {
      state: {
        job_id: job,
        profile_id: profile,

      }
    };
    this.router.navigate(['jobs-assigned'], navigationExtras);
  }

  viewProfile(profile) {
    let navigationExtras: NavigationExtras = {
      state: {
        profile_id: profile,

      }
    };
    this.router.navigate(['jobs-assigned'], navigationExtras);
  }


  getCategory() {
    this.config.getHttp('category/getAllCategories', '').then((data: any) => {
      this.categories = data.data;
    })
  }







  

}
