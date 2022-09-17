import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';
import { ConfigService } from 'src/providers/config/config.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styleUrls: ['./search-page.component.scss']
})
export class SearchPageComponent implements OnInit {
  searchResult: any = [];
  searchTerms: any = {};
  registerForm!: FormGroup;
  submitted = false;
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
    height: '300px'
  
  };


  config5 = {
    displayKey: "name", // if objects array passed which key to be displayed defaults to description
    search: true,
    placeholder: 'Region',
    height: '300px'
  
  };
  searchBox = {
    keyword: '',
    category: '',
    sub_category: [],
    city: [],
    region: [],
    country: []
  }
  categories: any = [];
  sub_categories = [];
  countries = [];
  city = [];
  region = [];
  res: any = [];
  random = -1;
  constructor(private route: ActivatedRoute, public router: Router, public config: ConfigService, private formBuilder: FormBuilder) {
    this.route.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation()?.extras.state) {
        this.searchTerms = JSON.parse(this.router.getCurrentNavigation()?.extras?.state?.searchResult);
        console.log(this.searchTerms)
        this.config.postHttp('search/getResults', this.searchTerms).then((data: any) => {
          this.searchResult = data.data;
          console.log(this.searchResult);
          if (this.searchResult.length == 0) {
            this.random = 0;
          } else {
            this.random = -1;
          }
        })
      }
      else {
        this.random = 0;
      }
    })
  }

  ngOnInit(): void {
    this.getCategory();
    this.getCountry();
    this.registerForm = this.formBuilder.group({
      category: ['', Validators.required],

      // keyword: ['', Validators.required],
      subCategory: ['', Validators.required],
      country: ['', Validators.required],
      city: ['', Validators.required],
      region: ['', Validators.required],
    }, {

    });

  }
  onSubmit() {

    this.submitted = true;
    if (this.registerForm.invalid) {
      return;
    }

    else {
      this.config.postHttp('search/getResults', this.searchBox).then((data: any) => {
        console.log(data.data);
        this.searchResult = data.data
        if (this.searchResult.length == 0) {
          this.random = 0;
        } else {
          this.random = -1;
        }
      })
    }



  }
  searchCountry(event: any) {
    this.searchBox.city = []
    this.config.getHttp('city/getCitiesByCountry?country_id=' + event.value.id, '').then((data: any) => {
      this.city = data.data;
    })
  }
  searchcity(event: any) {
    this.searchBox.region = [];
    var dummy: any = this.searchBox.city;
    if (dummy.length == 0) {
      this.region = [];
      return;
    }
    var a = []
    for (var i = 0; i < dummy.length; i++) {
      a.push(dummy[i].id);
    }
    this.config.getHttp('region/getRegionsByCity?city_id=' + a.toString(), '').then((data: any) => {
      this.region = data.data;
    })
  }
  searchChange(event: any) {
    this.searchBox.sub_category = []
    this.config.getHttp('sub_categories/getAllSubCategories?cat_id=' + event.value.id, '').then((data: any) => {
      this.sub_categories = data.data;
    })
  }
  searchChange1(event: any) {
  }
  getCountry() {
    this.config.getHttp('country/getAllCountries', '').then((data: any) => {
      this.countries = data.data;
    })
  }
  getCategory() {
    this.config.getHttp('category/getAllCategories', '').then((data: any) => {
      this.categories = data.data;

    })
  }
  viewProfile(profile: any) {
    let navigationExtras: NavigationExtras = {
      state: {
        profile: JSON.stringify(profile),

      }
    };
    this.router.navigate(['viewProfile'], navigationExtras);
  }
  get f() { return this.registerForm.controls; }
}
