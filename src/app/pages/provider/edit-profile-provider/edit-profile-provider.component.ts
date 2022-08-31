import { Component, OnInit, ViewChild, ElementRef, NgZone } from '@angular/core';
import { MapsAPILoader, MouseEvent } from '@agm/core';
import { AuthService } from 'src/app/auth.service';
import { Observable } from 'rxjs';
import { ConfigService } from 'src/providers/config/config.service';
import { SharedDataService } from 'src/providers/shared-data/shared-data.service';
import { NavigationExtras, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser'
@Component({
  selector: 'app-edit-profile-provider',
  templateUrl: './edit-profile-provider.component.html',
  styleUrls: ['./edit-profile-provider.component.scss']
})
export class EditProfileProviderComponent implements OnInit {
  isLoggedIn$!: Observable<boolean>;
  image: string | SafeUrl = 'assets/img/download.png';
  formData = {
    first_name: '',
    last_name: '',
    phone: '',
    email: '',
    category: '',
    sub_category: [],
    date: '',
    city: [],
    region: [],
    description: '',
    id: '',
    company_name: '',
    country: [],
    portfolio: '',
    openingTime: '09:00',
    closingTime: '17:00',
    profile_pic: 'assets/img/download.png',
    long: '',
    lat: '',
  };
  uImagebtn = false;
  showbtn = true;
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

  tempCat_id = 0;
  tempSubCat = [];

  tempCountry_id = 0;
  tempCity = [];
  tempRegion = [];

  title: string = 'AGM project';
  latitude: any;
  longitude: any;
  zoom: any;
  address: any;
  id = localStorage.getItem("user_id");
  user_type: any = '';
  private geoCoder: any;
  @ViewChild('search')
  public searchElementRef!: ElementRef;
  constructor(
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone,
    private authService: AuthService,
    public config: ConfigService,
    public shared: SharedDataService,
    public router: Router,
    private toastr: ToastrService,
    private sanitizer: DomSanitizer
  ) { }
  ngOnInit() {

    this.isLoggedIn$ = this.authService.isLoggedIn;
    this.getCategory();
    this.getCountry();
    setTimeout(() => {
      this.getUser(this.id);
    }, 300);

    this.user_type = localStorage.getItem("user_type");
    //load Places Autocomplete

  
    this.mapsAPILoader.load().then(() => {

    
      this.geoCoder = new google.maps.Geocoder;

      let autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement);
      autocomplete.addListener("place_changed", () => {
        this.ngZone.run(() => {
          //get the place result
          let place: google.maps.places.PlaceResult = autocomplete.getPlace();

          //verify result
          if (place.geometry === undefined || place.geometry === null) {
            return;
          }

          //set latitude, longitude and zoom
          this.latitude = place.geometry.location.lat();
          this.longitude = place.geometry.location.lng();
          this.getAddress(this.latitude, this.longitude);
          this.zoom = 15;
        });
      });
    });
  }
  // category = [
  //   'Cleaning', 'Electronics', 'Plumbing', 'Electrical'
  // ];
  // subCategory = [
  //   'Deep House Cleaning', 'Garden Services', 'Apartment Prepping', 'Interior decorator'
  // ];
  // cities = [
  //   'Chicago', 'New York', 'San Diego', 'Boston', 'LA',
  // ]
  // region = [
  //   'Middle East', 'Africa', 'America', 'Asia'
  // ];

  setCurrentLocation() {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude

        this.getAddress(this.latitude, this.longitude);
      });
    }
  }
  markerDragEnd($event: MouseEvent) {
    console.log($event);
    this.latitude = $event.coords.lat;
    this.longitude = $event.coords.lng;
    this.getAddress(this.latitude, this.longitude);
  }
  getAddress(latitude: any, longitude: any) {
    console.log(latitude,longitude);
    this.geoCoder.geocode({ 'location': { lat: latitude, lng: longitude } }, (results: any, status: any) => {
      if (status === 'OK') {
        if (results[0]) {
          this.zoom = 15;
          this.address = results[0].formatted_address;
        } else {
          window.alert('No results found');
        }
      } else {
        window.alert('Geocoder failed due to: ' + status);
      }

    });
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

  // getUser(id: any) {
  //   console.log(this.id);
  //   this.config.getHttp('auth/getSingleProfessionalById?id=' + id, { id: id }).then((data: any) => {
  //     console.log(data);
  //     this.formData.company_name = data.user.company_name;
  //     this.formData.first_name = data.user.first_name;
  //     this.formData.phone = data.user.phone;
  //     this.formData.last_name = data.user.last_name;
  //     this.formData.email = data.user.email;
  //     this.formData.category = data.user.category;
  //     this.formData.sub_category = data.user.sub_category;
  //     this.formData.date = data.user.date;
  //     this.formData.city = data.user.city;
  //     this.formData.region = data.user.region;
  //     this.formData.description = data.user.description;
  //   })
  // }



  getUser(id: any) {
    this.config.getHttp('auth/getSingleProfessionalById?id=' + id, { id: id }).then((data: any) => {
      // console.log(data.data[0].user_data[0]);
      this.formData.company_name = data.data[0].user_data[0].company_name;
      this.formData.first_name = data.data[0].user_data[0].first_name;
      this.formData.phone = data.data[0].user_data[0].phone;
      this.formData.last_name = data.data[0].user_data[0].last_name;
      this.formData.email = data.data[0].user_data[0].email;
      this.formData.category = data.data[0].category;
      // this. (data.data[0].category[0].id);
      this.tempCat_id = data.data[0].category[0].id;
      this.formData.sub_category = data.data[0].sub_category;
      this.tempSubCat = this.formData.sub_category;
      this.formData.date = data.data[0].user_data[0].date;
      this.formData.country = data.data[0].country;
      this.loadCity(data.data[0].country[0].id);
      this.tempCountry_id = data.data[0].country[0].id;
      this.formData.city = data.data[0].city;
      this.tempCity = this.formData.city;
      this.loadRegion();
      this.formData.region = data.data[0].region;
      this.tempRegion = this.formData.region;
      this.formData.description = data.data[0].user_data[0].description;

      if (data.data[0].user_data[0].profile_picture) {
        this.formData.profile_pic = data.data[0].user_data[0].profile_picture;
        this.image = this.config.imgUrl + data.data[0].user_data[0].profile_picture;
      }
      if (data.data[0].user_data[0].portfolio) {
        this.showbtn = false;
        this.formData.portfolio = data.data[0].user_data[0].portfolio;
        var pdf = document.getElementById("pdf_link") as HTMLAnchorElement | null;
        pdf!.href = this.config.imgUrl + data.data[0].user_data[0].portfolio;
      }

      this.formData.openingTime = data.data[0].user_data[0].opening_time;
      this.formData.closingTime = data.data[0].user_data[0].closing_time;
      this.formData.long = data.data[0].user_data[0].longitude;
      this.formData.lat = data.data[0].user_data[0].latitude;
      if(this.formData.long && this.formData.lat){
        
        this.getAddress(parseFloat(this.formData.lat),parseFloat(this.formData.long));
        this.latitude = parseFloat(this.formData.lat);
        this.longitude = parseFloat(this.formData.long);
      }
      else{
        this.setCurrentLocation();
      }

    })
  }
  changeProfilePic(event: any) {
    var sizeAllowed = 25000;
    var filesSize = 0;
    this.formData.profile_pic = "";
    if (event.target.files.length > 1) {
      alert("More than 1 files cannot be uploaded");
      return;
    }
    for (let i = 0; i <= event.target.files.length - 1; i++) {
      console.log(event.target.files.item(i).type);
      if (event.target.files.item(i).type == "image/png" ||
        event.target.files.item(i).type == "image/jpg" ||
        event.target.files.item(i).type == "image/jpeg" ||
        event.target.files.item(i).type == "image/gif") {
        const fsize = event.target.files.item(i).size;
        const file = Math.round(fsize / 1024);
        filesSize += file;
        if (filesSize >= sizeAllowed) {
          this.shared.toastDanger(
            'Maximum file size exceeded, please select a files less than 25mb'
          )
        } else {
          this.formData.profile_pic = event.target.files[i];
          this.image = this.sanitizer.bypassSecurityTrustResourceUrl(URL.createObjectURL(event.target.files[i]));
        }
      } else {
        this.shared.toastDanger('One of the files are not of required file type')
        return;
      }
    }
  }

  addPdf(event: any) {
    var sizeAllowed = 25000;
    var filesSize = 0;
    this.formData.portfolio = "";
    if (event.target.files.length > 1) {
      alert("More than 1 files cannot be uploaded");
      return;
    }
    for (let i = 0; i <= event.target.files.length - 1; i++) {
      if (event.target.files.item(i).type == "application/pdf") {
        const fsize = event.target.files.item(i).size;
        const file = Math.round(fsize / 1024);
        filesSize += file;
        if (filesSize >= sizeAllowed) {
          this.shared.toastDanger(
            'Maximum file size exceeded, please select a files less than 25mb'
          )
        } else {
          this.formData.portfolio = event.target.files[i];
          this.showbtn = false;
          var pdf = document.getElementById("pdf_link") as HTMLAnchorElement | null;
          pdf!.href = URL.createObjectURL(event.target.files[0]);
        }
      } else {
        this.shared.toastDanger('One of the files are not of required file type')
        return;
      }
    }

  }


  updateUser(id: any) {
    this.formData.id = id;
    if (this.formData.profile_pic == 'assets/img/download.png') {
      this.formData.profile_pic = '';
    }

    this.formData.long = this.longitude;
    this.formData.lat = this.latitude;
    var myFormData = new FormData();

    myFormData.append('first_name', this.formData.first_name);
    myFormData.append('last_name', this.formData.last_name)
    myFormData.append('phone', this.formData.phone)
    myFormData.append('email', this.formData.email)
    myFormData.append('category', JSON.stringify(this.formData.category))
    myFormData.append('sub_category', JSON.stringify(this.formData.sub_category))
    myFormData.append('city', JSON.stringify(this.formData.city))
    myFormData.append('region', JSON.stringify(this.formData.region))
    myFormData.append('description', this.formData.description)
    myFormData.append('id', this.formData.id)
    myFormData.append('company_name', this.formData.company_name)
    myFormData.append('country', JSON.stringify(this.formData.country))
    myFormData.append('portfolio', this.formData.portfolio)
    myFormData.append('openingTime', this.formData.openingTime)
    myFormData.append('closingTime', this.formData.closingTime)
    myFormData.append('profile_pic', this.formData.profile_pic);
    myFormData.append('longitude', this.formData.long);
    myFormData.append('latitude', this.formData.lat);

    // for (let [key, value] of myFormData.entries()) {
    //   console.log(`${key}: ${value}`)
    // }

    // return;
    this.config.postHttp('auth/updateProfessional', myFormData).then((data: any) => {
      // console.log(data);
      if(data.data[0].user_data[0].user_type == 4){
        localStorage.setItem("first_name", data.data[0].user_data[0].company_name);
      }
     else if(data.data[0].user_data[0].user_type == 3){
      localStorage.setItem("first_name", data.data[0].user_data[0].first_name);
     }
      localStorage.setItem("user_type", data.data[0].user_data[0].user_type);
      localStorage.setItem("user_id", data.data[0].user_data[0].user_id);

      this.shared.toastSuccess('Updated Sucessfully')
      this.router.navigate(['/profileUser']);

    })
  }
  loadSubCat(id: any) {
    this.formData.sub_category = []
    this.config.getHttp('sub_categories/getAllSubCategories?cat_id=' + id, '').then((data: any) => {
      this.sub_categories = data.data;
    })
  }
  loadCity(id: any) {
    this.formData.city = []
    this.config.getHttp('city/getCitiesByCountry?country_id=' + id, '').then((data: any) => {
      this.city = data.data;
    })
  }
  loadRegion() {
    this.formData.region = [];
    var dummy: any = this.formData.city;
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
    if (event.value.id == this.tempCat_id) {
      console.log(this.tempSubCat);
      this.formData.sub_category = this.tempSubCat;
    } else {
      this.formData.sub_category = []
    }

    this.config.getHttp('sub_categories/getAllSubCategories?cat_id=' + event.value.id, '').then((data: any) => {
      this.sub_categories = data.data;
    })
  }
  searchChange1(event: any) {

  }
  searchCountry(event: any) {
    if (event.value.id == this.tempCountry_id) {
      this.formData.city = this.tempCity;
      this.loadRegion();
      this.formData.region = this.tempRegion;
    } else {
      this.formData.city = [];
      this.formData.region = [];
      this.region = []
    }
    this.config.getHttp('city/getCitiesByCountry?country_id=' + event.value.id, '').then((data: any) => {
      this.city = data.data;
    })
  }
  searchcity(event: any) {
    var dummy: any = this.formData.city;
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
  openPP() {
    document.getElementById("pp")?.click();
  }

}
