import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SignInModalComponent } from 'src/app/modals/sign-in-modal/sign-in-modal.component';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/auth.service';
import { Router } from '@angular/router';
import { SharedDataService } from 'src/providers/shared-data/shared-data.service';
import { ConfigService } from 'src/providers/config/config.service';
@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  isLoggedIn$!: Observable<boolean>;
  loggedIn: any = '';
  articleImage: any = [];
  articleHeading: any = '';
  articlePara: any = '';
  constructor(public modalService: NgbModal,
    private authService: AuthService,
    public shared: SharedDataService,
    public router: Router,
    public config: ConfigService,
  ) { }

  ngOnInit(): void {
this.getArticles();
    this.isLoggedIn$ = this.authService.isLoggedIn;
    this.isLoggedIn$.subscribe(data => {
      this.loggedIn = data;


    })
  }
  openLogInModal() {
    //ModalComponent is component name where modal is declare
    const modalRef = this.modalService.open(SignInModalComponent, { size: 'xl', centered: true });
    modalRef.result.then((result) => {
      console.log(result);
    }).catch((error) => {
      console.log(error);
    });
  }

  getArticles() {
    this.config.getHttp('article/getAllArticles', '').then((data: any) => {
      // console.log(data.data);
      this.articleImage = data.data;
      this.config.imgUrl;
      for (var i = 0; i < this.articleImage.length; i++) {
        this.articleImage[i].image = this.config.imgUrl + this.articleImage[i].image;
      }

    })
  }
}
