import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-nav-button',
  templateUrl: './nav-button.component.html',
  styleUrl: './nav-button.component.scss',
  standalone: true,
  imports: [RouterLink]
})
export class NavButtonComponent {
  @Input() label: string = '';
  @Input() routeLink: string = '';
}
