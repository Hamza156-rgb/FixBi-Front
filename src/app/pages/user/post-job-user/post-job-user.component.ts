import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ConfigService } from 'src/providers/config/config.service';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth.service';
import { SharedDataService } from 'src/providers/shared-data/shared-data.service';
@Component({
  selector: 'app-post-job-user',
  templateUrl: './post-job-user.component.html',
  styleUrls: ['./post-job-user.component.scss']
})
export class PostJobUserComponent implements OnInit {

  registerForm!: FormGroup;
  submitted = false;

  formData = {
    job_title:'',
    category: '',
    sub_category:[],
    country:'',
    city:[],
    region:[],
    experience: '',
    salary: '',
    job_type: '',
    qualification: '',
    language: '',
    requirements: '',
    user_id:localStorage.getItem("user_id"),
    keyword:''
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
    private formBuilder: FormBuilder,
    public config: ConfigService,
    public router: Router,
    private authService: AuthService,
    public shared: SharedDataService,
  ) { }

  ngOnInit(): void {
    this.getCategory();
    this.getCountry();
    this.registerForm = this.formBuilder.group({
      job_title: ['', [Validators.required]],
      keyword: [''],
      category: ['', [Validators.required]],
      description: ['', [Validators.required]],
      select_category: ['', [Validators.required]],
      sub_category: ['', [Validators.required]],
      country: ['', [Validators.required]],
      city: ['', [Validators.required]],
      region: ['', [Validators.required]],
      experience: ['', [Validators.required]],
      salary: ['', [Validators.required]],
      job_type: ['', [Validators.required]],
      qualification: ['', [Validators.required]],
      language: ['', [Validators.required]],
      requirements: ['', [Validators.required]],

    },
      {

      });
  }

  get f() { return this.registerForm.controls; }



  onSubmit() {
    this.submitted = true;
    // console.log(this.registerForm.invalid);
    // if (this.registerForm.invalid) {
    //   return;
    // }


    // else {
      this.config.postHttp('auth/jobs/createJob', this.formData).then((data: any) => {
          this.shared.toastSuccess('Job Posted Successfully')
          this.router.navigate(['/manageJobsUser']);
        
      })
    // }

  }
  searchChange(event: any) {
    this.formData.sub_category = []
    this.config.getHttp('sub_categories/getAllSubCategories?cat_id=' + event.value.id, '').then((data: any) => {
      this.sub_categories = data.data;
    })
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
  searchCountry(event: any) {
    this.formData.city = []
    this.config.getHttp('city/getCitiesByCountry?country_id=' + event.value.id, '').then((data: any) => {
      this.city = data.data;
    })
  }
  searchcity(event: any) {
    this.formData.region = [];

    this.config.getHttp('region/getRegionsByCity?city_id=' + event.value.id, '').then((data: any) => {
      this.region = data.data;
    })
  }
  searchregion(event: any) {
  }
}
