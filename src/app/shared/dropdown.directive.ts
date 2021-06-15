import { Directive, HostBinding, HostListener } from '@angular/core';

@Directive({
  selector: '[appDropdown]'
})
export class DropdownDirective {
  @HostBinding('class.invisible') isHide = true;

  @HostListener('mouseenter') mouseEnter() {
    this.isHide = !this.isHide;
  }

  @HostListener('mouseleave') mouseLeave() {
    // this.isHide = !this.isHide;
  }
}
