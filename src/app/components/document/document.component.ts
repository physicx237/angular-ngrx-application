import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CdkDrag, CdkDragHandle } from '@angular/cdk/drag-drop';
import { NgIf, NgStyle } from '@angular/common';
import { DocumentModel } from 'src/app/domain/models/document.model';

@Component({
  selector: 'app-document',
  templateUrl: './document.component.html',
  styleUrls: ['./document.component.css'],
  standalone: true,
  imports: [CdkDrag, CdkDragHandle, NgIf, NgStyle],
})
export class DocumentComponent {
  @Input() data!: DocumentModel;
  @Input() style: any;
  @Output() dragDropEvent = new EventEmitter<boolean>();

  drag() {
    this.dragDropEvent.emit(false);
  }
}
