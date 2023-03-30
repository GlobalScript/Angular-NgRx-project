import { Component } from '@angular/core';
import { Product } from '../../models/product';

@Component({
  selector: 'app-create-page',
  templateUrl: './create-page.component.html',
  styleUrls: ['./create-page.component.scss']
})
export class CreatePageComponent {

  prodData!: Product;
}
