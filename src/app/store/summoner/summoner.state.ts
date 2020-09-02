import { Summoner } from './summoner.model';

export default class SummonerState {
    Summoners: Summoner[];
}

export const initializeState = (): SummonerState => {
    return {
        Summoners: Array<Summoner>()
    };
};
