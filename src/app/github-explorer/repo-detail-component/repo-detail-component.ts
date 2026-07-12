import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { filter } from 'rxjs/internal/operators/filter';
import { map } from 'rxjs/internal/operators/map';
import { switchMap } from 'rxjs/internal/operators/switchMap';
import { GithubApiService } from '../github-api-service';
import { catchError, tap } from 'rxjs/operators';
import { toSignal } from '@angular/core/rxjs-interop';
import { of } from 'rxjs';

@Component({
  selector: 'app-repo-detail-component',
  templateUrl: './repo-detail-component.html',
  styleUrl: './repo-detail-component.scss',
  standalone: false,
})
export class RepoDetailComponent {
  private route = inject(ActivatedRoute);
  private githubApiService = inject(GithubApiService);
  loading = signal(true);
  errorMessage = signal<string | null>(null);
  repoData = toSignal(this.route.paramMap.pipe(
    map((params) => ({
      user: params.get('user'),
      repo: params.get('repo'),
    })),
    filter(
      (data): data is { user: string; repo: string } => data.user !== null && data.repo !== null,
    ),
    tap(() => {
      this.loading.set(true);
      this.errorMessage.set(null);
    }),
    switchMap((data) => this.githubApiService.getRepositoryDetails(data.user, data.repo).pipe(
      catchError((error) => {
        console.error('Error fetching repository details:', error);
        this.errorMessage.set('Failed to load repository details. Please try again later.');
        return of(null);
      }),
      tap(() => this.loading.set(false)),
    )),
    tap(() => this.loading.set(false)),
  ))
}
