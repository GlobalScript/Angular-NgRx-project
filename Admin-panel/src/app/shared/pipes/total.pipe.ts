import { Pipe, PipeTransform } from '@angular/core';
import { Product } from 'src/app/create/models/product';

@Pipe({
  name: 'total'
})
export class TotalPipe implements PipeTransform {

  transform(prods: Product[] | undefined): number {
    if (!prods || !prods.length) return 0;
    return prods.reduce((acc, item) => {
      if (item.count) acc += item.price * item.count
      return acc
    }, 0)
  }

}
