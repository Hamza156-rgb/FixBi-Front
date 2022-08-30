import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AboutComponent } from './pages/about/about.component';
import { ArticlesComponent } from './pages/articles/articles.component';
import { SignInModalComponent } from './modals/sign-in-modal/sign-in-modal.component';
import { SignUpModalComponent } from './modals/sign-up-modal/sign-up-modal.component';
import { ChangePasswordProviderComponent } from './pages/provider/change-password-provider/change-password-provider.component';
import { EditProfileProviderComponent } from './pages/provider/edit-profile-provider/edit-profile-provider.component';
import { AgmCoreModule } from '@agm/core';
import { FavouriteProviderComponent } from './pages/user/favourite-provider/favourite-provider.component';
import { InboxProviderComponent } from './pages/provider/inbox-provider/inbox-provider.component';
import { InboxUserComponent } from './pages/user/inbox-user/inbox-user.component';
import { ProviderProfileCardComponent } from './components/provider-profile-card/provider-profile-card.component';
import { InsightProviderComponent } from './pages/provider/insight-provider/insight-provider.component';
import { JobsCompletedProviderComponent } from './pages/provider/jobs-completed-provider/jobs-completed-provider.component';
import { ProfileProviderComponent } from './pages/provider/profile-provider/profile-provider.component';
import { SearchPageComponent } from './pages/search-page/search-page.component';
import { ChangePasswordUserComponent } from './pages/user/change-password-user/change-password-user.component';
import { EditProfileUserComponent } from './pages/user/edit-profile-user/edit-profile-user.component';
import { UserProfileCardComponent } from './components/user-profile-card/user-profile-card.component';
import { FavouriteUserComponent } from './pages/user/favourite-user/favourite-user.component';
import { InsightUserComponent } from './pages/user/insight-user/insight-user.component';
import { ManageJobsUserComponent } from './pages/user/manage-jobs-user/manage-jobs-user.component';
import { EditJobsUserComponent } from './pages/user/edit-jobs-user/edit-jobs-user.component';
import { JobListingUserComponent } from './pages/provider/job-listing-provider/job-listing-provider.component';
import { JobDetailsProviderComponent } from './pages/provider/job-details-provider/job-details-provider.component';
import { MoreArticleComponent } from './pages/more-article/more-article.component';
import { PostJobUserComponent } from './pages/user/post-job-user/post-job-user.component';
import { ProfileUserComponent } from './pages/user/profile-user/profile-user.component';
import { FormsModule } from '@angular/forms';
import { ConfigService } from '../providers/config/config.service';
import { SharedDataService } from '../providers/shared-data/shared-data.service';
import { ToastrModule } from 'ngx-toastr';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { FacebookLoginProvider,GoogleLoginProvider,SocialLoginModule, SocialAuthServiceConfig } from 'angularx-social-login';
import { TermsConditionComponent } from './pages/terms-condition/terms-condition.component';
import { SelectDropDownModule } from 'ngx-select-dropdown';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { environment } from 'src/environments/environment';
import {ScrollingModule} from '@angular/cdk/scrolling';
import { ScrollToModule } from '@nicky-lenaers/ngx-scroll-to';
import {MatDialogModule} from '@angular/material/dialog';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatIconModule} from '@angular/material/icon';
import {MatListModule} from '@angular/material/list';
import { SearchFilterPipe } from './search-filter.pipe';
import { ViewJobProfileComponent } from './pages/provider/view-job-profile/view-job-profile.component';
import { JobsAssignedComponent } from './pages/provider/jobs-assigned/jobs-assigned.component';
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavbarComponent,
    FooterComponent,
    AboutComponent,
    ArticlesComponent,
    SignInModalComponent,
    SignUpModalComponent,
    ChangePasswordProviderComponent,
    EditProfileProviderComponent,
    FavouriteProviderComponent,
    InboxProviderComponent,
    InboxUserComponent,
    ProviderProfileCardComponent,
    InsightProviderComponent,
    JobsCompletedProviderComponent,
    ProfileProviderComponent,
    SearchPageComponent,
    ChangePasswordUserComponent,
    EditProfileUserComponent,
    UserProfileCardComponent,
    FavouriteUserComponent,
    InsightUserComponent,
    ManageJobsUserComponent,
    EditJobsUserComponent,
    JobListingUserComponent,
    JobDetailsProviderComponent,
    MoreArticleComponent,
    PostJobUserComponent,
    ProfileUserComponent,
    TermsConditionComponent,
    SearchFilterPipe,
    ViewJobProfileComponent,
    JobsAssignedComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CarouselModule,
    SocialLoginModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyA9qrEzgWTfH3yCDiYk57aK72MPnldGr24',
      libraries: ['places']
    }),
    ToastrModule.forRoot(),
    HttpClientModule,
    SlickCarouselModule,
    CarouselModule,
    BrowserAnimationsModule,
    NgbModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SelectDropDownModule,
    ScrollingModule,
    MatDialogModule,
    MatSnackBarModule,
    MatIconModule,
    MatListModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,AngularFirestoreModule,
    ScrollToModule.forRoot()
  ],
  providers: [ConfigService, SharedDataService,

    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider(
              '37768551355-quc0prkkvhus2nobk0g6ig2ril1ohkuj.apps.googleusercontent.com'
            )
          },
          {
            id: FacebookLoginProvider.PROVIDER_ID,
            provider: new FacebookLoginProvider('797855831394625'),
          },

        ]
      } as SocialAuthServiceConfig,
    }



  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
