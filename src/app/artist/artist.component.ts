import { Component, OnInit } from '@angular/core';
import { Artist } from './artists.type';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { SpotifyAuthService } from '../spotify-auth.service';

@Component({
  selector: 'app-artist',
  standalone: true,
  imports: [MatFormFieldModule, MatSelectModule, MatInputModule, FormsModule],
  templateUrl: './artist.component.html',
  styleUrl: './artist.component.scss'
})

export class ArtistComponent {

  constructor(private spotifyAuthService: SpotifyAuthService) { }

  selectedArtist: Artist = { id: '', artistName: '' };

  artists: Artist[] = [
    { id: '10fua9lLREs5JISPcCyyJn', artistName: 'lcone' },
    { id: '0JBdTCGs111JKKYfLqOEBa', artistName: 'Shirin David' },
    { id: '7wkPBPwF9oOZJ8lEbQjIVt', artistName: 'Mani Matter' },
    { id: '1DxUdl4z0N2hLqU7U6yqwc', artistName: 'money Boy' },
    { id: '3TVXtAsR1Inumwj472S9r4', artistName: 'Drake' },
  ]

  async getArtistsAlbum(artistId: string): Promise<void> {
    const url = `https://api.spotify.com/v1/artists/${artistId}/albums`;

    const options = {
      method: 'GET',
      headers: {
        Authorization: 'Bearer ' + this.spotifyAuthService.getStoredAccessToken(),
      }
    }

    try {
      const response = await fetch(url, options);

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();

      console.log(data);
    }
    catch (error) {
      console.log(error);
    }
  }
}
