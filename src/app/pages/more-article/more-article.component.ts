import { Component, OnInit } from '@angular/core';
import { ConfigService } from 'src/providers/config/config.service';
import { NgbCarouselConfig, NgbPagination } from '@ng-bootstrap/ng-bootstrap';
import { SharedDataService } from 'src/providers/shared-data/shared-data.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-more-article',
  templateUrl: './more-article.component.html',

  styleUrls: ['./more-article.component.scss']
})
export class MoreArticleComponent implements OnInit {
  // Main Slider
  sliderImage: any = [];
  text: any = '';
  // 

  //Articles
  articleImage: any = [];
  articleHeading: any = '';
  articlePara: any = '';
  //

  id: any;
  constructor(public config: ConfigService,
    config1: NgbCarouselConfig,
    public shared: SharedDataService,
    public router: Router,

  ) { }
  ngOnInit(): void {
    this.getArticlesSlides();
    this.getArticles();

  }
  getArticlesSlides() {
    this.config.getHttp('article/getAllArticlePageSliders', '').then((data: any) => {
      this.sliderImage = data.data;
      this.config.imgUrl;
      for (var i = 0; i < this.sliderImage.length; i++) {
        this.sliderImage[i].image = this.config.imgUrl + this.sliderImage[i].image;
        this.sliderImage[i].image_text = this.sliderImage[i].image_text;
      }
    })
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
  passArticles(id:any) {
    // console.log(id);
    this.router.navigate(['/articles', id])
  }

}




