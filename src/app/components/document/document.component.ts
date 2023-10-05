import { Component, Input } from '@angular/core';
import {
  CdkDrag,
  CdkDragHandle
} from '@angular/cdk/drag-drop';
import { NgIf } from '@angular/common';
import { DocumentModel } from 'src/app/domain/models/document.model';

@Component({
  selector: 'app-document',
  templateUrl: './document.component.html',
  styleUrls: ['./document.component.css'],
  standalone: true,
  imports: [CdkDrag, CdkDragHandle, NgIf],
})
export class DocumentComponent {
  @Input() data!: DocumentModel;
}
