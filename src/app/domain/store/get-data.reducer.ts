import { createReducer, on } from '@ngrx/store';
import * as GetDataActions from './get-data.actions';
import { DocumentModel } from '../models/document.model';
import { CategoryModel } from '../models/category.model';

interface State {
    documents: DocumentModel[],
    categories: CategoryModel[]
}

export const initialState: State = {
    documents: [],
    categories: [],
};

export const getDataReducer = createReducer(
    initialState,
    on(GetDataActions.getDocuments, (state, { payload }) => ({...state, documents: payload})),
    on(GetDataActions.getCategories, (state, { payload }) => ({ ...state, categories: payload })),
);