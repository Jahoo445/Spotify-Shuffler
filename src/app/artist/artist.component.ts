import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Artist } from '../types/artists.type';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { TrackService } from '../services/track-service.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';


@Component({
  selector: 'app-artist',
  standalone: true,
  imports: [CommonModule, MatFormFieldModule, MatSelectModule, MatInputModule, FormsModule, RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './artist.component.html',
  styleUrl: './artist.component.scss'
})
export class ArtistComponent {
  artists: Artist[] = [
    { id: '3meJIgRw7YleJrmbpbJK6S', artistName: 'Die Drie ???' },
    { id: '61qDotnjM0jnY5lkfOP7ve', artistName: 'TKKG' },
  ];

  selectedArtist: Artist = this.artists[0];

  constructor(private trackService: TrackService) { }

  async fetchArtistsAlbum() {
    if (this.selectedArtist.id) {
      try {
        const data = await this.trackService.getArtistsAlbum(this.selectedArtist.id);
        console.log(data);
      } catch (error) {
        console.error('Failed to fetch artist albums', error);
      }
    } else {
      console.error('No artist selected');
    }
  }
}
