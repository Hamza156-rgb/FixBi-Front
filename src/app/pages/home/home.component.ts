import { Component, OnInit, Input } from '@angular/core';
import { NgbCarouselConfig, NgbPagination } from '@ng-bootstrap/ng-bootstrap';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SignInModalComponent } from 'src/app/modals/sign-in-modal/sign-in-modal.component';
import { SignUpModalComponent } from 'src/app/modals/sign-up-modal/sign-up-modal.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ConfigService } from 'src/providers/config/config.service';
import { Router, NavigationExtras, } from '@angular/router';
import { SharedDataService } from 'src/providers/shared-data/shared-data.service';
import { ApiService } from 'src/providers/api/api.service';
import { HelperService } from 'src/providers/helper/helper.service';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],

})

export class HomeComponent implements OnInit {
  registerForm!: FormGroup;
  getOfferForm!: FormGroup;
  currentUser: any = {};

  temp: any; // for handling temporory data from observables.
  submitted = false;
  selectedCategory: any;
  articleImage: any = [];
  articleHeading: any = '';
  articlePara: any = '';
  isFav = false;

  formCompany = {
    category: '',
    sub_category: [],

  }

  config1 = {
    displayKey: "name",
    search: true,
    placeholder: 'Category',
    height: '300px'

  };
  config2 = {
    displayKey: "name", // if objects array passed which key to be displayed defaults to description
    search: true,
    placeholder: 'Sub Category',
    height: '300px'
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
    height: '300px'
  };


  config5 = {
    displayKey: "name", // if objects array passed which key to be displayed defaults to description
    search: true,
    placeholder: 'Region',
    height: '300px'
  };

  config7 = {
    displayKey: "name",
    search: true,
    placeholder: 'Pharmacy',
    height: '300px'

  };

  dynamicSlides = [
    {
      'id': '1',
      'src': 'assets/img/user.png',
      'alt': 'Side 1',
      'title': 'Side 1'
    },
    {
      'id': '2',
      'src': 'assets/img/Mask2.png',
      'alt': 'Side 2',
      'title': 'Side 2'
    },
    {
      'id': '3',
      'src': 'assets/img/Mask2.png',
      'alt': 'Side 3',
      'title': 'Side 3'
    },
    {
      'id': '4',
      'src': 'assets/img/Mask2.png',
      'alt': 'Side 3',
      'title': 'Side 3'
    },
    {
      'id': '5',
      'src': 'assets/img/Mask2.png',
      'alt': 'Side 3',
      'title': 'Side 3'
    },
    {
      'id': '6',
      'src': 'assets/img/Mask2.png',
      'alt': 'Side 3',
      'title': 'Side 3'
    },
    {
      'id': '7',
      'src': 'assets/img/Mask2.png',
      'alt': 'Side 3',
      'title': 'Side 3'
    },

  ]
  title = 'ng-carousel-demo';
  mainSliderImages = [
    { title: 'Find The Services You Are Looking For', short: 'First Slide Short', src: "assets/img/home.jpg" },
    { title: 'Find The Services You Are Looking For', short: 'Second Slide Short', src: "assets/img/home.jpg" },
    { title: 'Find The Services You Are Looking For', short: 'Third Slide Short', src: "assets/img/home.jpg" }
  ];
  newProvders: any = [];
  featuredProviders: any = [];
  whatPeopleaySliderImages = [
    { name: 'Edith Bowman', post: 'Managing Director', image: 'assets/img/Mask2.png' },
    { name: 'Edith Bowman', post: 'Managing Director', image: 'assets/img/Mask2.png' },
    { name: 'Edith Bowman', post: 'Managing Director', image: 'assets/img/Mask2.png' }
  ]

  latestArticlesAndTips = [
    {
      'title': 'Why Most Construction Fail',
      'text': 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the',
      'internalLink': '#',
      'image': 'assets/img/laptop.png'
    },
    {
      'title': 'Why Most Construction Fail',
      'text': 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the',
      'internalLink': '#',
      'image': 'assets/img/laptop.png'
    },
    {
      'title': 'Why Most Construction Fail',
      'text': 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the',
      'internalLink': '#',
      'image': 'assets/img/laptop.png'
    }
  ]

  categories: any = [];
  sub_categories = [];
  countries = [];
  city = [];
  region = [];
  res: any = [];
  searchBox = {
    keyword: '',
    category: '',
    sub_category: [],
    city: [],
    region: [],
    country: []
  }
  getOffer = {
    category: '',
    sub_category: [],
    city: [],
    region: [],
    country: [],
    work_description: ''
  }
  user_id = "";
  modalCategory: any;
  constructor(
    config1: NgbCarouselConfig,
    public modalService: NgbModal,
    private formBuilder: FormBuilder,
    public config: ConfigService,
    public router: Router,
    public shared: SharedDataService,
    public api: ApiService, private helper: HelperService, private cdref: ChangeDetectorRef

  ) {
    config1.interval = 7000;
    config1.keyboard = true;
    config1.pauseOnHover = true;
    config1.showNavigationArrows = false;
    config1.showNavigationIndicators = true;
  }
  ngOnInit(): void {
    this.getCurrentUser();
    this.getCategory();
    this.getCountry();
    this.getNewProviders();
    this.getfeaturedProviders();
    this.getArticles();
    this.user_id = localStorage.getItem('user_id');
    console.log(this.user_id);
    this.registerForm = this.formBuilder.group({
      category: ['', Validators.required],
      keyword: [''],
      subCategory: ['', Validators.required],
      country: ['', Validators.required],
      city: ['', Validators.required],
      region: ['', Validators.required],
    }, {

    });
    this.getOfferForm = this.formBuilder.group({
      title: ['', Validators.required],
      work_description: ['', Validators.required],
      subtitle: ['', Validators.required],
      country: ['', Validators.required],
      city: ['', Validators.required],
      region: ['', Validators.required],
    }, {

    });

  }




  ngAfterContentChecked() {
    this.user_id = localStorage.getItem('user_id');
    this.cdref.detectChanges();
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
  openSignUpModal() {
    //ModalComponent is component name where modal is declare
    const modalRef = this.modalService.open(SignUpModalComponent, { backdrop: 'static', size: 'xl', centered: true });
    modalRef.result.then((result) => {
      console.log(result);
    }).catch((error) => {
      console.log(error);
    });
  }
  changeCategoryName(category: any) {
    this.searchBox = {
      keyword: '',
      category: category,
      sub_category: [],
      city: [],
      region: [],
      country: []
    }
    this.config.getHttp('sub_categories/getAllSubCategories?cat_id=' + category.id, '').then((data: any) => {
      this.sub_categories = data.data;
    })
  }


  getCountry() {
    this.config.getHttp('country/getAllCountries', '').then((data: any) => {
      this.countries = data.data;
    })
  }
  getCategory() {
    this.config.getHttp('category/getAllCategories', '').then((data: any) => {
      this.categories = data.data;

    })
  }
  getNewProviders() {
    var param = '';
    if (localStorage.getItem('user_id')) {
      param = '?customer_id=' + localStorage.getItem('user_id');
    }

    this.config.getHttp('auth/getNewProviders' + param, '').then((data: any) => {
      if (data.data.length > 0) {
        this.newProvders = data.data;
        var i = 0, tempArr = [];
        while (i < this.newProvders.length) {
          if (i !== 0 && i % 3 === 0) {
            this.res.push(tempArr);
            tempArr = [this.newProvders[i]];
          } else {
            tempArr.push(this.newProvders[i]);
          }
          i++;
        }
        this.res.push(tempArr);
      }


    })
  }
  getfeaturedProviders() {
    var param = '';
    if (localStorage.getItem('user_id')) {
      param = '?customer_id=' + localStorage.getItem('user_id');
    }
    this.config.getHttp('auth/getFeaturedProviders' + param, '').then((data: any) => {
      if (data.data.length > 0) {
        this.featuredProviders = data.data;
      }


    })
  }
  searchCountry(event: any) {
    this.searchBox.city = []
    this.config.getHttp('city/getCitiesByCountry?country_id=' + event.value.id, '').then((data: any) => {
      this.city = data.data;
    })
  }
  searchCountry1(event: any) {
    this.getOffer.city = []
    this.config.getHttp('city/getCitiesByCountry?country_id=' + event.value.id, '').then((data: any) => {
      this.city = data.data;
    })
  }
  searchcity(event: any) {
    this.searchBox.region = [];
    var dummy: any = this.searchBox.city;
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
  searchcity1(event: any) {
    this.getOffer.region = [];
    var dummy: any = this.getOffer.city;
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
  searchChange(event: any) {
    this.searchBox.sub_category = []
    this.config.getHttp('sub_categories/getAllSubCategories?cat_id=' + event.value.id, '').then((data: any) => {
      this.sub_categories = data.data;
    })
  }
  searchChange2(event: any) {
    this.getOffer.sub_category = []
    this.config.getHttp('sub_categories/getAllSubCategories?cat_id=' + event.value.id, '').then((data: any) => {
      this.sub_categories = data.data;
    })
  }

  get f() { return this.registerForm.controls; }
  get e() { return this.getOfferForm.controls; }


  onSubmit() {
    document.getElementById('closebtn')?.click();
    this.submitted = true;
    if (this.registerForm.invalid) {
      return;
    }
    let navigationExtras: NavigationExtras = {
      state: {
        searchResult: JSON.stringify(this.searchBox),

      }
    };
    this.router.navigate(['searchPage'], navigationExtras);


  }

  onReset() {
    this.submitted = false;
    this.registerForm.reset();
  }

  searchChange1(event: any) {
  }

  searchChange3(event: any) {
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


  passArticles(id: any) {
    // console.log(id);
    this.router.navigate(['/articles', id])
  }
  addToFav(provider: any) {
    if (localStorage.getItem('user_id')) {
      for (var singlearray of this.res) {
        for (var p of singlearray) {
          if (provider.id == p.id) {
            p.is_liked = true;
          }
        }
      }
      for (var fp of this.featuredProviders) {
        if (provider.id == fp.id) {
          fp.is_liked = true;
        }
      }
      this.config.postHttp('addCustomerFavorite?customer_id=' + localStorage.getItem('user_id') + '&provider_id=' + provider.user_id, '').then((data: any) => {
        this.shared.toastSuccess('Supplier Added To Favourites');
      })
    }
    else {
      const modalRef = this.modalService.open(SignInModalComponent, { size: 'xl', centered: true });
      modalRef.result.then((result) => {
      }).catch((error) => {
        console.log(error);
      });
    }
  }
  removeFromFav(provider: any) {
    if (localStorage.getItem('user_id')) {
      for (var singlearray of this.res) {
        for (var p of singlearray) {
          if (provider.id == p.id) {
            p.is_liked = false;
          }
        }
      }
      for (var fp of this.featuredProviders) {
        if (provider.id == fp.id) {
          fp.is_liked = false;
        }
      }
      this.config.postHttp('deleteFavorite?customer_id=' + localStorage.getItem('user_id') + '&provider_id=' + provider.user_id, '').then((data: any) => {
        this.shared.toastDanger('Supplier Removed From Favourites');
      })
    }
    else {
      const modalRef = this.modalService.open(SignInModalComponent, { size: 'xl', centered: true });
      modalRef.result.then((result) => {
      }).catch((error) => {
        console.log(error);
      });
    }
  }
  ongetOffer() {
    this.config.postHttp('search/getResults', this.getOffer).then((data: any) => {
      // console.log(data.data)
      if (data.data.length == 0) {
        this.shared.toastDanger('No Providers Found Near You.');
        return;
      }
      else {
        for (var d = 0; d < data.data.length; d++) {
          this.selectUser(data.data[d], this.getOffer.work_description);
          if (d == data.data.length - 1) {
            this.shared.toastSuccess('Providers Near you informed');
            setTimeout(() => {
              this.api.conversations = [];
            }, 300);

          }

        }
      }

    })
  }
  getCurrentUser() {
    this.api.setCurrentUser(localStorage.getItem('user_id'));
  }
  async selectUser(user, msgg) {
    // try {
    //   this.helper.closeModal()
    // } catch (e) { console.log(e) }

    if (this.api.currentUser.conversations == undefined) {
      //means user has no conversations.
      this.api.currentUser.conversations = [];
    }
    let chat: any = {};
    let messages: any = [];
    let convo = [...this.api.currentUser.conversations]; //spread operators for ensuring type Array.
    console.log(convo);
    let find = convo.find(item => item.uid == user.user_id); // Check If Its the same person who user has talked to before,

    if (find) { // Conversation Found 
      this.api.getChat1(find.chatId).subscribe(x => {
        x.docs.map(doc => {
          this.temp = doc.data();
          chat = this.temp;
          messages = chat.messages == undefined ? [] : chat.messages;

          this.sendMessage(chat.chatId, msgg, messages);

        })
      })
    } else {
      /* User is talking to someone for the very first time. */
      chat = this.api.addNewChat1();

      // .then(async (data:any) => { // This will create a chatId Instance. 
      //  // Now we will let both the users know of the following chatId reference
      //  console.log(data);
      let b = this.api.addConvo1(user, chat); //passing other user info

      this.sendMessage(chat, msgg, messages);


      // })

    }
  }
  sendMessage(chat, message, messages) {
    let msg = {
      senderId: this.api.currentUser.uid,
      senderName: this.api.currentUser.name,
      timestamp: new Date(),
      is_seen: false,
      content: message
    };
    //update 
    messages.push(msg);
    // console.log(chat,messages);
    this.api.pushNewMessage1(chat, messages).then(() => {
    })
  }
}
