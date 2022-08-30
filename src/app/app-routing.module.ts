import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { AboutComponent } from './pages/about/about.component';
import { ArticlesComponent } from './pages/articles/articles.component';
import { ChangePasswordProviderComponent } from './pages/provider/change-password-provider/change-password-provider.component';
import { ChangePasswordUserComponent } from './pages/user/change-password-user/change-password-user.component';
import { EditProfileProviderComponent } from './pages/provider/edit-profile-provider/edit-profile-provider.component';
import { EditProfileUserComponent } from './pages/user/edit-profile-user/edit-profile-user.component';
import { FavouriteProviderComponent } from './pages/user/favourite-provider/favourite-provider.component';
import { FavouriteUserComponent } from './pages/user/favourite-user/favourite-user.component';
import { InboxProviderComponent } from './pages/provider/inbox-provider/inbox-provider.component';
import { InboxUserComponent } from './pages/user/inbox-user/inbox-user.component';
import { ProviderProfileCardComponent } from './components/provider-profile-card/provider-profile-card.component';
import { UserProfileCardComponent } from './components/user-profile-card/user-profile-card.component';
import { InsightProviderComponent } from './pages/provider/insight-provider/insight-provider.component';
import { InsightUserComponent } from './pages/user/insight-user/insight-user.component';
import { JobsCompletedProviderComponent } from './pages/provider/jobs-completed-provider/jobs-completed-provider.component';
import { ProfileProviderComponent } from './pages/provider/profile-provider/profile-provider.component';
import { SearchPageComponent } from './pages/search-page/search-page.component';
import { ManageJobsUserComponent } from './pages/user/manage-jobs-user/manage-jobs-user.component';
import { EditJobsUserComponent } from './pages/user/edit-jobs-user/edit-jobs-user.component';
import { JobListingUserComponent } from './pages/provider/job-listing-provider/job-listing-provider.component';
import { JobDetailsProviderComponent } from './pages/provider/job-details-provider/job-details-provider.component';
import { MoreArticleComponent } from './pages/more-article/more-article.component';
import { PostJobUserComponent } from './pages/user/post-job-user/post-job-user.component';
import { ProfileUserComponent } from './pages/user/profile-user/profile-user.component';
import { Role } from './_models';
import { AuthGuard } from './auth.guard';
import { TermsConditionComponent } from './pages/terms-condition/terms-condition.component';
import { ViewJobProfileComponent } from './pages/provider/view-job-profile/view-job-profile.component';
import { JobsAssignedComponent } from './pages/provider/jobs-assigned/jobs-assigned.component'; 

const routes: Routes = [

  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'about',
    component: AboutComponent
  },
  {
    path: 'terms-condition',
    component: TermsConditionComponent
  },
  {
    path: 'moreArticle',
    component: MoreArticleComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'articles/:id',
    component: ArticlesComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'changePasswordProvider',
    component: ChangePasswordProviderComponent,
    canActivate: [AuthGuard],
    data: {
      role: 'professional'
    }

  },
  {
    path: 'changePasswordUser',
    component: ChangePasswordUserComponent,
    canActivate: [AuthGuard],
    data: {
      role: 'customer'
    }

  },
  {
    path: 'editProfileProvider',
    component: EditProfileProviderComponent,
    canActivate: [AuthGuard],
    data: {
      role: 'professional'
    }
  },
  {
    path: 'editProfileUser',
    component: EditProfileUserComponent,
    canActivate: [AuthGuard],
    data: {
      role: 'customer'
    }

  },
  {
    path: 'viewProfile',
    component: FavouriteProviderComponent,
    // canActivate: [AuthGuard],
    // data: {
    //   role: 'customer'
    // }
  },
  {
    path: 'favouriteUser',
    component: FavouriteUserComponent,
    canActivate: [AuthGuard],
    data: {
      role: 'customer'
    }
  },
  {
    path: 'inboxProvider',
    component: InboxProviderComponent,
    canActivate: [AuthGuard],
    data: {
      role: 'professional'
    }
  },
  {
    path: 'inboxUser',
    component: InboxUserComponent,
    canActivate: [AuthGuard],
    data: {
      role: 'customer'
    }
  },
  {
    path: 'providerProfileCard',
    component: ProviderProfileCardComponent,
    canActivate: [AuthGuard],
    data: {
      role: 'professional'
    }
  },
  {
    path: 'userProfileCard',
    component: UserProfileCardComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'insightProvider',
    component: InsightProviderComponent,
    canActivate: [AuthGuard],
    data: {
      role: 'professional'
    }
  },
  {
    path: 'insightUser',
    component: InsightUserComponent,
    canActivate: [AuthGuard],
    data: {
      role: 'customer'
    }
  },
  {
    path: 'jobsCompletedProvider',
    component: JobsCompletedProviderComponent,
    canActivate: [AuthGuard],
    data: {
      role: 'professional'
    }
  },
  {
    path: 'profileProvider',
    component: ProfileProviderComponent,
    canActivate: [AuthGuard],
    data: {
      role: 'professional'
    }
  },
  {
    path: 'searchPage',
    component: SearchPageComponent,
    // canActivate: [AuthGuard],
    // data: {
    //   role: 'customer'
    // }
  },
  {
    path: 'manageJobsUser',
    component: ManageJobsUserComponent,
    canActivate: [AuthGuard],
    data: {
      role: 'customer'
    }
  },
  {
    path: 'editJobsUser',
    component: EditJobsUserComponent,
    canActivate: [AuthGuard],
    data: {
      role: 'customer'
    }
  },
  {
    path: 'jobListingUser',
    component: JobListingUserComponent,
    canActivate: [AuthGuard],
    data: {
      role: 'professional'
    }
  },
  {
    path: 'jobDetailsProvider',
    component: JobDetailsProviderComponent,
    canActivate: [AuthGuard],
    data: {
      role: 'professional'
    }
  },

  {
    path: 'postJobUser',
    component: PostJobUserComponent,
    canActivate: [AuthGuard],
    data: {
      role: 'customer'
    }
  },
  {
    path: 'profileUser',
    component: ProfileUserComponent,
    canActivate: [AuthGuard],
    data: {
      role: 'customer'
    }
  },

  {
    path: 'view-job-profile',
    component: ViewJobProfileComponent,
    canActivate: [AuthGuard],
    data: {
      role: 'professional'
    }
  },

  {
    path: 'jobs-assigned',
    component: JobsAssignedComponent,
    canActivate: [AuthGuard],
    data: {
      role: 'professional'
    }
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
