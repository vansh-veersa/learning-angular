import { Component, effect, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { FormControl, Validators } from '@angular/forms';
import { debounceTime } from 'rxjs/internal/operators/debounceTime';
import { switchMap } from 'rxjs/internal/operators/switchMap';
import { GithubApiService } from '../github-api-service';
import { catchError, finalize, tap } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
  selector: 'app-home-component',
  templateUrl: './home-component.html',
  styleUrl: './home-component.scss',
  standalone: false,
})
export class HomeComponent {
  searchControl = new FormControl('', {
    nonNullable: true,
    validators: [Validators.required, Validators.minLength(2)],
  });
  githubApiService = inject(GithubApiService);
  errorMessage = signal<string | null>(null);
  loading = signal(false);
  
  apiResponse = toSignal(
    this.searchControl.valueChanges.pipe(
      debounceTime(300),
      tap(() => {
        this.errorMessage.set(null);
        this.loading.set(true);
      }),
      switchMap((text) => this.githubApiService.searchUsers(text).pipe(
        catchError((error) => {
          this.errorMessage.set('Failed to search users. Please try again later.');
          return of([]);
        }),
        finalize(() => this.loading.set(false))
      )),
    ),
    { initialValue: [] },
  );
  constructor() {
    effect(()=>{console.log(this.apiResponse())})
  }
}
