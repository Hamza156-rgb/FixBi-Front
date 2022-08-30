import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth.service';
import { Observable } from 'rxjs';
import { ConfigService } from 'src/providers/config/config.service';
import { SharedDataService } from 'src/providers/shared-data/shared-data.service';
import { NavigationExtras, Router } from '@angular/router';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser'
@Component({
  selector: 'app-edit-profile-user',
  templateUrl: './edit-profile-user.component.html',
  styleUrls: ['./edit-profile-user.component.scss']
})
export class EditProfileUserComponent implements OnInit {

  image: string | SafeUrl = 'assets/img/download.png';
  loggedIn: any = '';
  isLoggedIn$!: Observable<boolean>;


  formData = {
    first_name: '',
    phone: '',
    last_name: '',
    email: '',
    profile_pic:'assets/img/download.png',
    id: '',
  }

  constructor(
    private authService: AuthService,
    public config: ConfigService,
    public shared: SharedDataService,
    public router: Router,
    private sanitizer: DomSanitizer
  ) { }

  ngOnInit(): void {
    this.isLoggedIn$ = this.authService.isLoggedIn;
    this.getUser(localStorage.getItem("user_id"));
  }


  getUser(id: any) {
    this.config.getHttp('auth/getSingleCustomerById?id=' + id, { id: id }).then((data: any) => {

      this.formData.first_name = data.user.first_name;
      this.formData.phone = data.user.phone;
      this.formData.last_name = data.user.last_name;
      this.formData.email = data.user.email;
      if (data.user.profile_picture) {
        this.formData.profile_pic = data.user.profile_picture;
        this.image = this.config.imgUrl +data.user.profile_picture;
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
  openPP() {
    document.getElementById("pp")?.click();
  }
  updateUser() {
    if(localStorage.getItem("user_id") != null)
    {
      this.formData.id = localStorage.getItem("user_id")!;
    }
    

    var myFormData = new FormData();
    myFormData.append('first_name', this.formData.first_name);
    myFormData.append('last_name', this.formData.last_name)
    myFormData.append('phone', this.formData.phone)
    myFormData.append('email', this.formData.email)
    myFormData.append('profile_pic', this.formData.profile_pic);
    myFormData.append('id', this.formData.id);
    this.config.postHttp('auth/updateCustomer', myFormData).then((data: any) => {
      localStorage.setItem('first_name', this.formData.first_name);
        this.shared.toastSuccess('Profile Updated Sucessfully')
        this.router.navigate(['/profileUser']);

    })
  }



}
