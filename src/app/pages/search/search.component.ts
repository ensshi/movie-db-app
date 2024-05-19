import { Component, OnInit } from '@angular/core';
import { Service } from '../shared/service';
import { Router, ActivatedRoute } from '@angular/router';
import { catchError, of, tap } from 'rxjs';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
})
export class SearchComponent implements OnInit {
  selectedOption: string = 'movies';
  items: any[] = [];
  filteredItems: any[] = [];
  isLoading: boolean = true;
  searchQuery: string = '';
  searchTimer: any;
  cachedMovies: any[] = [];
  cachedTvShows: any[] = [];

  constructor(
    private service: Service,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.selectedOption = params['selectedOption'] || 'movies';
      this.searchQuery = params['searchQuery'] || '';
      this.fetchData();
    });
  }

  onSelectionChange(event: any): void {
    const newOption = event.target.value;
    this.triggerTransition(() => {
      this.selectedOption = newOption;
      this.fetchData();
    });
  }

  onSearchQueryChange(event: any): void {
    const query = event.target.value.trim();

    if (query.length >= 3) {
      clearTimeout(this.searchTimer);
      this.searchTimer = setTimeout(() => {
        this.searchQuery = query;
        this.fetchData();
      }, 1000);
    } else {
      clearTimeout(this.searchTimer);
      this.searchQuery = '';
      this.filterItems();
    }
  }

  fetchData(): void {
    this.isLoading = true;

    if (this.searchQuery) {
      if (this.selectedOption === 'movies') {
        this.searchMovies();
      } else if (this.selectedOption === 'tvShows') {
        this.searchTvShows();
      }
    } else {
      if (this.selectedOption === 'movies') {
        this.fetchMovies();
      } else if (this.selectedOption === 'tvShows') {
        this.fetchTvShows();
      }
    }
  }

  fetchMovies(): void {
    if (this.cachedMovies.length) {
      this.items = this.cachedMovies;
      this.updateFilteredItems();
    } else {
      this.isLoading = true;
      this.service
        .getTop10Movies()
        .pipe(
          tap((data) => {
            this.items = data;
            this.cachedMovies = data;
            this.updateFilteredItems();
          }),
          catchError((error) => {
            console.error('Error fetching movies:', error);
            this.isLoading = false;
            return of([]);
          })
        )
        .subscribe(() => {
          this.isLoading = false;
        });
    }
  }

  fetchTvShows(): void {
    if (this.cachedTvShows.length) {
      this.items = this.cachedTvShows;
      this.updateFilteredItems();
    } else {
      this.isLoading = true;
      this.service
        .getTop10TvShows()
        .pipe(
          tap((data) => {
            this.items = data;
            this.cachedTvShows = data;
            this.updateFilteredItems();
          }),
          catchError((error) => {
            console.error('Error fetching TV shows:', error);
            this.isLoading = false;
            return of([]);
          })
        )
        .subscribe(() => {
          this.isLoading = false;
        });
    }
  }

  searchMovies(): void {
    this.service
      .searchMovies(this.searchQuery)
      .pipe(
        tap((data) => {
          this.items = data.results;
          this.updateFilteredItems();
        }),
        catchError((error) => {
          console.error('Error searching movies:', error);
          this.isLoading = false;
          return of([]);
        })
      )
      .subscribe(() => {
        this.isLoading = false;
      });
  }

  searchTvShows(): void {
    this.service
      .searchTvShows(this.searchQuery)
      .pipe(
        tap((data) => {
          this.items = data.results;
          this.updateFilteredItems();
        }),
        catchError((error) => {
          console.error('Error searching TV shows:', error);
          this.isLoading = false;
          return of([]);
        })
      )
      .subscribe(() => {
        this.isLoading = false;
      });
  }

  updateFilteredItems(): void {
    this.filterItems();
    this.isLoading = false;
  }

  filterItems(): void {
    const query = this.searchQuery.toLowerCase();
    this.filteredItems = this.searchQuery
      ? this.items.filter((item) =>
          (item.title || item.name).toLowerCase().includes(query)
        )
      : [...this.items];
  }

  goToDetails(id: number): void {
    const type = this.selectedOption === 'movies' ? 'movie' : 'tv';

    setTimeout(() => {
      this.router.navigate(['/details', id, type], {
        queryParams: {
          selectedOption: this.selectedOption,
          searchQuery: this.searchQuery,
        },
      });
    }, 100);
  }

  triggerTransition(callback: () => void): void {
    const gridContainer = document.querySelector(
      '.grid-container'
    ) as HTMLElement;
    if (gridContainer) {
      gridContainer.classList.add('fade-out');
      setTimeout(() => {
        callback();
        setTimeout(() => {
          gridContainer.classList.remove('fade-out');
          setTimeout(() => gridContainer.classList.add('fade-in'), 50);
        }, 50);
      }, 300);
    }
  }

  getImageUrl(path: string): string {
    return this.service.getImageUrl(path);
  }
}
