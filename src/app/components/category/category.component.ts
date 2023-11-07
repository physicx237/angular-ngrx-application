import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CdkDrag, CdkDragHandle, CdkDropList } from '@angular/cdk/drag-drop';
import { NgIf } from '@angular/common';
import { CategoryModel } from 'src/app/domain/models/category.model';
import {
  trigger,
  state,
  style,
  transition,
  animate,
} from '@angular/animations';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css'],
  standalone: true,
  imports: [CdkDropList, CdkDrag, CdkDragHandle, NgIf],
  animations: [
    trigger('openClose', [
      state(
        'true',
        style({
          transform: 'rotate(180deg)',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center 7px',
        }),
      ),
      state(
        'false',
        style({
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center 7px',
        }),
      ),
      transition('true => false', [animate('0.25s')]),
      transition('false => true', [animate('0.25s')]),
    ]),
  ],
})
export class CategoryComponent {
  @Input() data!: CategoryModel;
  @Output() dragDropEvent = new EventEmitter<boolean>();
  @Output() showDocumentsFirstEvent = new EventEmitter<boolean>();
  @Output() showDocumentsSecondEvent = new EventEmitter<boolean>();
  showDocumentsState = false;

  drag() {
    this.dragDropEvent.emit(false);
  }

  showDocuments() {
    this.showDocumentsFirstEvent.emit(this.showDocumentsState ? true : false);
    this.showDocumentsSecondEvent.emit(this.showDocumentsState ? false : true);
    this.showDocumentsState = !this.showDocumentsState;
  }
}
