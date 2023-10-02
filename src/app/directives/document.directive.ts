import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[document]',
  standalone: true
})
export class DocumentDirective {
  constructor(public viewContainerRef: ViewContainerRef) {}
}
