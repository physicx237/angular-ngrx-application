import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CdkDrag, CdkDragHandle, CdkDropList } from '@angular/cdk/drag-drop';
import { NgIf } from '@angular/common';
import { CategoryModel } from 'src/app/domain/models/category.model';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css'],
  standalone: true,
  imports: [CdkDropList, CdkDrag, CdkDragHandle, NgIf],
})
export class CategoryComponent {
  @Input() data!: CategoryModel;
  @Output() dragDropEvent = new EventEmitter<boolean>();
  @Output() showDocumentsFirstEvent = new EventEmitter<string>();
  @Output() showDocumentsSecondEvent = new EventEmitter<string>();
  showDocumentsState = false;

  drag() {
    this.dragDropEvent.emit(false);
  }

  showDocuments() {
    this.showDocumentsFirstEvent.emit(
      this.showDocumentsState ? 'block' : 'none',
    );
    this.showDocumentsSecondEvent.emit(
      this.showDocumentsState ? 'none' : 'block',
    );
    this.showDocumentsState = !this.showDocumentsState;
  }
}
