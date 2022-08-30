import { Component, OnInit, ViewChild, ElementRef, NgZone } from '@angular/core';
import { MapsAPILoader, MouseEvent } from '@agm/core';
import { AuthService } from 'src/app/auth.service';
import { Observable } from 'rxjs';
import { ConfigService } from 'src/providers/config/config.service';
import { SharedDataService } from 'src/providers/shared-data/shared-data.service';
import { NavigationExtras, Router } from '@angular/router';

@Component({
  selector: 'app-profile-provider',
  templateUrl: './profile-provider.component.html',
  styleUrls: ['./profile-provider.component.scss']
})
export class ProfileProviderComponent implements OnInit {
  company_name: any = '';
  first_name: any = '';
  phone: any = '';
  last_name: any = '';
  email: any = '';
  category: any = [];
  sub_category: any = [];
  date: any = '';
  country: any = [];
  city: any = [];
  region: any = [];
  description: any = '';
  user_type: any = '';
  loggedIn: any = '';
  image:any = 'assets/img/download.png';
  isLoggedIn$!: Observable<boolean>;
  id = localStorage.getItem("user_id");
  showbtn = true;
  title: string = 'AGM project';
  latitude: any;
  longitude: any;
  zoom: any;
  address: any;
  openingTime:any = '';
  closingTime:any = '';
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

  ) { }

  ngOnInit(): void {
    //load Places Autocomplete
    this.isLoggedIn$ = this.authService.isLoggedIn;
    this.user_type = localStorage.getItem("user_type");
    this.getUser(this.id);
    this.mapsAPILoader.load().then(() => {
      this.setCurrentLocation();
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
          this.zoom = 15;
        });
      });
    });
  }
  setCurrentLocation() {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;
        console.log(this.latitude);
        console.log(this.longitude);

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
    this.geoCoder.geocode({ 'location': { lat: latitude, lng: longitude } }, (results: any, status: any) => {
      console.log(results);
      console.log(status);
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



  getUser(id: any) {

    this.config.getHttp('auth/getSingleProfessionalById?id=' + id, { id: id }).then((data: any) => {
      console.log(data);
      this.company_name = data.data[0].user_data[0].company_name;
      this.first_name = data.data[0].user_data[0].first_name;
      this.phone = data.data[0].user_data[0].phone;
      this.last_name = data.data[0].user_data[0].last_name;
      this.email = data.data[0].user_data[0].email;
      this.category = data.data[0].category;
      this.sub_category = data.data[0].sub_category;
      this.date = data.data[0].user_data[0].date;
      this.country = data.data[0].country;
      this.city = data.data[0].city;
      this.region = data.data[0].region;
      this.description = data.data[0].user_data[0].description;
      if (data.data[0].user_data[0].profile_picture) {
        this.image = this.config.imgUrl + data.data[0].user_data[0].profile_picture;
      }
      if (data.data[0].user_data[0].portfolio) {
        this.showbtn = false;
        var pdf = document.getElementById("pdf_link") as HTMLAnchorElement | null;
        pdf!.href = this.config.imgUrl + data.data[0].user_data[0].portfolio;
      }
      this.longitude = data.data[0].user_data[0].longitude;
      this.latitude = data.data[0].user_data[0].latitude;
      this.openingTime = data.data[0].user_data[0].opening_time;
      this.closingTime = data.data[0].user_data[0].closing_time;
      if(this.longitude && this.latitude){
        
        this.getAddress(parseFloat(this.latitude),parseFloat(this.longitude));
        this.latitude = parseFloat(this.latitude);
        this.longitude = parseFloat(this.longitude);
      }
      else{
        this.setCurrentLocation();
      }
    })
  }



}
