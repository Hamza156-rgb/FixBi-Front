import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { ConfigService } from 'src/providers/config/config.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SharedDataService } from 'src/providers/shared-data/shared-data.service';
@Component({
  selector: 'app-manage-jobs-user',
  templateUrl: './manage-jobs-user.component.html',
  styleUrls: ['./manage-jobs-user.component.scss']
})
export class ManageJobsUserComponent implements OnInit {
  reviewsForm!: FormGroup;
  submitted = false;
  formData = {
    supplier:'',
    customer_id:localStorage.getItem('user_id'),
    customer_name:localStorage.getItem('first_name'),
    reviews_rating:'',
    reviews_text:'',
    job_id:'',
  }
  config1 = {
    displayKey: "name",
    search: true,
    placeholder: 'Supplier',
  };
  supplier:any = []
  constructor(public config: ConfigService,public router:Router,private formBuilder: FormBuilder,private shared: SharedDataService) { }
  jobs:any = [];
  ngOnInit(): void {
    this.getJobs();
    this.getAllProfessionals();
    this.reviewsForm = this.formBuilder.group({
      supplier: ['', Validators.required],
      reviews_rating: [''],
      reviews_text: [''],
    });
  }
  getJobs() {
    this.config.getHttp('auth/jobs/getAllJobsByUser?user_id='+localStorage.getItem('user_id'), '').then((data: any) => {
      if(data.data.length > 0){
        this.jobs = data.data;
        console.log(this.jobs);
      }
      
    })
  }
  getAllProfessionals() {
    this.config.getHttp('auth/getAllProfessionals', '').then((data: any) => {
      if(data.data.length > 0){
        this.supplier = data.data;
        for (let sup of this.supplier) {
          if(sup.user_type == '3')
          {
            sup['name'] = sup.first_name + ' ' + sup.last_name;
          }
          else{
            sup['name'] = sup.company_name;
          }
        }

      }
      
    })
  }
  deleteJob(id:any){
    this.config.postHttp('auth/jobs/deleteJob?job_id='+id + '&user_id='+localStorage.getItem('user_id'), '').then((data: any) => {
      if(data.data.length > 0){
        this.jobs = data.data;
      }
      
    })
  }
  editJob(id:any){
    let navigationExtras: NavigationExtras = {
      state: {
        job_id: id,
        
      }
    };
    this.router.navigate(['editJobsUser'],navigationExtras);
  }
  markCompleted(id:any){
    // this.config.postHttp('auth/jobs/updateJobStatus?job_id='+id + '&job_status=1', '').then((data: any) => {
    //   this.getJobs();
      
    // })
    this.formData.job_id = id;
  }
  searchChange(event:any){

  }
  submitReview()
  {
    this.config.postHttp('auth/jobReview/createJobReview', this.formData).then((data: any) => {
      this.shared.toastSuccess('Review given successfully');
      this.formData = {
        supplier:'',
        customer_id:localStorage.getItem('user_id'),
        customer_name:localStorage.getItem('first_name'),
        reviews_rating:'',
        reviews_text:'',
        job_id:''
      }
      this.getJobs();
    })
  }
  get e() { return this.reviewsForm.controls; }
}
