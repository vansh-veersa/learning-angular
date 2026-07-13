import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

// API Response Types
type GitHubSearchUsersResponse = {
  items: Array<{
    login: string;
    avatar_url: string;
  }>;
};

type GitHubUserDetailsResponse = {
  login: string;
  name: string | null;
  avatar_url: string;
  bio: string | null;
  followers: number;
  following: number;
  html_url: string;
  company: string | null;
  location: string | null;
  public_repos: number;
};

export type GitHubRepoResponse = {
  name: string;
  description: string | null;
  html_url: string;
  stargazers_count: number;
  language: string | null;
  updated_at: string;
  owner: {
    login: string;
    avatar_url: string;
  };
  forks_count: number;
  open_issues_count: number;

};

// App Data Types
export type UserSummary = {
  username: string;
  avatarUrl: string;
};

export type UserDetails = {
  username: string;
  name: string | null;
  avatarUrl: string;
  bio: string | null;
  followers: number;
  following: number;
  profileUrl: string;
  company: string | null;
  location: string | null;
  publicRepos: number;
};

export type Repository = {
  name: string;
  description: string | null;
  profileUrl: string;
  stars: number;
  language: string | null;
  updatedAt: string;
  owner: string;
  ownerAvatarUrl?: string;
  forks?: number;
  openIssues?: number;
};

@Injectable()
export class GithubApiService {
  private baseUrl = 'https://api.github.com';
  private httpClient = inject(HttpClient);

  searchUsers(query: string): Observable<UserSummary[]> {
    const url = `${this.baseUrl}/search/users?q=${encodeURIComponent(query)}`;
    return this.httpClient.get<GitHubSearchUsersResponse>(url).pipe(
      map((response) =>
        response.items.slice(0, 100).map((user) => ({
          username: user.login,
          avatarUrl: user.avatar_url,
        })),
      ),
    );
  }

  getUserDetails(username: string): Observable<UserDetails> {
    const url = `${this.baseUrl}/users/${username}`;
    return this.httpClient.get<GitHubUserDetailsResponse>(url).pipe(
      map((user) => ({
        username: user.login,
        name: user.name,
        avatarUrl: user.avatar_url,
        bio: user.bio,
        followers: user.followers,
        following: user.following,
        profileUrl: user.html_url,
        company: user.company,
        location: user.location,
        publicRepos: user.public_repos,
      })),
    );
  }

  getUserRepositories(username: string): Observable<Repository[]> {
    const url = `${this.baseUrl}/users/${username}/repos`;
    return this.httpClient.get<GitHubRepoResponse[]>(url).pipe(
      map((repos) =>
        repos.map((repo) => ({
          name: repo.name,
          description: repo.description,
          profileUrl: repo.html_url,
          stars: repo.stargazers_count,
          language: repo.language,
          updatedAt: repo.updated_at,
          owner: repo.owner.login,
        })),
      ),
    );
  }

  getRepositoryDetails(username: string, repoName: string): Observable<Repository> {
    const url = `${this.baseUrl}/repos/${username}/${repoName}`;
    return this.httpClient.get<GitHubRepoResponse>(url).pipe(
      map((repo) => ({
        name: repo.name,
        description: repo.description,
        profileUrl: repo.html_url,
        stars: repo.stargazers_count,
        language: repo.language,
        updatedAt: repo.updated_at,
        owner: repo.owner.login,
        ownerAvatarUrl: repo.owner.avatar_url, 
        forks: repo.forks_count,
        openIssues: repo.open_issues_count,
      })),
    );
  }
}
