import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home-component/home-component';
import { UserProfileComponent } from './user-profile-component/user-profile-component';
import { RepoDetailComponent } from './repo-detail-component/repo-detail-component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: ':user',
    component: UserProfileComponent,
  },
  {
    path: ':user/:repo',
    component: RepoDetailComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GithubExplorerRoutingModule {}
