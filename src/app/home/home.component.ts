import { Component, OnInit, OnDestroy } from '@angular/core';
import { ApiService } from '../api/api.service';
import { Store, select } from '@ngrx/store';

import SummonerState from '../store/summoner/summoner.state';

import { Summoner } from '../store/summoner/summoner.model';
import { CurrentGameInfo } from '../home/game.model';


import { Observable, Subscription, timer } from 'rxjs';
import * as SummonerActions from '../store/summoner/summoner.actions';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {

  summoner$: Observable<SummonerState>;
  summonerSubscription: Subscription;

  summonerList: Summoner[] = [];

  summonerInGameIntervalSub: Subscription;

  SummonerToLook: string = "";

  constructor(private apiService: ApiService, private store: Store<{ summoners: SummonerState }>) {
    this.summoner$ = store.pipe(select('summoners'));
  }

  ngOnInit() {
    this.summonerSubscription = this.summoner$.pipe(map(x => { this.summonerList = x.Summoners; })).subscribe();
    this.CheckForUsersInGameTimer();
  }

  ngOnDestroy() {
    this.summonerSubscription.unsubscribe();
    this.summonerInGameIntervalSub.unsubscribe();
  }

  onSearch() {
    console.log("SummonerToLook", this.SummonerToLook);
    this.apiService.getRequest('/lol/summoner/v4/summoners/by-name/' + this.SummonerToLook)
      .subscribe((result: Summoner) => {
        if (result) {
          // found summoner -> add to summoner store
          console.log("summoner result", result);
          this.store.dispatch(SummonerActions.addSummoner({ summoner: { ...result, inGame: undefined } }));
          this.CheckForUsersInGameTimer();
        }
      });
  }

  CheckForUsersInGameTimer() {
    console.log("CheckForUsersInGameTimer", this.summonerList);
    this.summonerInGameIntervalSub?.unsubscribe();
    this.summonerInGameIntervalSub = timer(0, 60000)
      .subscribe(x => {
        console.log("check");
        this.summonerList.forEach(summoner => {
          console.log("check summoner", summoner.name);
          this.checkIfUserInGame(summoner);
        });
      });
  }

  checkIfUserInGame(summoner: Summoner) {
    console.log("checkIfUserInGame", summoner.name);
    this.apiService.getRequest('/lol/spectator/v4/active-games/by-summoner/' + summoner.id)
      .subscribe(
        (data: CurrentGameInfo) => {
          if (data) {
            console.log("game info result", data);
            this.store.dispatch(SummonerActions.editSummoner({ summoner: { ...summoner, inGame: true } }));
          }
        },
        (error) => {
          this.store.dispatch(SummonerActions.editSummoner({ summoner: { ...summoner, inGame: false } }));
        },
        () => {
          console.log("what is this");
        }
      );
  }
}
