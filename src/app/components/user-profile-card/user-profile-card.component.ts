import { Component, OnInit } from '@angular/core';
import { ConfigService } from 'src/providers/config/config.service';
@Component({
  selector: 'app-user-profile-card',
  templateUrl: './user-profile-card.component.html',
  styleUrls: ['./user-profile-card.component.scss']
})
export class UserProfileCardComponent implements OnInit {
  name: any = '';
  image:any = 'assets/img/download.png';
  id = localStorage.getItem("user_id");
  constructor(public config: ConfigService) { }

  ngOnInit(): void {
    this.getUser(this.id);
  }
  getUser(id: any) {

    this.config.getHttp('auth/getSingleCustomerById?id=' + id, { id: id }).then((data: any) => {

      this.name = data.user.first_name;

      if (data.user.profile_picture) {
        this.image = this.config.imgUrl + data.user.profile_picture;
      }
    })
  }
}
