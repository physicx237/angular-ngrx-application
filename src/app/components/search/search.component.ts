import { Component } from '@angular/core';
import { FormsModule, NgModel } from '@angular/forms';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
  standalone: true,
  imports: [NgIf, FormsModule],
})
export class SearchComponent {
  cross = false;
  text: string | null | undefined;

  constructor() {}

  showCross() {
    if (this.text !== undefined) {
      this.cross = true;
    }
    if (this.text == '') {
      this.cross = false;
    }
  }

  resetInput() {
    this.text = '';
    this.cross = false;
  }
}
