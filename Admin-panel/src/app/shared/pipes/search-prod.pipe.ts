import { Pipe, PipeTransform } from '@angular/core';
import { Product } from 'src/app/create/models/product';


@Pipe({
  name: 'searchProd'
})

export class SearchPipe implements PipeTransform {
  transform(arr: Product[] | null, value: string, prop: keyof Product): Product[] {
    if (!arr) return []
    if (!value) return arr;
    return arr.filter(
      prod => String(prod[prop]).toLowerCase().includes(value.toLowerCase()))
  }
}
