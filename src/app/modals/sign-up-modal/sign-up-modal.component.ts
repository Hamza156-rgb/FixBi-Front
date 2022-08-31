import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { SharedDataService } from 'src/providers/shared-data/shared-data.service';
import { ConfigService } from 'src/providers/config/config.service';
import { ApiService } from 'src/providers/api/api.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MustMatch } from 'src/app/helpers/must-match.validator';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth.service';
@Component({
  selector: 'app-sign-up-modal',
  templateUrl: './sign-up-modal.component.html',
  styleUrls: ['./sign-up-modal.component.scss']
})
export class SignUpModalComponent implements OnInit {
  showCompanyForm = false;
  showUserForm = true;
  company = true;
  professional = false;
  companyElemnt: any;
  userElemnt: any;
  companyBorder: any;
  professionalBorder: any;
  customerForm!: FormGroup;
  companyForm!: FormGroup;
  professionalForm!: FormGroup;
  submitted = false;
  submitteds = false;
  refs: any;
  terms = false;

  //config company//
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

  //config company End //




  //professional config//
  pconfig1 = {
    displayKey: "name",
    search: true,
    placeholder: 'Category',
    height:'300px'
  };

  pconfig2 = {
    displayKey: "name", // if objects array passed which key to be displayed defaults to description
    search: true,
    placeholder: 'Sub Category',
    height:'300px'
  };


  pconfig3 = {
    displayKey: "name", // if objects array passed which key to be displayed defaults to description
    search: true,
    placeholder: 'Country',
  };

  pconfig4 = {
    displayKey: "name", // if objects array passed which key to be displayed defaults to description
    search: true,
    placeholder: 'City',
  };


  pconfig5 = {
    displayKey: "name", // if objects array passed which key to be displayed defaults to description
    search: true,
    placeholder: 'Region',
  };

  //professional config End//




  //compan options//
  categories = [];
  sub_categories = [];
  countries = [];
  city = [];
  region = [];
  //company End options //




  //professional Arrays//
  pcategories = [];
  psub_categories = [];
  pcountries = [];
  pcity = [];
  pregion = [];
  //professional End


  formData = {
    first_name: '',
    last_name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    user_type: '2',
    termsSelected: '',
  }

  formCompany = {
    category: '',
    sub_category: [],
    company_name: '',
    tax_number: '',
    jobs: '',
    country: '',
    city: [],
    region: [],
    phone: '',
    email: '',
    password: '',
    confirmPassword: '',
    user_type: '4',
    is_active: '',
    provider: 'website',
  }

  formProfessional = {
    category: '',
    sub_category: [],
    first_name: '',
    last_name: '',
    tax_number: '',
    jobs: '',
    country: '',
    city: [],
    region: [],
    phone: '',
    email: '',
    password: '',
    confirmPassword: '',
    user_type: '3',
    is_active: '',
    provider: 'website',
  }


  constructor(private activeModal: NgbActiveModal,
    public shared: SharedDataService,
    public config: ConfigService,
    private formBuilder: FormBuilder,
    public router: Router,
    private authService: AuthService,
    private api:ApiService,
  ) {
  }

  ngOnInit(): void {
    this.getCategory();
    this.getCountry();
    this.getCity();
    this.getRegion();

    this.customerForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phonenumber: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required],
    }, {
      validator: MustMatch('password', 'confirmPassword')
    });

    this.companyForm = this.formBuilder.group({
      title: ['', Validators.required],
      subtitle: ['', Validators.required],
      companyName: ['', Validators.required],
      jobs: ['', Validators.required],
      country: ['', Validators.required],
      city: ['', Validators.required],
      region: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phonenumber: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', Validators.required],

    }, {
      validator: MustMatch('password', 'confirmPassword')
    });

    this.professionalForm = this.formBuilder.group({
      title: ['', Validators.required],
      subtitle: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      jobs: ['', Validators.required],
      country: ['', Validators.required],
      city: ['', Validators.required],
      region: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phonenumber: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', Validators.required],

    }, {
      validator: MustMatch('password', 'confirmPassword')
    });

  }

  closeModal() {
    this.activeModal.close('Modal Closed');
  }
  showUserDiv() {
    this.showUserForm = true;
    this.showCompanyForm = false;
    this.userElemnt = document.getElementById('hidediv');
    this.companyElemnt.style.backgroundColor = "#2367bc";
    this.companyElemnt = document.getElementById('showdiv');
    this.companyElemnt.style.backgroundColor = "#C4C4C4";
  }
  showDiv() {
    this.showCompanyForm = true;
    this.showUserForm = false;
    this.companyElemnt = document.getElementById('showdiv');
    this.companyElemnt.style.backgroundColor = "#2367bc";
    this.companyElemnt = document.getElementById('hidediv');
    this.companyElemnt.style.backgroundColor = "#C4C4C4";
  }
  showCompany() {
    this.company = true;
    this.professional = false;
    this.companyBorder = document.getElementById('companyBorder')
    this.companyBorder.style.borderBottom = "2px solid #2367bc";
    this.professionalBorder = document.getElementById('progessionalBorder')
    this.professionalBorder.style.borderBottom = 'none';
  }
  showProfessional() {
    this.company = false;
    this.professional = true;
    this.professionalBorder = document.getElementById('progessionalBorder')
    this.professionalBorder.style.borderBottom = "2px solid #2367bc";
    this.companyBorder = document.getElementById('companyBorder')
    this.companyBorder.style.borderBottom = "none";

  }

  getCategory() {
    this.config.getHttp('category/getAllCategories', '').then((data: any) => {
      this.categories = data.data;
      this.pcategories = data.data;
    })
  }

  getCountry() {
    this.config.getHttp('country/getAllCountries', '').then((data: any) => {
      this.countries = data.data;
      this.pcountries = data.data;
    })
  }
  getCity() {
    this.config.getHttp('city/getAll', '').then((data: any) => {
    })
  }

  getRegion() {
    this.config.getHttp('region/getAll', '').then((data: any) => {
    })
  }

  //company//
  searchChange(event: any) {
    this.formCompany.sub_category = []
    this.config.getHttp('sub_categories/getAllSubCategories?cat_id=' + event.value.id, '').then((data: any) => {
      this.sub_categories = data.data;
    })
  }
  searchChange1(event: any) {
  }
  searchCountry(event: any) {
    this.formCompany.city = []
    this.config.getHttp('city/getCitiesByCountry?country_id=' + event.value.id, '').then((data: any) => {
      this.city = data.data;
    })
  }
  searchcity(event: any) {
    this.formCompany.region = [];
    var dummy: any = this.formCompany.city;
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
  searchregion(event: any) {
  }

  //company End//




  //Professional

  PsearchChange(event: any) {
    this.formProfessional.sub_category = []
    this.config.getHttp('sub_categories/getAllSubCategories?cat_id=' + event.value.id, '').then((data: any) => {
      this.psub_categories = data.data;
    })
  }
  psearchChange1(event: any) {
  }
  psearchCountry(event: any) {
    this.formProfessional.city = []
    this.config.getHttp('city/getCitiesByCountry?country_id=' + event.value.id, '').then((data: any) => {
      this.pcity = data.data;
    })
  }
  psearchcity(event: any) {
    this.formProfessional.region = [];
    var dummy: any = this.formProfessional.city;
    if (dummy.length == 0) {
      this.pregion = [];
      return;
    }
    var a = []
    for (var i = 0; i < dummy.length; i++) {
      a.push(dummy[i].id);
    }
    this.config.getHttp('region/getRegionsByCity?city_id=' + a.toString(), '').then((data: any) => {
      this.pregion = data.data;
    })
  }
  psearchregion(event: any) {
  }

  //professional End//




  get f() { return this.customerForm.controls; }
  get e() { return this.companyForm.controls; }
  get g() { return this.professionalForm.controls; }



  onSubmit() {
    this.submitted = true;
    if (this.customerForm.invalid) {
      return;
    }
    if (this.terms == false) {
      this.shared.toastDanger("Please agree to terms and conditions");
      return;
    }

    else {
      this.config.postHttp('auth/registerCustomer', this.formData).then((data: any) => {
        localStorage.setItem("first_name", data.data[0].first_name);
        localStorage.setItem("user_type", data.data[0].user_type);
        localStorage.setItem("user_id", data.data[0].user_id);
        localStorage.setItem("token", data.token);
        this.api.createUser(data.data[0].user_id, {
          name: data.data[0].first_name + ' ' + data.data[0].last_name, 
          email: data.data[0].email,
          user_type:data.data[0].user_type,
          uid: data.data[0].user_id,
        }).then(()=>{
          this.closeModal()
          this.authService.login(this.customerForm.value);
          this.shared.toastSuccess('Registered Successfully')
          this.router.navigate(['/']);
        })

       
      }).catch((error) => {
      })
    }
  }

  onSubmits() {
    this.submitted = true;
    if (this.companyForm.invalid) {
      return;
    }
    // console.log(this.formCompany);

    if (this.terms == false) {
      this.shared.toastDanger("Please agree to terms and conditions");
      return;
    }
    else {

      this.config.postHttp('auth/registerProfessional', this.formCompany).then((data: any) => {
        localStorage.setItem("first_name", data.data[0].user_data[0].company_name);
        localStorage.setItem("user_type", data.data[0].user_data[0].user_type);
        localStorage.setItem("user_id", data.data[0].user_data[0].user_id);
        localStorage.setItem("token", data.token);
        if (data.success == 0) {
          alert(data.message)
        }
        else if (data.success == 1) {
          this.api.createUser(data.data[0].user_data[0].user_id, {
            name: data.data[0].user_data[0].company_name, 
            email: data.data[0].user_data[0].email,
            user_type:data.data[0].user_data[0].user_type,
            uid: data.data[0].user_data[0].user_id,
          }).then((data)=>{
            this.shared.toastSuccess('Registered Successfully')
            this.authService.login(this.companyForm.value);
            this.closeModal()
            this.router.navigate(['/']);
          }),err=>{
            console.log(err.message);
            
                }

        }
      })
    }

  }
  onSubmitss() {
    this.submitted = true;
    if (this.professionalForm.invalid) {
      return;
    }
    // console.log(this.formProfessional);

    if (this.terms == false) {
      this.shared.toastDanger("Please agree to terms and conditions");
      return;


    }

    else {
      this.config.postHttp('auth/registerProfessional', this.formProfessional).then((data: any) => {
        // console.log(data);
        localStorage.setItem("first_name", data.data[0].user_data[0].first_name);
        localStorage.setItem("user_type", data.data[0].user_data[0].user_type);
        localStorage.setItem("user_id", data.data[0].user_data[0].user_id);
        localStorage.setItem("token", data.token);
        if (data.success == 0) {
          alert(data.message)
        }
        else if (data.success == 1) {
          this.api.createUser(data.data[0].user_data[0].user_id, {
            name:data.data[0].user_data[0].first_name + ' ' + data.data[0].user_data[0].last_name, 
            email: data.data[0].user_data[0].email,
            user_type: data.data[0].user_data[0].user_type,
            uid: data.data[0].user_data[0].user_id,
          }).then(()=>{
            this.shared.toastSuccess('Registered Successfully')
            this.authService.login(this.professionalForm.value);
            this.closeModal()
            this.router.navigate(['/']);
          })

        }
      })
    }

  }



  onReset() {
    this.submitted = false;
    this.customerForm.reset();
  }
}
