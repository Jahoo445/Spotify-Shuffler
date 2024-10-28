import { Component, Input, ElementRef, AfterViewChecked, Renderer2, HostListener, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-title',
  standalone: true,
  templateUrl: './title.component.html',
  styleUrls: ['./title.component.scss']
})
export class TitleComponent implements AfterViewChecked {
  @Input() text: string = '';

  constructor(
    private el: ElementRef,
    private renderer: Renderer2,
    @Inject(PLATFORM_ID) private platformId: Object
  ) { }

  ngAfterViewChecked() {
    if (isPlatformBrowser(this.platformId)) {
      this.adjustFontSize();
    }
  }

  @HostListener('window:resize')
  onResize() {
    if (isPlatformBrowser(this.platformId)) {
      this.adjustFontSize();
    }
  }

  private adjustFontSize() {
    if (!isPlatformBrowser(this.platformId)) return;

    const titleElement = this.el.nativeElement.querySelector('.title');
    const screenWidth = window.innerWidth;

    console.log(screenWidth);

    console.log(this.text.length);

    if (screenWidth < 445) {
      this.renderer.setStyle(titleElement, 'font-size', '2.9rem');
    } else if (this.text.length >= 15) {
      this.renderer.setStyle(titleElement, 'font-size', '3.5rem');
    } else {
      this.renderer.setStyle(titleElement, 'font-size', '4rem');
    }
  }
}
