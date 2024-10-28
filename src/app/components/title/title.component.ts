import { Component, Input, ElementRef, AfterViewChecked, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-title',
  standalone: true,
  templateUrl: './title.component.html',
  styleUrls: ['./title.component.scss']
})
export class TitleComponent implements AfterViewChecked {
  @Input() text: string = '';

  constructor(private el: ElementRef, private renderer: Renderer2) { }

  ngAfterViewChecked() {
    this.adjustFontSize();
  }

  private adjustFontSize() {
    const titleElement = this.el.nativeElement.querySelector('.title');

    console.log(this.text.length);

    if (this.text.length >= 15) {
      this.renderer.setStyle(titleElement, 'font-size', '3.5rem');
    } else {
      this.renderer.setStyle(titleElement, 'font-size', '4rem');
    }
  }
}
