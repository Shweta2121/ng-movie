import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { SubscriptionHelper } from 'src/app/classes/subscriptions-helper.class';
import { DbService } from 'src/app/service/db.service';
import { HeaderService, IHeader } from 'src/app/service/header.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor() {
  }

  ngOnInit(): void {
  }
}
