import { Component } from '@angular/core';
import { Artist } from './artists.type';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { TrackService } from '../services/track-service.service';

@Component({
  selector: 'app-artist',
  standalone: true,
  imports: [CommonModule, MatFormFieldModule, MatSelectModule, MatInputModule, FormsModule, RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './artist.component.html',
  styleUrl: './artist.component.scss'
})
export class ArtistComponent {
  artists: Artist[] = [
    { id: '10fua9lLREs5JISPcCyyJn', artistName: 'lcone' },
    { id: '0JBdTCGs111JKKYfLqOEBa', artistName: 'Shirin David' },
    { id: '7wkPBPwF9oOZJ8lEbQjIVt', artistName: 'Mani Matter' },
    { id: '1DxUdl4z0N2hLqU7U6yqwc', artistName: 'money Boy' },
    { id: '3TVXtAsR1Inumwj472S9r4', artistName: 'Drake' },
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
