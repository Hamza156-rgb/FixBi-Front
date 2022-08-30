import { Component, OnInit } from '@angular/core';
import { ConfigService } from 'src/providers/config/config.service';

@Component({
  selector: 'app-insight-user',
  templateUrl: './insight-user.component.html',
  styleUrls: ['./insight-user.component.scss']
})
export class InsightUserComponent implements OnInit {

  name: any = '';
  last: any = '';
  email: any = '';
  phone:any='';
  image: any = 'assets/img/download.png';
  id = localStorage.getItem("user_id");
  jobs: any = '';

  constructor(public config: ConfigService) { }

  ngOnInit(): void {
    this.getUser(this.id);
    this.getJobsNumber(this.id)
  }


  getUser(id: any) {

    this.config.getHttp('auth/getSingleCustomerById?id=' + id, { id: id }).then((data: any) => {
      console.log(data);

      this.name = data.user.first_name;
      this.last = data.user.last_name;
      this.email = data.user.email;
      this.phone = data.user.phone;

      if (data.user.profile_picture) {
        this.image = this.config.imgUrl + data.user.profile_picture;
      }
    })
  }

  getJobsNumber(id: any) {
    this.config.getHttp('auth/jobs/getInsightsUser?user_id=' + id, { id: id }).then((data: any) => {
      console.log(data);
      this.jobs = data.data;
    })
  }

}
