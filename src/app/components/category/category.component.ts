import { Component, ComponentRef, Input, ViewChild } from '@angular/core';
import {
  trigger,
  state,
  style,
  transition,
  animate,
} from '@angular/animations';
import {
  CdkDrag,
  CdkDragDrop,
  CdkDragHandle,
  CdkDropList,
  moveItemInArray,
} from '@angular/cdk/drag-drop';
import { NgIf } from '@angular/common';
import { DocumentModel } from 'src/app/domain/models/document.model';
import { DocumentDirective } from 'src/app/directives/document.directive';
import { DocumentComponent } from '../document/document.component';
import { CategoryModel } from 'src/app/domain/models/category.model';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css'],
  standalone: true,
  imports: [CdkDropList, CdkDrag, CdkDragHandle, NgIf, DocumentDirective]
})
export class CategoryComponent {
  @ViewChild(DocumentDirective, { static: true }) document!: DocumentDirective;
  @Input() data!: CategoryModel;
  @Input() documents: DocumentModel[] = [];
  isOpen = false;

  documentComponents: (typeof DocumentComponent)[] = [];
  documentDynamicComponents: ComponentRef<DocumentComponent>[] = [];

  ngOnInit() {
    this.documents.forEach(() => {
      this.documentComponents.push(DocumentComponent);
    });
  }

  createComponents() {
    const viewContainerRef = this.document.viewContainerRef;

    this.documents.forEach((item, i) => {
      const componentRef = viewContainerRef.createComponent<DocumentComponent>(
        this.documentComponents[i]
      );
      this.documentDynamicComponents.push(componentRef);
      componentRef.instance.data = this.documents[i];
    });
  }

  deleteComponents() {
    this.document.viewContainerRef.clear();
  }

  showItems() {
    this.isOpen = !this.isOpen;
    this.isOpen && this.createComponents();
    !this.isOpen && this.deleteComponents();
  }

  drop(event: CdkDragDrop<ComponentRef<DocumentComponent>[]>) {
    this.document.viewContainerRef.move(
      this.documentDynamicComponents[event.previousIndex].hostView,
      event.currentIndex
    );
    moveItemInArray(
      this.documentDynamicComponents,
      event.previousIndex,
      event.currentIndex
    );
  }
}
