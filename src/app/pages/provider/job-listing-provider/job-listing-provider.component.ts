import { Component, OnInit } from '@angular/core';
import { ConfigService } from 'src/providers/config/config.service';
import { NavigationExtras, Router } from '@angular/router';
import { SharedDataService } from 'src/providers/shared-data/shared-data.service';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-job-listing-provider',
  templateUrl: './job-listing-provider.component.html',
  styleUrls: ['./job-listing-provider.component.scss']
})

export class JobListingUserComponent implements OnInit {

  registerForm!: FormGroup;
  submitted = false;
  searchResult: any = [];
  compareResult: any = [];

  constructor(public config: ConfigService, public router: Router,
    private formBuilder: FormBuilder, public shared: SharedDataService,
  ) { }
  config1 = {
    displayKey: "name",
    search: true,
    placeholder: 'Category',
    height:'300px'
  };

  SearchData = {
    keyword: '',
    category: '',
  }

  filterArray = [];
  experienceArray = [];
  LanguageArray = [];
  valueArray = [];
  categories = [];
  // category: '';
  languages = [
    {
      'id': 0,
      'name': 'Turkish',
    },
    {
      'id': 1,
      'name': 'Greek',
    },
    {
      'id': 2,
      'name': 'English',
    },
    {
      'id': 3,
      'name': 'Arabic',
    },
  ]
  experienceYears = [
    {
      'id': 0,
      'name': 'Fresh',
    },
    {
      'id': 1,
      'name': '1 - year',
    },
    {
      'id': 2,
      'name': '2 - years',
    },
    {
      'id': 3,
      'name': '3 - years',
    },
    {
      'id': 4,
      'name': '4 - years',
    },
    {
      'id': 5,
      'name': '5 - years',
    },
    {
      'id': 6,
      'name': '6 - years',
    },
    {
      'id': 7,
      'name': '7 - years',
    },
    {
      'id': 8,
      'name': '8 - years',
    },
    {
      'id': 9,
      'name': '9 - years',
    },
    {
      'id': 10,
      'name': '10 - years',
    },
    {
      'id': 11,
      'name': '10+ years',
    },
  ]
  jobTypes = [
    {
      'id': '0',
      'name': 'Fix',
    },
    {
      'id': '1',
      'name': 'Freelance',
    },
    {
      'id': '2',
      'name': 'Full Time',
    },
    {
      'id': '3',
      'name': 'Hourly',
    },
    {
      'id': '4',
      'name': 'Internship',
    },
    {
      'id': '5',
      'name': 'Part Time',
    },
    {
      'id': '6',
      'name': 'Temporary',
    },
  ]
  ngOnInit(): void {


    // this.onJobTypeChange(event);
    this.registerForm = this.formBuilder.group({
      keyword: ['', [Validators.required]],
      cat: ['', [Validators.required]],

    },
      {

      });

    this.config.getHttp('auth/jobs/getAllJobs', '').then((data: any) => {
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
    this.router.navigate(['jobDetailsProvider'], navigationExtras);
  }

  viewProfile(profile) {
    let navigationExtras: NavigationExtras = {
      state: {
        profile_id: profile,

      }
    };
    this.router.navigate(['view-job-profile'], navigationExtras);
  }



  getCategory() {
    this.config.getHttp('category/getAllCategories', '').then((data: any) => {
      this.categories = data.data;
    })
  }
  onLangChange(event) {
    // console.log(event.target.value);
    if (event.target.checked) {
      for (var i = 0; i < this.compareResult.length; i++) {
        if (event.target.value == this.compareResult[i].experience) {
          this.LanguageArray.push(this.compareResult[i]);
        }
      }
      if (this.LanguageArray.length > 0) {
        this.searchResult = this.LanguageArray;
      }
    }
    else {
      let length = [];
      for (var i = 0; i < this.LanguageArray.length; i++) {
        if (event.target.value == this.LanguageArray[i].experience) {
          length.push(this.LanguageArray[i]);
        }
        // console.log(length);
      }
      this.LanguageArray = this.LanguageArray.filter(function (el) {
        return length.indexOf(el) < 0;
      });
      // console.log(this.LanguageArray)
      if (this.LanguageArray.length > 0) {
        this.searchResult = this.LanguageArray;
      }
      else if (this.LanguageArray.length == 0) {
        this.searchResult = this.compareResult;
      }
    }
  }
  onYearChange(event) {
    // console.log(event.target.value);


    if (event.target.checked) {
      for (var i = 0; i < this.compareResult.length; i++) {
        if (event.target.value == this.compareResult[i].experience) {
          this.experienceArray.push(this.compareResult[i]);
        }
      }
      if (this.experienceArray.length > 0) {
        this.searchResult = this.experienceArray;
      }
    }
    else {
      let length = [];
      for (var i = 0; i < this.experienceArray.length; i++) {
        if (event.target.value == this.experienceArray[i].experience) {
          length.push(this.experienceArray[i]);
        }
        // console.log(length);
      }
      this.experienceArray = this.experienceArray.filter(function (el) {
        return length.indexOf(el) < 0;
      });
      // console.log(this.experienceArray)
      if (this.experienceArray.length > 0) {
        this.searchResult = this.experienceArray;
      }
      else if (this.experienceArray.length == 0) {
        this.searchResult = this.compareResult;
      }
    }

  }
  onJobTypeChange(event) {
    if (event.target.checked) {
      for (var i = 0; i < this.compareResult.length; i++) {
        if (event.target.value == this.compareResult[i].job_type) {
          this.filterArray.push(this.compareResult[i]);
        }
      }
      if (this.filterArray.length > 0) {
        this.searchResult = this.filterArray;
      }
    }
    else {
      let length = [];
      for (var i = 0; i < this.filterArray.length; i++) {
        if (event.target.value == this.filterArray[i].job_type) {
          length.push(this.filterArray[i]);
        }
        // console.log(length);
      }
      this.filterArray = this.filterArray.filter(function (el) {
        return length.indexOf(el) < 0;
      });
      // console.log(this.filterArray)
      if (this.filterArray.length > 0) {
        this.searchResult = this.filterArray;
      }
      else if (this.filterArray.length == 0) {
        this.searchResult = this.compareResult;
      }
    }
  }
  searchChange(event: any) {

  }


  get f() { return this.registerForm.controls; }



  searchFilter() {
    this.submitted = true;
    if (this.registerForm.invalid) {
      return;
    }
    else {
      // console.log(this.SearchData);
      this.config.postHttp('auth/jobs/searchJobs', this.SearchData).then((data: any) => {
        // console.log(data.data);

        if (data.data.length == 0) {
          this.searchResult = [];
          this.shared.toastDanger('No Jobs Found.');
          return;
        }
        else {
          this.searchResult = data.data;
        }
      })
    }
  }


  searchByJob() {

    this.config.postHttp('auth/jobs/searchJobs', this.jobTypes).then((data: any) => {
      // console.log(data.data);

      if (data.data.length == 0) {
        this.searchResult = [];
        this.shared.toastDanger('No Jobs Found.');
        return;
      }
      else {
        // console.log(this.jobTypes = data.data)
        this.searchResult = data.data;
      }
    })

  }

}
