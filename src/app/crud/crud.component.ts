import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { products } from '../products';

@Component({
  selector: 'app-crud',
  templateUrl: './crud.component.html',
  styleUrls: ['./crud.component.css']
})
export class CrudComponent {
  products = [...products];
  constructor(private router: Router) { }

  navigateToOtherPage(): void {
    this.router.navigate(['/login']); // Programowe nawigowanie do '/inne'
  }
  share() {
    window.alert('The product has been shared!');
  }
}