import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SignUpModalComponent } from 'src/app/modals/sign-up-modal/sign-up-modal.component';
// import { ConfigService } from 'src/providers/config/config.service';
import { ConfigService } from 'src/providers/config/config.service';

import { Observable } from 'rxjs';
import { AuthService } from 'src/app/auth.service';
@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {
  isLoggedIn$!: Observable<boolean>;
  loggedIn: any = '';
  safeSrc: SafeResourceUrl;
  constructor(private sanitizer: DomSanitizer, public modalService: NgbModal, private authService: AuthService, public config: ConfigService,) { this.safeSrc = this.sanitizer.bypassSecurityTrustResourceUrl("https://www.youtube.com/embed/JBRNy5z9kBw"); }

  cardsData = [
    {
      'title': 'Hassle free',
      'text': 'Find your service with one click',
      'img': 'assets/img/Hasslefree.png'
    },
    {
      'title': 'All Professionals',
      'text': 'Find the most efficient Suits your needs',
      'img': 'assets/img/AllProfessionals.png'
    },
    {
      'title': 'Risk free',
      'text': 'Fill up the contract Between you andthe professional For each stage',
      'img': 'assets/img/Riskfree.png'
    },
    {
      'title': 'Secure payments',
      'text': 'Pay for each completed Phase through the contract',
      'img': 'assets/img/secure-payment.png'
    },
    {
      'title': 'On Time',
      'text': 'The efficient way of Searching services',
      'img': 'assets/img/OnTime.png'
    },
    {
      'title': 'Cost efficient',
      'text': 'Get quotes from Different professionals',
      'img': 'assets/img/Costefficient.png'
    },
    {
      'title': 'Premium Experience',
      'text': 'Take a look at the Feedbacks and Portfolios for better decision',
      'img': 'assets/img/PremiumExperience.png'
    },
    {
      'title': '24/7 Service',
      'text': 'contact the service Provider directly',
      'img': 'assets/img/24-hours.png'
    },
  ]
  partners = [
    {
      'image': 'assets/img/logo1.png'
    },
    {
      'image': 'assets/img/logo2.png'
    },
    {
      'image': 'assets/img/logo2.png'
    },
    {
      'image': 'assets/img/logo4.png'
    },
    {
      'image': 'assets/img/logo1.png'
    },
    {
      'image': 'assets/img/logo2.png'
    },
    {
      'image': 'assets/img/logo2.png'
    },
    {
      'image': 'assets/img/logo4.png'
    }
  ]
  ngOnInit(): void {
    this.isLoggedIn$ = this.authService.isLoggedIn;
    this.isLoggedIn$.subscribe(data => {
      this.loggedIn = data;
    })
  }
  openSignUpModal() {
    //ModalComponent is component name where modal is declare
    const modalRef = this.modalService.open(SignUpModalComponent, { backdrop: 'static', size: 'xl', centered: true });
    modalRef.result.then((result) => {
      console.log(result);
    }).catch((error) => {
      console.log(error);
    });
  }


  about() {
    // console.log();
    this.config.getHttp('', '').then((data: any) => {
      console.log(data);

    })
  }


}
