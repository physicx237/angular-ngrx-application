import { Component, ComponentRef, OnInit, ViewChild } from '@angular/core';
import { CdkDragDrop, CdkDropList, CdkDrag, moveItemInArray } from '@angular/cdk/drag-drop';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as GetDataActions from '../../domain/store/get-data.actions'
import { DocumentModel } from '../../domain/models/document.model';
import { CategoryModel } from '../../domain/models/category.model';
import { DocumentState } from '../../types/document-state.type';
import { CategoryState } from '../../types/categoty-state.type';
import { CategoryComponent } from '../../components/category/category.component';
import { CategoryDirective } from '../../directives/category.directive';
import { BookmarkButtonComponent } from "../bookmark-button/bookmark-button.component";
import { NewTypeButtonComponent } from "../new-type-button/new-type-button.component";
import { NewDocumentButtonComponent } from "../new-document-button/new-document-button.component";
import { SearchComponent } from "../search/search.component";

@Component({
  selector: 'app-wrapper',
  templateUrl: './wrapper.component.html',
  styleUrls: ['./wrapper.component.css'],
  standalone: true,
  imports: [
    CdkDropList,
    CdkDrag,
    BookmarkButtonComponent,
    NewTypeButtonComponent,
    NewDocumentButtonComponent,
    SearchComponent,
    CategoryDirective,
  ],
})
export class WrapperComponent implements OnInit {
  @ViewChild(CategoryDirective, { static: true }) category!: CategoryDirective;

  documents$: Observable<DocumentModel[]>;
  categories$: Observable<CategoryModel[]>;

  categories: CategoryModel[] = [];
  documents: DocumentModel[] = [];

  categoryComponents: (typeof CategoryComponent)[] = [];

  categoryDynamicComponents: ComponentRef<CategoryComponent>[] = [];

  constructor(
    private documentStore: Store<DocumentState>,
    private categoryStore: Store<CategoryState>
  ) {
    this.documents$ = this.documentStore.select(
      (state) => state.data.documents
    );
    this.categories$ = this.categoryStore.select(
      (state) => state.data.categories
    );
  }

  ngOnInit() {
    this.documentStore.dispatch(GetDataActions.getDocumentsFromEffects());
    this.categoryStore.dispatch(GetDataActions.getCategoriesFromEffects());

    this.documents$.subscribe((documents) => {
      this.documents = documents;
    });

    this.categories$.subscribe((categories) => {
      this.categories = categories;

      categories.forEach(() => {
        this.categoryComponents.push(CategoryComponent);
      });

      const viewContainerRef = this.category.viewContainerRef;

      this.categoryComponents.forEach((item, i) => {
        const componentRef =
          viewContainerRef.createComponent<CategoryComponent>(
            this.categoryComponents[i]
          );
        this.categoryDynamicComponents.push(componentRef);
        componentRef.instance.data = this.categories[i];

        this.documents.forEach((item, j) => {
          if (i === this.documents[j].categoryId - 1) {
            componentRef.instance.documents.push(this.documents[j]);
          }
        });
      });
    });
  }

  drop(event: CdkDragDrop<ComponentRef<CategoryComponent>[]>) {
    this.category.viewContainerRef.move(
      this.categoryDynamicComponents[event.previousIndex].hostView,
      event.currentIndex
    );
    moveItemInArray(
      this.categoryDynamicComponents,
      event.previousIndex,
      event.currentIndex
    );
  }
}
