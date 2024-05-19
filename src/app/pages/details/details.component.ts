import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Service } from '../shared/service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css'],
})
export class DetailsComponent implements OnInit {
  selectedItem: any;
  trailer: any[] = [];
  selectedOption: string = 'movies';
  searchQuery: string = '';

  constructor(
    private route: ActivatedRoute,
    public service: Service,
    private router: Router,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      const itemId = params['id'];
      const itemType = params['type'];
      this.selectedOption =
        this.route.snapshot.queryParamMap.get('selectedOption') || 'movies';
      this.searchQuery =
        this.route.snapshot.queryParamMap.get('searchQuery') || '';

      this.service.getDetails(itemId, itemType).subscribe(
        (data) => {
          this.selectedItem = data;

          this.service.getTrailer(itemId, itemType).subscribe(
            (trailerData) => {
              this.trailer = trailerData.results;
            },
            (error) => {
              console.error('Error fetching trailer:', error);
            }
          );
        },
        (error) => {
          console.error('Error fetching item details:', error);
        }
      );
    });
  }

  goBack(): void {
    this.router.navigate([''], {
      queryParams: {
        selectedOption: this.selectedOption,
        searchQuery: this.searchQuery,
      },
    });
  }

  trailerAvailable(): boolean {
    return this.trailer.length > 0;
  }

  getTrailerUrl(): SafeResourceUrl {
    let trailerUrl = '';
    if (this.trailerAvailable()) {
      const trailerKey = this.trailer[0].key;
      trailerUrl = `https://www.youtube.com/embed/${trailerKey}`;
    }
    return this.sanitizer.bypassSecurityTrustResourceUrl(trailerUrl);
  }
}
