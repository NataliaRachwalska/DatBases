import { Component } from '@angular/core';

import { products } from '../products';

@Component({
  selector: 'app-crud',
  templateUrl: './crud.component.html',
  styleUrls: ['./crud.component.css']
})
export class CrudComponent {
  products = [...products];

  share() {
    window.alert('The product has been shared!');
  }
}