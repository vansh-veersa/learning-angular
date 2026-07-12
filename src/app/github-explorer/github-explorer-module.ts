import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GithubExplorerRoutingModule } from './github-explorer-routing-module';
import { ReactiveFormsModule } from '@angular/forms';
import { HomeComponent } from './home-component/home-component';
import { GithubApiService } from './github-api-service';
import { RouterModule } from '@angular/router';
import { UserProfileComponent } from './user-profile-component/user-profile-component';
import { RepoDetailComponent } from './repo-detail-component/repo-detail-component';

@NgModule({
  declarations: [HomeComponent,UserProfileComponent,RepoDetailComponent],
  imports: [CommonModule, GithubExplorerRoutingModule, ReactiveFormsModule,RouterModule],
  providers: [GithubApiService],
})
export class GithubExplorerModule {}
