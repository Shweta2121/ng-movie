import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { SubscriptionHelper } from 'src/app/classes/subscriptions-helper.class';
import { DbService } from 'src/app/service/db.service';
import { HeaderService, IHeader } from 'src/app/service/header.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent extends SubscriptionHelper
  implements OnInit, OnDestroy {
  public trending: any;
  public upComing: any;
  public topRated: any;
  public popular: any;
  searchTerm$ = new Subject<string>();
  data: any;
  config?: IHeader;
  openSideNav: boolean = false;

  constructor(readonly hs: HeaderService, private ps: DbService) {
    super();
    this.ps.search(this.searchTerm$)
      .subscribe((response: any) => {
        this.data = response.results
        console.log(this.data)
      });
  }

  ngOnInit(): void {
    this.subscribe(
      'config',
      this.hs.config.subscribe((p) => (this.config = p))
    );
    this.getTrending();
    this.getUpcoming();
    this.getTopRated();
    this.getPopularMovie();
  }

  ngOnDestroy(): void {
    this.unsubscribeAll();
  }

  getTrending() {
    this.ps.getTrendingData().subscribe((p) => {
      this.trending = p.results
    })
  }

  getUpcoming() {
    this.ps.getUpcomingData().subscribe((p) => {
      this.upComing = p.results
    })
  }

  getTopRated() {
    this.ps.gettopRated().subscribe((p) => {
      this.topRated = p.results
    })
  }

  getPopularMovie() {
    this.ps.getPopular().subscribe((p) => {
      this.popular = p.results
    })
  }

  toggleSideNav() {
    this.openSideNav = !this.openSideNav;
  }
}
