import { Component, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/internal/operators/map';
import { switchMap } from 'rxjs/internal/operators/switchMap';
import { GithubApiService } from '../github-api-service';
import { filter } from 'rxjs/internal/operators/filter';
import { catchError, finalize, forkJoin, of, tap } from 'rxjs';

@Component({
  selector: 'app-user-profile-component',
  templateUrl: './user-profile-component.html',
  styleUrl: './user-profile-component.scss',
  standalone: false,
})
export class UserProfileComponent {
  private route = inject(ActivatedRoute);
  githubApiService = inject(GithubApiService);
  loading = signal(true);
  errorMessage = signal<string | null>(null);
  data = toSignal(
    this.route.paramMap.pipe(
      tap(() => {
        this.loading.set(true);
        this.errorMessage.set(null);
      }),
      map((params) => params.get('user')),
      filter((username): username is string => username !== null),
      switchMap((username) =>
        forkJoin({
          userDetails: this.githubApiService.getUserDetails(username),
          userRepositories: this.githubApiService.getUserRepositories(username),
        }).pipe(
          catchError((error) => {
            console.error('Error fetching user data:', error);
            this.errorMessage.set('Failed to load user data. Please try again later.');
            return of(null);
          }),
          finalize(() => this.loading.set(false)),
        ),
      ),
    ),
    {
      initialValue: null,
    },
  );
}
