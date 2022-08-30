import { Component, OnInit } from '@angular/core';
import { ConfigService } from 'src/providers/config/config.service';
@Component({
  selector: 'app-provider-profile-card',
  templateUrl: './provider-profile-card.component.html',
  styleUrls: ['./provider-profile-card.component.scss']
})
export class ProviderProfileCardComponent implements OnInit {
  name: any = '';
  image:any = 'assets/img/download.png';
  id = localStorage.getItem("user_id");
  constructor( public config: ConfigService) { }

  ngOnInit(): void {
    this.getUser(this.id);
  }
  getUser(id: any) {

    this.config.getHttp('auth/getSingleProfessionalById?id=' + id, { id: id }).then((data: any) => {
      if(data.data[0].user_data[0].user_type == 4){
        this.name = data.data[0].user_data[0].company_name;
      }
     else if(data.data[0].user_data[0].user_type == 3){
      this.name = data.data[0].user_data[0].first_name;
     }

      if (data.data[0].user_data[0].profile_picture) {
        this.image = this.config.imgUrl + data.data[0].user_data[0].profile_picture;
      }
    })
  }
}
