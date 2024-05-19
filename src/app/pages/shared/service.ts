import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { environment } from '../../../environments/environment.development';
import {
  ApiResponse,
  DetailsResponse,
  Movie,
  TvShow,
  VideoResponse,
} from './model';

@Injectable({
  providedIn: 'root',
})
export class Service {
  private apiKey: string = environment.apiKey;

  private baseUrl: string = 'https://api.themoviedb.org/3';

  constructor(private http: HttpClient) {}

  getTop10Movies(): Observable<Movie[]> {
    const url = `${this.baseUrl}/movie/popular?api_key=${this.apiKey}`;
    return this.http
      .get<ApiResponse<Movie>>(url)
      .pipe(map((data) => data.results.slice(0, 10)));
  }

  getTop10TvShows(): Observable<TvShow[]> {
    const url = `${this.baseUrl}/tv/popular?api_key=${this.apiKey}`;
    return this.http
      .get<ApiResponse<TvShow>>(url)
      .pipe(map((data) => data.results.slice(0, 10)));
  }

  getDetails(itemId: number, itemType: string): Observable<DetailsResponse> {
    let url: string = '';
    if (itemType === 'movie') {
      url = `${this.baseUrl}/movie/${itemId}?api_key=${this.apiKey}`;
    } else if (itemType === 'tv') {
      url = `${this.baseUrl}/tv/${itemId}?api_key=${this.apiKey}`;
    } else {
      throw new Error('Invalid item type');
    }
    return this.http.get<DetailsResponse>(url);
  }

  getImageUrl(posterPath: string): string {
    return `https://image.tmdb.org/t/p/w500${posterPath}`;
  }

  getTrailer(itemId: number, itemType: string): Observable<VideoResponse> {
    let url: string = '';
    if (itemType === 'movie') {
      url = `${this.baseUrl}/movie/${itemId}/videos?api_key=${this.apiKey}`;
    } else if (itemType === 'tv') {
      url = `${this.baseUrl}/tv/${itemId}/videos?api_key=${this.apiKey}`;
    } else {
      throw new Error('Invalid item type');
    }
    return this.http.get<VideoResponse>(url);
  }

  searchMovies(query: string): Observable<ApiResponse<Movie>> {
    const url = `${this.baseUrl}/search/movie?api_key=${this.apiKey}&query=${query}`;
    return this.http.get<ApiResponse<Movie>>(url);
  }

  searchTvShows(query: string): Observable<ApiResponse<TvShow>> {
    const url = `${this.baseUrl}/search/tv?api_key=${this.apiKey}&query=${query}`;
    return this.http.get<ApiResponse<TvShow>>(url);
  }
}
