import { Component, OnInit } from '@angular/core';
import { ApiService } from './api/api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {



  constructor(private apiService: ApiService) {

  }

  ngOnInit() {
    // this.apiService.getRequest('/lol/summoner/v4/summoners/by-name/octavarium')
    //   .subscribe((result) => {
    //     console.log('getSummonerByName result', result);
    //   })
  }
}
