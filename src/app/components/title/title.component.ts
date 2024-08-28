import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-title',
  standalone: true,
  templateUrl: './title.component.html',
  styleUrl: './title.component.scss'
})
export class TitleComponent {
  @Input() text: string = '';
}
