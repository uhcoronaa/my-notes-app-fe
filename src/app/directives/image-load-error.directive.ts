import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: 'img[loadImgError]'
})
export class ImageLoadErrorDirective {

  constructor(private element: ElementRef) { }

  @Input('loadImgError') img: string = "";

  @HostListener('error')
  displayFallbackImg() {
    this.element.nativeElement.src = this.img;
  }

}
