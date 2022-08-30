
import { Injectable, ApplicationRef, NgZone } from '@angular/core';
import { ConfigService } from '../config/config.service';
import { HttpClient } from '@angular/common/http';
import { NavigationExtras, Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import {
  MatSnackBar,
  MatSnackBarConfig,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
@Injectable()
export class SharedDataService {

  authenticationState = new BehaviorSubject(false);
  public banners = [];
  public tab1 = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1];
  public tab2 = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1];
  public tab3 = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1];
  public flashSaleProducts = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1];
  public allCategories: any = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1];
  public categories: any = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1];
  public subCategories: any = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1];
  public customerData:{ [k: string]: any } = {};
  public designID = 36;
  public recentViewedProducts = new Array();
  public cartProducts = new Array();
  public privacyPolicy = "";
  public termServices = "";
  public refundPolicy = "";
  public aboutUs = "";
  public cartquantity = 0;
  public wishList = new Array();
  public tempdata: { [k: string]: any } = {};
  public dir = "ltr";
  public selectedFooterPage = "HomePage";
  public tempMemberShip:any;
  public currentOpenedModel: any = null;
  public applieddesign = new Array;
  public currentModule: { [k: string]: any } = {};
  actionButtonLabel: string = '';
  action: boolean = true;
  setAutoHide: boolean = true;
  autoHide: number = 3000;
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';
  addExtraClass: boolean = false;
  public orderDetails = {
    guest_status: 0,
    email: "",
    tax_zone_id: "",
    delivery_firstname: "",
    delivery_lastname: "",
    delivery_state: "",
    delivery_city: "",
    delivery_postcode: "",
    delivery_zone: "",
    delivery_country: "",
    delivery_country_id: "",
    delivery_street_address: "",
    delivery_country_code: "",
    delivery_phone: "",

    billing_firstname: "",
    billing_lastname: "",
    billing_state: "",
    billing_city: "",
    billing_postcode: "",
    billing_zone: "",
    billing_country: "",
    billing_country_id: "",
    billing_street_address: "",
    billing_country_code: "",
    billing_phone: "",
    total_tax: '',
    shipping_cost: '',
    shipping_method: '',
    payment_method: '',
    comments: ''
  };
  public translationListArray = [];
  public singleProductPageData = [];
  public singlePostData: any;
  myOrderDetialPageData: any;
  lab = false;
  public missingValues = [];
  primaryHexColor = "#3980ff";
  constructor(
    public config: ConfigService,
    public httpClient: HttpClient,
    public router:Router,
    private toastr: ToastrService,
    public snackBar: MatSnackBar
  ) {
  var val = localStorage.getItem('customerData');
      
      if (val != null || val != undefined) {
        this.customerData = JSON.parse(val);
        if(Object.keys(this.customerData).length !=0){
          this.authenticationState.next(true);
        }
        else{
          this.authenticationState.next(false);
        }
      }
      else{
        this.authenticationState.next(false);
      }
   
  }
  login(data:any) {
  
    this.customerData =data;
    this.customerData.id = data.id
    this.customerData.type = data.type;
    this.customerData.firstname = data.firstname;
    this.customerData.lastname = data.lastname;
    this.customerData.email = data.email;
    this.customerData.is_verified = data.is_verified
    localStorage.setItem('customerData', JSON.stringify(this.customerData));
    this.authenticationState.next(true);
  }
  logOut() {
    this.customerData = {};
    localStorage.setItem('customerData', JSON.stringify(this.customerData));
    this.authenticationState.next(false);
  }

toastSuccess(msg:any){
  let config = new MatSnackBarConfig();
  config.verticalPosition = this.verticalPosition;
  config.horizontalPosition = this.horizontalPosition;
  config.duration = this.setAutoHide ? this.autoHide : 0;
  config.panelClass = ['snack-success'];
  this.snackBar.open(msg, this.action ? this.actionButtonLabel : undefined, config);

}
toastDanger(msg:any){
  let config = new MatSnackBarConfig();
  config.verticalPosition = this.verticalPosition;
  config.horizontalPosition = this.horizontalPosition;
  config.duration = this.setAutoHide ? this.autoHide : 0;
  config.panelClass = ['snack-danger'];
  this.snackBar.open(msg, this.action ? this.actionButtonLabel : undefined, config);
}
}
