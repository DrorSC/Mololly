import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api/api.service';
import { Store, select } from '@ngrx/store';

import SummonerState from '../summoner/summoner.state';

import { Summoner } from '../summoner/summoner.model';
import { Observable, Subscription } from 'rxjs';
import * as SummonerActions from '../summoner/summoner.actions';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  summoner$: Observable<SummonerState>;
  summonerSubscription: Subscription;

  summonerList: Summoner[] = [];

  SummonerToLook: string = "";

  constructor(private apiService: ApiService, private store: Store<{ summoners: SummonerState }>) {
    this.summoner$ = store.pipe(select('summoners'));
  }

  ngOnInit() {
    this.summonerSubscription = this.summoner$.pipe(map(x => { this.summonerList = x.Summoners; })).subscribe();
  }

  onSearch() {
    console.log("SummonerToLook", this.SummonerToLook);
    this.apiService.getRequest('/lol/summoner/v4/summoners/by-name/' + this.SummonerToLook)
      .subscribe((result: Summoner) => {
        if (result) {
          // found summoner -> add to summoner store
          this.store.dispatch(SummonerActions.addSummoner({ summoner: result }))
          // this.summonerList.push(result);
          // console.log('summonerList', this.summonerList);
        }
      })
  }
}
