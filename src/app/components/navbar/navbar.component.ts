import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SignInModalComponent } from 'src/app/modals/sign-in-modal/sign-in-modal.component';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/auth.service';
import { ConfigService } from 'src/providers/config/config.service';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  isLoggedIn$!: Observable<boolean>;
  loggedIn: any = '';
  cover: any = '';
  first_name: any = '';
  user_type: any = '';

  // pdf: any = '';
  constructor(public modalService: NgbModal, private authService: AuthService,
    public config: ConfigService,
  ) { }
  openModal() {
    //ModalComponent is component name where modal is declare
    const modalRef = this.modalService.open(SignInModalComponent, { size: 'xl', centered: true });
    modalRef.result.then((result) => {
    }).catch((error) => {
      console.log(error);
    });
  }

  ngOnInit(): void {
    this.getPdf();
    this.isLoggedIn$ = this.authService.isLoggedIn;
    this.isLoggedIn$.subscribe(data => {
      this.user_type = localStorage.getItem("user_type");
      this.loggedIn = data;
      this.first_name = localStorage.getItem("first_name");
    })
  }


  getPdf() {
    this.config.getHttp('pdf/getAllPdfFiles', '').then((data: any) => {
      // console.log(data.data);
      // this.pdf = data.data;
      // this.config.imgUrl;
      // this.pdf.file_path = this.config.imgUrl + this.pdf.file_path;

      var pdf = document.getElementById("pdf_link") as HTMLAnchorElement | null;
      pdf!.href = this.config.imgUrl + data.data[0].file_path;


    })
  }

  onLogout() {
    this.authService.logout();
  }
}
