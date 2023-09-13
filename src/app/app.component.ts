import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as GetDataActions from './domain/store/get-data.actions'
import { DocumentModel } from './domain/models/document.model';
import { CategoryModel } from './domain/models/category.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  documents$: Observable<DocumentModel[]>;
  categories$: Observable<CategoryModel[]>;

  constructor(private firstStore: Store<{ data: { documents: DocumentModel[] } }>, private secondStore: Store<{ data: { categories: CategoryModel[] } }>) {
    this.documents$ = this.firstStore.select(state => state.data.documents);
    this.categories$ = this.secondStore.select(state => state.data.categories);
  }

  ngOnInit() {
    this.firstStore.dispatch(GetDataActions.getDocumentsFromEffects());
    this.secondStore.dispatch(GetDataActions.getCategoriesFromEffects());
  }
}
