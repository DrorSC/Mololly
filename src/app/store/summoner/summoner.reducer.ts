import { createReducer, on } from '@ngrx/store';
import * as SummonerActions from './summoner.actions';
import SummonerState, { initializeState } from './summoner.state';

export const initialState = initializeState();

const _summonerReducer = createReducer(
    initialState,
    on(SummonerActions.addSummoner, (state: SummonerState, { summoner }) => {
        return { ...state, Summoners: [...state.Summoners, summoner] };
    }),
    on(SummonerActions.editSummoner, (state: SummonerState, { summoner }) => {
        // deep copy of state
        let newSummoners = JSON.parse(JSON.stringify(state.Summoners))
        let summonerToEditIndex = newSummoners.findIndex(x => x.id == summoner.id);
        newSummoners[summonerToEditIndex].inGame = summoner.inGame;
        return { ...state, Summoners: newSummoners };
    }),
);

export function SummonerReducer(state, action) {
    return _summonerReducer(state, action);
}
