import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { FooterComponent } from './sposhu/components/footer/footer.component';
import { SposhuComponent } from './sposhu/sposhu.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [SposhuComponent, RouterOutlet, FooterComponent, RouterLink,],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'spotify-shuffler';

  constructor() { }
}
