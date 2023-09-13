import { createReducer, on } from '@ngrx/store';
import * as GetDataActions from './get-data.actions';
import { State } from './types/state.interface';

export const initialState: State = {
    documents: [],
    categories: [],
};

export const getDataReducer = createReducer(
    initialState,
    on(GetDataActions.getDocuments, (state, { payload }) => ({...state, documents: payload })),
    on(GetDataActions.getCategories, (state, { payload }) => ({ ...state, categories: payload })),
);