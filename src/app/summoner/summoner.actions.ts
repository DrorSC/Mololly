import { createAction, props } from '@ngrx/store';
import { Summoner } from './summoner.model';

export const addSummoner = createAction('[Summoner] - Add', props<{ summoner: Summoner }>());