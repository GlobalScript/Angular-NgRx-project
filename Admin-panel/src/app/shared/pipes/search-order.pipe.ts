import { Pipe, PipeTransform } from '@angular/core';
import { Order } from 'src/app/main/models/order';

@Pipe({
  name: 'searchOrder'
})
export class SearchOrderPipe implements PipeTransform {

  transform(arr: Order[] | null, value: string, prop: keyof Order): Order[] {
    if (!arr) return []
    if (!value) return arr;
    return arr.filter(
      prod => String(prod[prop]).toLowerCase().includes(value.toLowerCase()))
  }

}
