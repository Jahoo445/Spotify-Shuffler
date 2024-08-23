import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ArtistComponent } from './artist/artist.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ArtistComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'spotify-shuffler';
}
