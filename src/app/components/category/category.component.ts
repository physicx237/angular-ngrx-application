import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CdkDrag, CdkDragHandle, CdkDropList } from '@angular/cdk/drag-drop';
import { NgIf } from '@angular/common';
import { DocumentDirective } from 'src/app/directives/document.directive';
import { CategoryModel } from 'src/app/domain/models/category.model';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css'],
  standalone: true,
  imports: [CdkDropList, CdkDrag, CdkDragHandle, NgIf, DocumentDirective],
})
export class CategoryComponent {
  @Output() showDocumentsFirstEvent = new EventEmitter<boolean>();
  @Output() showDocumentsSecondEvent = new EventEmitter<boolean>();
  @Input() data!: CategoryModel;
  state = false;

  showDocuments() {
    this.showDocumentsFirstEvent.emit(this.state === false ? true : false);
    this.showDocumentsSecondEvent.emit(this.state === true ? false : true);
    this.state = !this.state;
  }
}
