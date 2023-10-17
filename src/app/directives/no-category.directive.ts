import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[noCategory]',
  standalone: true,
})
export class NoCategoryDirective {
  constructor(public viewContainerRef: ViewContainerRef) {}
}
