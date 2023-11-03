import { Component, OnInit } from '@angular/core';
import {
  CdkDragDrop,
  CdkDropList,
  CdkDrag,
  moveItemInArray,
  CdkDropListGroup,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as GetDataActions from '../../domain/store/get-data.actions';
import { DocumentModel } from '../../domain/models/document.model';
import { CategoryModel } from '../../domain/models/category.model';
import { DocumentState } from '../../types/document-state.type';
import { CategoryState } from '../../types/categoty-state.type';
import { BookmarkButtonComponent } from '../bookmark-button/bookmark-button.component';
import { NewTypeButtonComponent } from '../new-type-button/new-type-button.component';
import { NewDocumentButtonComponent } from '../new-document-button/new-document-button.component';
import { SearchComponent } from '../search/search.component';
import { CategoryComponent } from '../category/category.component';
import { DocumentComponent } from '../document/document.component';
import { NgFor, NgStyle, NgTemplateOutlet } from '@angular/common';
import { biggestNumber } from 'src/app/utils/biggest-number-function';

@Component({
  selector: 'app-wrapper',
  templateUrl: './wrapper.component.html',
  styleUrls: ['./wrapper.component.css'],
  standalone: true,
  imports: [
    CdkDropListGroup,
    CdkDropList,
    CdkDrag,
    BookmarkButtonComponent,
    NewTypeButtonComponent,
    NewDocumentButtonComponent,
    SearchComponent,
    CategoryComponent,
    DocumentComponent,
    NgFor,
    NgTemplateOutlet,
    NgStyle,
  ],
})
export class WrapperComponent implements OnInit {
  documents$: Observable<DocumentModel[]>;
  categories$: Observable<CategoryModel[]>;

  categories: CategoryModel[] = [];
  documents: DocumentModel[][] = [];
  noCategoryDocuments: DocumentModel[] = [];
  
  dragDropState = true;

  constructor(
    private documentStore: Store<DocumentState>,
    private categoryStore: Store<CategoryState>,
  ) {
    this.documents$ = this.documentStore.select(
      (state) => state.data.documents,
    );
    this.categories$ = this.categoryStore.select(
      (state) => state.data.categories,
    );
  }

  ngOnInit() {
    this.documentStore.dispatch(GetDataActions.getDocumentsFromEffects());
    this.categoryStore.dispatch(GetDataActions.getCategoriesFromEffects());

    this.categories$.subscribe((categories) => {
      categories.forEach((item) => {
        this.categories.push(item);
      });
    });

    this.documents$.subscribe((documents) => {
      for (let i = 0; i < biggestNumber(documents); i++) {
        this.documents.push([]);
      }
      for (let i = 0; i < biggestNumber(documents); i++) {
        documents.forEach((item) => {
          if (item.categoryId === i + 1) {
            this.documents[i].push(item);
          }
        });
      }
      documents.forEach((item) => {
        this.noCategoryDocuments.push(item);
      });
    });
  }

  dragDrop(state: any) {
    this.dragDropState = state;
  }

  dropGroup(event: CdkDragDrop<any>) {
    moveItemInArray(this.categories, event.previousIndex, event.currentIndex);
    moveItemInArray(this.documents, event.previousIndex, event.currentIndex);
    this.dragDropState = true;
  }

  drop(event: CdkDragDrop<any>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }
    this.dragDropState = true;
  }
}
