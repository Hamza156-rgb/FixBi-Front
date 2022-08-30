
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';

@Injectable()

export class ConfigService {


  //public yourSiteUrl: string = 'https://goldadder.com';
  public yourSiteUrl: string = 'https://fixbiapi.codetreck.com/api/v1/';
  public imgUrl: string = 'https://fixbiapi.codetreck.com/';
  // public yourSiteUrl: string = 'http://localhost:8012/driving/';
  public consumerKey: string = "dadb7a7c1557917902724bbbf5";
  public consumerSecret: string = "3ba77f821557917902b1d57373";

  public showIntroPage = 1; //  0 to hide and 1 to show intro page
  public appInProduction = true;//  0 to hide and 1 to show intro page
  public defaultIcons = true; //  0 to hide and 1 to show intro page

  public appNavigationTabs = localStorage.tabsNavigation; //  true for tabs layout and false for sidemenu layout
  public appTheme = 'default';
  public darkMode = false;

  public bannerAnimationEffect = "default";// fade, coverFlow, flip, cube, default
  public bannerStyle = "default"; // default, squareBullets, numberBullets, bottomBulletsWhiteBackground, progressBar, verticalRightBullets, verticalLeftBullets
  public productCardStyle = "1"


  public productSlidesPerPage = 2.5;


  public url: string = this.yourSiteUrl + '/api/v1';
  public langId: string = localStorage.langId;
  public currecnyCode: string = localStorage.currencyCode;
  public loader = 'dots';
  public newProductDuration = 10;
  public cartButton = 1;//1 = show and 0 = hide
  public currency = localStorage.currency;
  public currencyPos = localStorage.currencyPos;
  public paypalCurrencySymbol = localStorage.currency;
  public address: any;
  public fbId: any;
  public email: any;
  public latitude: any;
  public longitude: any;
  public phoneNo: any;
  public pushNotificationSenderId: any;
  public lazyLoadingGif: any;
  public notifText: any;
  public notifTitle: any;
  public notifDuration: any;
  public footerShowHide: any;
  public homePage = 1;
  public categoryPage = 1;
  public siteUrl = '';
  public appName = '';
  public packgeName = "";
  public introPage = 1;
  public myOrdersPage = 1;
  public newsPage = 1;
  public wishListPage = 1;
  public shippingAddressPage = 1;
  public aboutUsPage = 1;
  public contactUsPage = 1;
  public editProfilePage = 1;
  public settingPage = 1;
  public admob = 1;
  public admobBannerid = '';
  public admobIntid = '';
  public admobIos = 1;
  public admobBanneridIos = '';
  public admobIntidIos = '';
  public googleAnalaytics = "";
  public rateApp = 1;
  public shareApp = 1;
  public fbButton = 1;
  public googleButton = 1;
  public notificationType = "";
  public onesignalAppId = "";
  public onesignalSenderId = "";
  public appSettings: { [k: string]: any } = {};
  public currentRoute = "home";
  constructor(
    public http: HttpClient,
    private toastr: ToastrService
  ) {

  }
  getHttp(req: any, data: any) {
    let d = new Date();
    const httpOptions = {
      headers: new HttpHeaders({
        'consumer-key': this.consumerKey,
        'consumer-secret': this.consumerSecret,
        'consumer-nonce': d.getTime().toString(),
        'consumer-device-id': 'device id of the app',
        'consumer-ip': '192.168.1.11',
      })
    };
    const nativeHeaders = {
      'consumer-key': this.consumerKey,
      'consumer-secret': this.consumerSecret,
      'consumer-nonce': d.getTime().toString(),
      'consumer-device-id': 'device id of the app',
      'consumer-ip': '192.168.1.11',
      'Content-Type': 'application/json',
    };

    return new Promise(resolve => {

      this.http.get(this.yourSiteUrl + req, data).subscribe((data: any) => {
        resolve(data);
        // console.log(data)
      }, (err) => {
        console.log("Error : " + req);
        console.log(err);
      });

    });
  }
  getHttp1(req: any, data: any) {
    let d = new Date();
    const httpOptions = {
      headers: new HttpHeaders({
        'consumer-key': this.consumerKey,
        'consumer-secret': this.consumerSecret,
        'consumer-nonce': d.getTime().toString(),
        'consumer-device-id': 'device id of the app',
        'consumer-ip': '192.168.1.11',
      })
    };
    const nativeHeaders = {
      'consumer-key': this.consumerKey,
      'consumer-secret': this.consumerSecret,
      'consumer-nonce': d.getTime().toString(),
      'consumer-device-id': 'device id of the app',
      'consumer-ip': '192.168.1.11',
      'Content-Type': 'application/json',
    };

    return new Promise(resolve => {

      this.http.get(this.yourSiteUrl + req, data).subscribe((data: any) => {
        resolve(data);
      }, (err) => {
        console.log("Error : " + req);
        console.log(err);
      });

    });
  }
  postHttp(req: any, data: any) {
    let d = new Date();
    const httpOptions = {
      headers: new HttpHeaders({
        'consumer-key': this.consumerKey,
        'consumer-secret': this.consumerSecret,
        'consumer-nonce': d.getTime().toString(),
        'consumer-device-id': 'device id of the app',
        'consumer-ip': '192.168.1.11',
      })
    };
    const nativeHeaders = {
      'Content-Type': 'application/json',
      'consumer-key': this.consumerKey,
      'consumer-secret': this.consumerSecret,
      'consumer-nonce': d.getTime().toString(),
      'consumer-device-id': 'device id of the app',
      'consumer-ip': '192.168.1.11',
    };
const headers = new HttpHeaders();
headers.append('Content-Type','multipart/form-data');
headers.append('Accept','application/json');
    return new Promise(resolve => {
      this.http.post(this.yourSiteUrl + req, data,{
        headers:headers
      }).subscribe((data: any) => {
        resolve(data);
      }, (err) => {
        if(err.status==400){
          
          this.toastDanger(err.error.message);
        }
        else if(err.status == 500){
          this.toastDanger('Something Went Wrong');
          return;
        }
        
      });
    });
  }



  // postRegister(req: any, data: any) {
  //   let d = new Date();
  //   const httpOptions = {
  //     headers: new HttpHeaders({
  //       'consumer-key': this.consumerKey,
  //       'consumer-secret': this.consumerSecret,
  //       'consumer-nonce': d.getTime().toString(),
  //       'consumer-device-id': 'device id of the app',
  //       'consumer-ip': '192.168.1.11',
  //     })
  //   };
  //   const nativeHeaders = {
  //     'Content-Type': 'application/json',
  //     'consumer-key': this.consumerKey,
  //     'consumer-secret': this.consumerSecret,
  //     'consumer-nonce': d.getTime().toString(),
  //     'consumer-device-id': 'device id of the app',
  //     'consumer-ip': '192.168.1.11',
  //   };

  //   return new Promise(resolve => {

  //     this.http.post(this.yourSiteUrl + req, data).subscribe((data: any) => {
  //       resolve(data);
  //     }, (err) => {
  //       console.log("Error : " + req);
  //       console.log(err);
  //     });
  //   });
  // }
  toastSuccess(msg:any){
    this.toastr.success(msg);
  }
  toastDanger(msg:any){
    this.toastr.error(msg);
  }
}