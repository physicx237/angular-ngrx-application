import { createAction, props } from '@ngrx/store';
import { DocumentModel } from '../models/document.model';
import { CategoryModel } from '../models/category.model';

export const getDocumentsFromEffects = createAction('[Get Data] Load Documents');
export const getDocuments = createAction('[Get Data] Documents Loaded Success', props<{ payload: DocumentModel[] }>());

export const getCategoriesFromEffects = createAction('[Get Data] Load Categories');
export const getCategories = createAction('[Get Data] Categories Loaded Success', props<{ payload: CategoryModel[] }>());