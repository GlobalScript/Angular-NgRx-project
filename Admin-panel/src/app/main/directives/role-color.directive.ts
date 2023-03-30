import { Directive, ElementRef, Input, Renderer2, OnInit } from '@angular/core';
import { Roles } from 'src/app/shared/enums/roles';

@Directive({
  selector: '[appRoleColor]'
})
export class RoleColorDirective {

  @Input() appRoleColor!: string;

  constructor(private elmRef: ElementRef, private renderer: Renderer2) { }

  ngOnInit(): void {
    let roleColor: string = '';
    if (this.appRoleColor === Roles.admin) roleColor = '#e3fedf';
    if (this.appRoleColor === Roles.owner) roleColor = 'rgb(244, 208, 208)';
    if (this.appRoleColor === Roles.user) roleColor = 'rgb(190, 226, 240)';
    this.renderer.setStyle(this.elmRef.nativeElement, 'background-color', roleColor);
  }
}
