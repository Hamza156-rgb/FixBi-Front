import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ConfigService } from 'src/providers/config/config.service';
import {  ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/auth.service';
import { SharedDataService } from 'src/providers/shared-data/shared-data.service';

@Component({
  selector: 'app-edit-jobs-user',
  templateUrl: './edit-jobs-user.component.html',
  styleUrls: ['./edit-jobs-user.component.scss']
})
export class EditJobsUserComponent implements OnInit {
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
    keyword:'',
    job_id:0
  }
  config1 = {
    displayKey: "name",
    search: true,
    placeholder: 'Category',
  };
  config2 = {
    displayKey: "name", // if objects array passed which key to be displayed defaults to description
    search: true,
    placeholder: 'Sub Category',
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
    private route: ActivatedRoute
  ) {
    this.route.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation()?.extras.state) {
       this.formData.job_id = this.router.getCurrentNavigation()?.extras?.state?.job_id;
      }
    })
   }

  ngOnInit(): void {
    this.getCategory();
    this.getCountry();
    this.getSingleJob();
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
      console.log(this.formData);
      this.config.postHttp('auth/jobs/updateJob', this.formData).then((data: any) => {
          this.shared.toastSuccess('Job Updated Successfully')
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
  getSingleJob() {
    this.config.getHttp('auth/jobs/getSingleJob?job_id='+ this.formData.job_id, '').then((data: any) => {
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
