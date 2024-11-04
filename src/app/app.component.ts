import { Component } from '@angular/core';
import { SposhuComponent } from './sposhu/sposhu.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [SposhuComponent],
  templateUrl: './app.component.html'
})
export class AppComponent {
  title = 'spotify-shuffler';

  constructor() { }
}