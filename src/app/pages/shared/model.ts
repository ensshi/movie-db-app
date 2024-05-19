export interface Video {
  id: string;
  key: string;
  name: string;
  site: string;
  type: string;
}

export interface VideoResponse {
  id: number;
  results: Video[];
}

export interface Movie {
  id: number;
  title: string;
  poster_path: string;
}

export interface TvShow {
  id: number;
  name: string;
  poster_path: string;
}

export interface ApiResponse<T> {
  page: number;
  results: T[];
  total_results: number;
  total_pages: number;
}

export interface DetailsResponse {
  title: string;
  poster_path: string;
  overview: string;
}
