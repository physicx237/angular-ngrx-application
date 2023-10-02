import { Component, ComponentRef, Input, ViewChild } from '@angular/core';
import {
  trigger,
  state,
  style,
  transition,
  animate,
} from '@angular/animations';
import { CdkDrag } from '@angular/cdk/drag-drop';
import { NgIf } from '@angular/common';
import { DocumentModel } from 'src/app/domain/models/document.model';
import { DocumentDirective } from 'src/app/directives/document.directive';
import { DocumentComponent } from '../document/document.component';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css'],
  standalone: true,
  imports: [CdkDrag, NgIf, DocumentDirective],
  hostDirectives: [CdkDrag],
  animations: [
    trigger('openClose', [
      state(
        'open',
        style({
          width: '22px',
          height: '22px',
          border: '1px solid #D3D8DF',
          borderRadius: '50px',
          transform: 'rotate(180deg)',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center 8px',
        })
      ),
      state(
        'close',
        style({
          width: '22px',
          height: '22px',
          border: '1px solid #D3D8DF',
          borderRadius: '50px',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center 8px',
        })
      ),
      transition('open => close', [animate('0.25s')]),
      transition('close => open', [animate('0.25s')]),
    ]),
    trigger('categoryOpenClose', [
      state(
        'open',
        style({
          overflow: 'hidden',
        })
      ),
      state(
        'close',
        style({
          height: '0px',
          overflow: 'hidden',
        })
      ),
      transition('open => close', [animate('0.25s')]),
      transition('close => open', [animate('0.25s')]),
    ]),
  ],
})
export class CategoryComponent {
  @ViewChild(DocumentDirective, { static: true }) document!: DocumentDirective;
  @Input() data: any;
  @Input() documents: DocumentModel[] = [];
  isOpen = false;

  documentComponents: (typeof DocumentComponent)[] = [];
  documentDynamicComponents: ComponentRef<DocumentComponent>[] = [];

  ngOnInit() {
    for (let i = 0; i < this.documents.length; i++) {
      this.documentComponents.push(DocumentComponent);
    }

    const viewContainerRef = this.document.viewContainerRef;

    for (let i = 0; i < this.documentComponents.length; i++) {
      const componentRef = viewContainerRef.createComponent<DocumentComponent>(
        this.documentComponents[i]
      );
      this.documentDynamicComponents.push(componentRef);
      componentRef.instance.data = this.documents[i];
    }
  }

  showItems() {
    this.isOpen = !this.isOpen;
  }
}
