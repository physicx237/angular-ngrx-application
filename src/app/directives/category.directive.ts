import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[category]',
  standalone: true
})
export class CategoryDirective {

  constructor(public viewContainerRef: ViewContainerRef) {}

}
