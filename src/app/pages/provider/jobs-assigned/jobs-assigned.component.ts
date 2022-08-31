import { Component, OnInit } from '@angular/core';
import { ConfigService } from 'src/providers/config/config.service';
import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';
import { AuthService } from 'src/app/auth.service';
import { SharedDataService } from 'src/providers/shared-data/shared-data.service';

@Component({
  selector: 'app-jobs-assigned',
  templateUrl: './jobs-assigned.component.html',
  styleUrls: ['./jobs-assigned.component.scss']
})
export class JobsAssignedComponent implements OnInit {


  submitted = false;

  customerData = {
    first_name: '',
    phone: '',
    last_name: '',
    email: '',
    id: '',
  }
  id = 0;
  image: any = 'assets/img/download.png';
  user = {
    uid: 0,
    name: '',
  }
  formData = {
    job_title: '',
    category: { name: '' },
    sub_category: { name: '' },
    country: { name: '' },
    city: { name: '' },
    region: { name: '' },
    experience: '',
    salary: '',
    job_type: '',
    qualification: '',
    language: '',
    requirements: '',
    user_id: localStorage.getItem("user_id"),
    keyword: '',
    job_id: 0
  }
  config1 = {
    displayKey: "name",
    search: true,
    placeholder: 'Category',
    height:'300px'
  };
  config2 = {
    displayKey: "name", // if objects array passed which key to be displayed defaults to description
    search: true,
    placeholder: 'Sub Category',
    height:'300px'
  };
  config3 = {
    displayKey: "name", // if objects array passed which key to be displayed defaults to description
    search: true,
    placeholder: 'Country',
  };
  config4 = {
    displayKey: "name", // if objects array passed which key to be displayed defaults to description
    search: true,
    placeholder: 'City',
  };


  config5 = {
    displayKey: "name", // if objects array passed which key to be displayed defaults to description
    search: true,
    placeholder: 'Region',
  };
  categories = [];
  sub_categories = [];
  countries = [];
  city = [];
  region = [];


  constructor(

    public config: ConfigService,
    public router: Router,
    private authService: AuthService,
    public shared: SharedDataService,
    private route: ActivatedRoute
  ) {
    this.route.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.formData.job_id = this.router.getCurrentNavigation()?.extras?.state?.job_id;
        // this.id = this.router.getCurrentNavigation()?.extras?.state?.profile_id;
      }
      else {
        this.router.navigate(['jobsCompletedProvider']);
      }
    })
  }

  ngOnInit(): void {
    this.getCategory();
    this.getCountry();
    this.getSingleJob();
    // this.getUser(this.id);

  }




  onSubmit() {
    this.submitted = true;
    // console.log(this.registerForm.invalid);
    // if (this.registerForm.invalid) {
    //   return;
    // }


    // else {
    // console.log(this.formData);
    this.config.postHttp('auth/jobs/updateJob', this.formData).then((data: any) => {
      this.shared.toastSuccess('Job Updated Successfully')
      this.router.navigate(['/manageJobsUser']);

    })
    // }

  }
  searchChange(event: any) {
    // this.formData.sub_category = []
    // this.config.getHttp('sub_categories/getAllSubCategories?cat_id=' + event.value.id, '').then((data: any) => {
    //   this.sub_categories = data.data;
    // })
  }
  searchChange1(event: any) {
  }
  getCategory() {
    this.config.getHttp('category/getAllCategories', '').then((data: any) => {
      this.categories = data.data;
    })
  }
  getCountry() {
    this.config.getHttp('country/getAllCountries', '').then((data: any) => {
      this.countries = data.data;
    })
  }
  getSingleJob() {
    this.config.getHttp('auth/jobs/getSingleJob?job_id=' + this.formData.job_id, '').then((data: any) => {
      this.formData.job_title = data.data[0].job_title;
      this.formData.category = data.data[0].categories;
      this.formData.sub_category = data.data[0].sub_categories;
      this.formData.country = data.data[0].countries;
      this.formData.city = data.data[0].cities;
      this.formData.region = data.data[0].regions;
      this.formData.experience = data.data[0].experience;
      this.formData.job_type = data.data[0].job_type;
      this.formData.qualification = data.data[0].qualification;
      this.formData.language = data.data[0].language;
      this.formData.salary = data.data[0].salary;
      this.formData.keyword = data.data[0].keyword;
      this.formData.requirements = data.data[0].requirements;
    })
  }
  searchCountry(event: any) {
    // this.formData.city = []
    // this.config.getHttp('city/getCitiesByCountry?country_id=' + event.value.id, '').then((data: any) => {
    //   this.city = data.data;
    // })
  }
  searchcity(event: any) {
    // this.formData.region = [];

    // this.config.getHttp('region/getRegionsByCity?city_id=' + event.value.id, '').then((data: any) => {
    //   this.region = data.data;
    // })
  }
  searchregion(event: any) {
  }
  // getUser(id: any) {
  //   this.config.getHttp('auth/getSingleCustomerById?id=' + id, { id: id }).then((data: any) => {
  //     console.log(data.user)
  //     this.customerData.first_name = data.user.first_name;
  //     this.customerData.phone = data.user.phone;
  //     this.customerData.last_name = data.user.last_name;
  //     this.customerData.email = data.user.email;
  //     if (data.user.profile_picture) {
  //       this.image = this.config.imgUrl + data.user.profile_picture;
  //     }
  //   })
  // }
  // startChat(user) {
  //   this.user.uid = this.id;
  //   this.user.name = user.first_name + ' ' + user.last_name;
  //   let navigationExtras: NavigationExtras = {
  //     state: {
  //       user: JSON.stringify(this.user),

  //     }
  //   };
  //   this.router.navigate(['inboxProvider'], navigationExtras);

  // }

}
