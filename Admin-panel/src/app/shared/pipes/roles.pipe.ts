import { Pipe, PipeTransform } from '@angular/core';
import { Roles } from '../enums/roles';

@Pipe({
  name: 'roles'
})
export class RolesPipe implements PipeTransform {

  transform(value: string): boolean {
    return value === Roles.owner;
  }

}
