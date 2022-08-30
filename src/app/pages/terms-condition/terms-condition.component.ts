import { Component, OnInit } from '@angular/core';
import { ConfigService } from 'src/providers/config/config.service';
@Component({
  selector: 'app-terms-condition',
  templateUrl: './terms-condition.component.html',
  styleUrls: ['./terms-condition.component.scss']
})
export class TermsConditionComponent implements OnInit {

  slider: any = [];
  description: any = '';

  constructor(public config: ConfigService,) { }

  ngOnInit(): void {
    this.getTerms();
  }

  getTerms(){
    this.config.getHttp('getTermsAndConditions', '').then((data: any) => {
      // console.log(data.data);
      this.slider = data.data;
      this.config.imgUrl;
      for (var i = 0; i < this.slider.length; i++) {
        this.slider[i].image = this.config.imgUrl + this.slider[i].image;
      }

      this.description = data.data[0].description;

    })

  }

}
