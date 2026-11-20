import { Directive, ElementRef, HostListener, inject } from '@angular/core';

@Directive({
  selector: '[appResaltar]',
  standalone: true
})
export class ResaltarDirective {
  private el = inject(ElementRef);

  @HostListener('mouseenter') onMouseEnter() {
    this.el.nativeElement.style.backgroundColor = '#e3f2fd'; // Azul claro
    this.el.nativeElement.style.transition = '0.3s';
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.el.nativeElement.style.backgroundColor = '';
  }
}