import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth.service';
import { Observable } from 'rxjs';
import { ConfigService } from 'src/providers/config/config.service';

@Component({
  selector: 'app-profile-user',
  templateUrl: './profile-user.component.html',
  styleUrls: ['./profile-user.component.scss']
})
export class ProfileUserComponent implements OnInit {

  first_name: any = '';
  phone: any = '';
  last_name: any = '';
  email: any = '';
  loggedIn: any = '';
  image:any = 'assets/img/download.png';
  isLoggedIn$!: Observable<boolean>;
  id = localStorage.getItem("user_id");


  formData = {
    first_name: '',
    phone: '',
    last_name: '',
    email: '',
    id: '',
  }


  constructor(private authService: AuthService, public config: ConfigService,) { }

  ngOnInit(): void {
    this.isLoggedIn$ = this.authService.isLoggedIn;
    this.getUser(this.id);
  }

  // getUser(id: any) {
  //   console.log(this.id);
  //   this.config.getHttp('auth/getSingleCustomerById?id' + id, { id: id }).then((data: any) => {
  //     console.log(data);
  //     this.first_name = data;
  //     this.phone = data.data;
  //     this.last_name = data.data;
  //     this.email = data.data;
  //   })
  // }


  getUser(id: any) {
    this.config.getHttp('auth/getSingleCustomerById?id=' + id, { id: id }).then((data: any) => {
      this.formData.first_name = data.user.first_name;
      this.formData.phone = data.user.phone;
      this.formData.last_name = data.user.last_name;
      this.formData.email = data.user.email;
      if (data.user.profile_picture) {
        this.image = this.config.imgUrl + data.user.profile_picture;
      }
    })
  }


}
