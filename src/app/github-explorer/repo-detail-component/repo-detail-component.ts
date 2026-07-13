import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
// import { map } from 'rxjs/internal/operators/map';
// import { switchMap } from 'rxjs/internal/operators/switchMap';
import { GithubApiService, GitHubRepoResponse } from '../github-api-service';
import { catchError, tap, filter, map, switchMap } from 'rxjs/operators';
import { toSignal } from '@angular/core/rxjs-interop';
import { of } from 'rxjs';
import { httpResource } from '@angular/common/http';

@Component({
  selector: 'app-repo-detail-component',
  templateUrl: './repo-detail-component.html',
  styleUrl: './repo-detail-component.scss',
  standalone: false,
})
export class RepoDetailComponent {
  private route = inject(ActivatedRoute);
  private githubApiService = inject(GithubApiService);
  // loading = signal(true);
  // errorMessage = signal<string | null>(null);
  // repoData = toSignal(this.route.paramMap.pipe(
  //   map((params) => ({
  //     user: params.get('user'),
  //     repo: params.get('repo'),
  //   })),
  //   filter(
  //     (data): data is { user: string; repo: string } => data.user !== null && data.repo !== null,
  //   ),
  //   tap(() => {
  //     this.loading.set(true);
  //     this.errorMessage.set(null);
  //   }),
  //   switchMap((data) => this.githubApiService.getRepositoryDetails(data.user, data.repo).pipe(
  //     catchError((error) => {
  //       console.error('Error fetching repository details:', error);
  //       this.errorMessage.set('Failed to load repository details. Please try again later.');
  //       return of(null);
  //     }),
  //     tap(() => this.loading.set(false)),
  //   )),
  //   tap(() => this.loading.set(false)),
  // ))

  // This is another way to fetch the repository details using httpResource
  // Though it is not feasible to use this here as it breaks the architecture by bypassing the service layer and directly calling the API from the component. 
  // But it is still a good way to fetch data from an API.
  params = toSignal(
    this.route.paramMap.pipe(
      map((params) => ({
        user: params.get('user'),
        repo: params.get('repo'),
      })),
    ),
  );
  repoData = httpResource<GitHubRepoResponse>(() => {
    const params = this.params();

    if (!params?.user || !params?.repo) {
      return undefined;
    }
    return {
      url: `https://api.github.com/repos/${params.user}/${params.repo}`,
    };
  });
}
