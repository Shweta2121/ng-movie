import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable, of, Subject } from "rxjs";
import { map, catchError } from "rxjs/operators";
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/switchMap';

@Injectable({
  providedIn: 'root'
})
export class DbService {
  private trendingUrl = 'https://api.themoviedb.org/3/trending/all/day?api_key=ae048f13b006498542f939af8ca41190'
  private upcomingUrl = 'https://api.themoviedb.org/3/movie/upcoming?api_key=ae048f13b006498542f939af8ca41190&language=en-US&page=1';
  private topRated = 'https://api.themoviedb.org/3/movie/top_rated?api_key=ae048f13b006498542f939af8ca41190&language=en-US&page=1';
  private popular = 'https://api.themoviedb.org/3/movie/popular?api_key=ae048f13b006498542f939af8ca41190&language=en-US&page=1';

  baseUrl: string = 'https://api.themoviedb.org/3/search/movie';
  queryUrl: string = '?api_key=ae048f13b006498542f939af8ca41190&query=';
  searchTerm$ = new Subject<string>();

  constructor(private http: HttpClient) { }

  getTrendingData(): Observable<any> {
    return this.http.get(this.trendingUrl).pipe(
      map((res: any) => res)
    );
  }

  getUpcomingData(): Observable<any> {
    return this.http.get(this.upcomingUrl).pipe(
      map((res: any) => res)
    );
  }


  gettopRated(): Observable<any> {
    return this.http.get(this.topRated).pipe(
      map((res: any) => res)
    );
  }

  getPopular(): Observable<any> {
    return this.http.get(this.popular).pipe(
      map((res: any) => res)
    );
  }

  search(terms: Observable<string>) {
    return terms.debounceTime(400)
      .distinctUntilChanged()
      .switchMap(term => this.searchEntries(term));
  }

  searchEntries(term: any) {
    return this.http
      .get(this.baseUrl + this.queryUrl + term).toPromise()
      .then(data => {
        let res = data;
        return res;
      })
      .catch(error => {
        return Promise.reject(error);
      });
  }
}
