import { Summoner } from './summoner.model';

export default class SummonerState {
    Summoners: Summoner[];
}

export const initializeState = (): SummonerState => {
    return {
        Summoners: Array<Summoner>()
        //[{ accountId: 'a', profileIconId: 1, revisionDate: 1, name: 's0', id: 'f', puuid: '24', summonerLevel: 1 }] //
    };
};