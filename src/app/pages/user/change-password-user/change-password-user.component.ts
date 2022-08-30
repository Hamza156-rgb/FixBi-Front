import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MustMatch } from 'src/app/helpers/must-match.validator';
import { ConfigService } from 'src/providers/config/config.service';
import { SharedDataService } from 'src/providers/shared-data/shared-data.service';
import { AuthService } from 'src/app/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-change-password-user',
  templateUrl: './change-password-user.component.html',
  styleUrls: ['./change-password-user.component.scss']
})
export class ChangePasswordUserComponent implements OnInit {
  customerForm!: FormGroup;
  formData = {
    old_password: '',
    password: '',
    confirmPassword: '',
    user_id: localStorage.getItem("user_id")
  }
  submitted = false;
  constructor( private formBuilder: FormBuilder,public config: ConfigService,public router: Router,public shared: SharedDataService,
    private authService: AuthService,) { }

  ngOnInit(): void {
    this.customerForm = this.formBuilder.group({
      old_password: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required],
    }, {
      validator: MustMatch('password', 'confirmPassword')
    });
  }
  get f() { return this.customerForm.controls; }
  onSubmit() {
    this.submitted = true;
    if (this.customerForm.invalid) {
      return;
    }
      this.config.postHttp('auth/changePassword', this.formData).then((data: any) => {

          this.shared.toastSuccess('Password Changed Successfully')
          this.router.navigate(['/']);
        
      }).catch((error) => {
      })
    
  }
}
