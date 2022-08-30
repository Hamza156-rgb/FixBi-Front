import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { SignUpModalComponent } from '../sign-up-modal/sign-up-modal.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SharedDataService } from 'src/providers/shared-data/shared-data.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SocialAuthService, GoogleLoginProvider, FacebookLoginProvider } from 'angularx-social-login';
import { ConfigService } from 'src/providers/config/config.service';
import { NavigationExtras, Router } from '@angular/router';
import { AuthService } from 'src/app/auth.service';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-sign-in-modal',
  templateUrl: './sign-in-modal.component.html',
  styleUrls: ['./sign-in-modal.component.scss']
})
export class SignInModalComponent implements OnInit {
  registerForm!: FormGroup;
  submitted = false;
  userData: any;
  userType = '';
  formData = {
    email: '',
    password: '',

  }


  constructor(private activeModal: NgbActiveModal,
    public modalService: NgbModal,
    public shared: SharedDataService,
    private formBuilder: FormBuilder,
    private socialAuthService: SocialAuthService,
    public config: ConfigService,
    public router: Router,
    private authService: AuthService,
    private toastr: ToastrService,
  ) {
  }

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],

    },
      {

      });
  }
  closeModal() {
    this.activeModal.close('Modal Closed');
  }
  openModal() {
    this.closeModal();
    //ModalComponent is component name where modal is declare
    const modalRef = this.modalService.open(SignUpModalComponent, { backdrop: 'static', size: 'xl', centered: true });
    modalRef.result.then((result) => {
      console.log(result);
    }).catch((error) => {
      console.log(error);
    });
  }


  get f() { return this.registerForm.controls; }

  login() {
    this.submitted = true;

    if (this.registerForm.invalid) {
      return;
    }
    else {
      this.config.postHttp('auth/login', this.formData).then((data: any) => {
        // console.log(data.data);

        if (data.user.first_name) {
          localStorage.setItem("first_name", data.user.first_name);
        }
        else {
          localStorage.setItem("first_name", data.user.company_name);
        }
        localStorage.setItem("user_type", data.user.user_type);
        localStorage.setItem("token", data.token);
        localStorage.setItem("user_id", data.user.user_id);
        if (data.status == 401) {
          this.shared.toastDanger('Alredady')
          // console.log('sad')
        }
        else if (data.status == 200) {
          this.closeModal()
          this.authService.login(this.registerForm.value);
          this.shared.toastSuccess('Logged In Successfully')
          //this.router.navigate(['/']);

        }

        return localStorage.getItem('data');
      })
    }


  }

  onReset() {
    this.submitted = false;
    this.registerForm.reset();
  }

  loginWithGoogle(): void {
    this.socialAuthService.signIn(GoogleLoginProvider.PROVIDER_ID).then(data => {
      console.log(data);
      this.userData = data;
      this.config.postHttp('auth/googleRegistration?userId=' + this.userData.id + '&email=' + this.userData.email + '&familyName=' + this.userData.lastName + '&givenName=' + this.userData.firstName, '').then((data: any) => {
        // console.log(data);
        localStorage.setItem("first_name", data.user.first_name);
        localStorage.setItem("user_type", data.user.user_type);
        localStorage.setItem("token", data.token);
        localStorage.setItem("user_id", data.user.user_id);

        this.closeModal()
        this.authService.sociallogin(data.user.first_name, data.user.password);
        this.shared.toastSuccess('Logged In Successfully')
        this.router.navigate(['/about']);
        return localStorage.getItem('data');
      })
    })
      .catch(err => {
        this.userData = err;
        // console.log('err', this.userData)
      });
  }


  loginWithFacebook(): void {
    this.socialAuthService.signIn(FacebookLoginProvider.PROVIDER_ID).then(data => {
      this.userData = data;
      this.config.postHttp('auth/facebookRegistration?userId=' + this.userData.userId + '&email=' + this.userData.email + '&familyName=' + this.userData.lastName + '&givenName=' + this.userData.firstName, '').then((data: any) => {
        // console.log(data);
        localStorage.setItem("first_name", data.user.first_name);
        localStorage.setItem("user_type", data.user.user_type);
        localStorage.setItem("token", data.token);
        localStorage.setItem("user_id", data.user.user_id);
        this.closeModal()
        this.authService.login(this.registerForm.value);
        this.shared.toastSuccess('Logged In Successfully')
        this.router.navigate(['/about']);
        return localStorage.getItem('data');
      })
    })
      .catch(err => {
        this.userData = err;
        // console.log('err', this.userData)
      });
  }


}
