import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CdkDrag, CdkDragHandle, CdkDropList } from '@angular/cdk/drag-drop';
import { NgIf, NgStyle } from '@angular/common';
import { CategoryModel } from 'src/app/domain/models/category.model';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css'],
  standalone: true,
  imports: [CdkDropList, CdkDrag, CdkDragHandle, NgIf, NgStyle],
})
export class CategoryComponent {
  @Input() data!: CategoryModel;
  @Output() dragDropEvent = new EventEmitter<boolean>();
  @Output() showDocumentsFirstEvent = new EventEmitter<any>();
  @Output() showDocumentsSecondEvent = new EventEmitter<any>();
  showDocumentsState = false;
  style = {
    transform: 'none',
  };

  drag() {
    this.dragDropEvent.emit(false);
  }

  showDocuments() {
    this.showDocumentsFirstEvent.emit(
      this.showDocumentsState
        ? {
            overflow: 'visible',
            height: '100%',
          }
        : {
            overflow: 'hidden',
            height: '0',
          },
    );
    this.showDocumentsSecondEvent.emit(
      this.showDocumentsState
        ? {
            overflow: 'hidden',
            height: '0',
          }
        : {
            overflow: 'visible',
            height: '100%',
          },
    );
    this.showDocumentsState = !this.showDocumentsState;
    this.style.transform === 'none'
      ? (this.style.transform = 'rotate(180deg)')
      : (this.style.transform = 'none');
  }
}
