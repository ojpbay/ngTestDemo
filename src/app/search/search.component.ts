import { Router, ActivatedRoute  } from '@angular/router';
import { Component, OnInit, OnDestroy  } from '@angular/core';
import { Person, SearchService } from '../shared/search/search.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  query: string;
  searchResults: Array<Person>;
  sub: Subscription;

  constructor(private searchService: SearchService, private router: Router, private route: ActivatedRoute) {
    this.sub = this.route.params.subscribe(params => {
      if (params['term']) {
        this.query = decodeURIComponent(params['term']);
        this.search();
      }
    });
   }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
  
  search() {
    this.searchService.search(this.query).subscribe(
      data => { this.searchResults = data; },
      error => console.log(error)
    );
  }

  onSelect(person: Person) {
    this.router.navigate(['/edit', person.id]);
  }
}
