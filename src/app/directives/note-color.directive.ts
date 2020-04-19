import { Directive, ElementRef, HostListener, HostBinding } from '@angular/core';

@Directive({
  selector: '[appNoteColor]'
})
export class NoteColorDirective {

  @HostBinding('style.backgroundColor') bgcolor: string;

  @HostListener('mouseenter')  mseEnter() {
    this.elemen.nativeElement.style.color = 'orange';
  }

  @HostListener('click')  clickEvnt() {
    this.elemen.nativeElement.style.color = 'white';
    this.bgcolor = 'blue';
  }

  constructor(private elemen: ElementRef) {
    this.elemen.nativeElement.style.color = 'darkgray';
   }
}

