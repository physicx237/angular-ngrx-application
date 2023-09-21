import { Component, Input } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { CdkDrag } from '@angular/cdk/drag-drop';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css'],
  standalone: true,
  imports: [CdkDrag, NgIf],
  animations: [
    trigger('openClose', [
      state('open', style({
        width: '22px',
        height: '22px',
        border: '1px solid #D3D8DF',
        borderRadius: '50px',
        transform: 'rotate(180deg)',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center 7px',
      })),
      state('close', style({
        width: '22px',
        height: '22px',
        border: '1px solid #D3D8DF',
        borderRadius: '50px',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center 7px',
      })),
      transition('open => close', [
        animate('0.25s')
      ]),
      transition('close => open', [
        animate('0.25s')
      ]),
    ]),
    trigger('openClosed', [
      state('true', style({
        overflow: 'hidden'
      })),
      state('false', style({
        height: '0px',
        overflow: 'hidden'
      })),
      transition('true => false', [
        animate('0.25s')
      ]),
      transition('false => true', [
        animate('0.25s')
      ]),
    ]),
  ]
})
export class CategoryComponent {
  @Input() data: any;

  isOpen = false;

  showItems() {
    this.isOpen = !this.isOpen
  }
}
