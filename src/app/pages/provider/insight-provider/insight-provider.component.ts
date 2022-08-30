import { Component, OnInit } from '@angular/core';
import { ConfigService } from 'src/providers/config/config.service';

@Component({
  selector: 'app-insight-provider',
  templateUrl: './insight-provider.component.html',
  styleUrls: ['./insight-provider.component.scss']
})
export class InsightProviderComponent implements OnInit {
  name: any = '';
  image: any = 'assets/img/download.png';
  last: any = '';
  email: any = '';
  phone: any = '';
  user_type: any = '';
  id = localStorage.getItem("user_id");
  jobs: any = '';
  review: any = '';


  constructor(public config: ConfigService) { }

  ngOnInit(): void {
    this.getUser(this.id);
    this.getJobsNumber(this.id);
    this.getReviews(this.id);
  }

  getUser(id: any) {

    this.config.getHttp('auth/getSingleProfessionalById?id=' + id, { id: id }).then((data: any) => {
      console.log(data);
      this.last = data.data[0].user_data[0].last_name;
      this.email = data.data[0].user_data[0].email;
      this.phone = data.data[0].user_data[0].phone;
      this.user_type = data.data[0].user_data[0].user_type;


      if (data.data[0].user_data[0].user_type == 4) {
        this.name = data.data[0].user_data[0].company_name;
      }
      else if (data.data[0].user_data[0].user_type == 3) {
        this.name = data.data[0].user_data[0].first_name;
        this.last = data.data[0].user_data[0].last_name;

      }

      if (data.data[0].user_data[0].profile_picture) {
        this.image = this.config.imgUrl + data.data[0].user_data[0].profile_picture;
      }
    })
  }

  getJobsNumber(id: any) {
    this.config.getHttp('auth/jobs/getInsightsProvider?user_id=' + id, { id: id }).then((data: any) => {
      this.jobs = data.data;
    })
  }

  getReviews(id: any) {
    this.config.getHttp('auth/jobReview/getReviewsProvider?user_id=' + id, { id: id }).then((data: any) => {
      this.review = data.data;
    })
  }

}
