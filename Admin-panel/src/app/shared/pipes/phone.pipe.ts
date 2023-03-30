import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'phone'
})
export class PhonePipe implements PipeTransform {

  transform(value: string | undefined): string {
    if (!value) {
      return '';
    }
    let arr = value.split('').splice(4, 9);
    let result: any = [];
    arr.map((item, index) => {
      if (index % 2 === 0 && index > 1) {
        result.push(item + '-')
      }
      else result.push(item)
    })
    return result.join('').slice(0, -1)
  }

}
