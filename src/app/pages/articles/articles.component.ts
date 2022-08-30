import { Component, OnInit } from '@angular/core';
import { SharedDataService } from 'src/providers/shared-data/shared-data.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ConfigService } from 'src/providers/config/config.service';
// import { DomSanitizer, SafeResourceUrl, SafeUrl } from '@angular/platform-browser';
// import {Pipe, PipeTransform} from '@angular/core';

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.scss']
})

export class ArticlesComponent implements OnInit {

  // @Pipe({
  //   name: 'safeHtml'
  // })
  // public form: FormGroup;
  article: any;
  image: any;
  oldImage: any;
  id: any;
  articleImage: any = '';
  title: any = '';
  description: any = '';
  constructor(public shared: SharedDataService,
    private router: Router,
    private route: ActivatedRoute,
    public config: ConfigService,
    // private _sanitizer: DomSanitizer
  ) { }
  ngOnInit(): void {
    this.route.queryParams
      .subscribe(params => {
        this.id = this.route.snapshot.params['id'];
        // console.log(this.id);
      }
      );
    let param = new HttpParams().set('id', this.id)
    this.config.getHttp('article/getArticleById',  { params: param }).then((data: any) => {
      // console.log(data.data);
      this.config.imgUrl;
      this.image= data.data[0].image;

      // for (var i = 0; i < this.articleImage.length; i++) {
      //   this.articleImage[i].image = this.config.imgUrl + this.articleImage[i].image;
      // }
      this.title = data.data[0].title;
      this.description = data.data[0].description;
      
    })
  }

}
