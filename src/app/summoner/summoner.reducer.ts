import { createReducer, on } from '@ngrx/store';
import * as SummonerActions from './summoner.actions';
import SummonerState, { initializeState } from './summoner.state';

export const initialState = initializeState();

const _summonerReducer = createReducer(
    initialState,
    on(SummonerActions.addSummoner, (state: SummonerState, { summoner }) =>
        ({ ...state, Summoners: [...state.Summoners, summoner] })),
);

export function SummonerReducer(state, action) {
    return _summonerReducer(state, action);
}