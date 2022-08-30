import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth.service';
import { Observable } from 'rxjs';
import { ConfigService } from 'src/providers/config/config.service';
import { NavigationExtras, Router } from '@angular/router';

@Component({
  selector: 'app-view-job-profile',
  templateUrl: './view-job-profile.component.html',
  styleUrls: ['./view-job-profile.component.scss']
})
export class ViewJobProfileComponent implements OnInit {


  first_name: any = '';
  phone: any = '';
  last_name: any = '';
  email: any = '';
  loggedIn: any = '';
  image: any = 'assets/img/download.png';
  isLoggedIn$!: Observable<boolean>;
  id = 0; 


  formData = {
    first_name: '',
    phone: '',
    last_name: '',
    email: '',
    id: '',
  }
user = {
  uid:0,
  name:'',
}

  constructor(private authService: AuthService, public config: ConfigService,public router: Router) { 
    if(this.router.getCurrentNavigation().extras.state)
    {
      this.id = this.router.getCurrentNavigation()?.extras?.state?.profile_id;
    }
    else{
      this.router.navigate(['jobListingUser']);
    }
  
  }

  ngOnInit(): void {
    this.isLoggedIn$ = this.authService.isLoggedIn;
    this.getUser(this.id);
  }




  getUser(id: any) {
    this.config.getHttp('auth/getSingleCustomerById?id='+ id, { id: id }).then((data: any) => {
      // console.log(data)
      this.formData.first_name = data.user.first_name;
      this.formData.phone = data.user.phone;
      this.formData.last_name = data.user.last_name;
      this.formData.email = data.user.email;
      if (data.user.profile_picture) {
        this.image = this.config.imgUrl + data.user.profile_picture;
      }
    })
  }
  startChat(user){
    this.user.uid = this.id;
    this.user.name = user.first_name + ' ' + user.last_name;
    let navigationExtras: NavigationExtras = {
      state: {
        user: JSON.stringify(this.user),

      }
    };
    this.router.navigate(['inboxProvider'], navigationExtras);

  }


}
