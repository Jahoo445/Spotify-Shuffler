import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink, RouterOutlet } from '@angular/router';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { TrackService } from '../../services/track-service.service';

@Component({
  selector: 'app-selector',
  standalone: true,
  imports: [CommonModule, MatFormFieldModule, MatSelectModule, MatInputModule, FormsModule, RouterOutlet, RouterLink],
  templateUrl: './selector.component.html',
  styleUrl: './selector.component.scss'
})
export class SelectorComponent implements OnInit {

  audiobooks: ArtMaker[] = [
    { id: '3meJIgRw7YleJrmbpbJK6S', artistName: 'Die Drie ???' },
    { id: '61qDotnjM0jnY5lkfOP7ve', artistName: 'TKKG' },
  ];

  artists: ArtMaker[] = [
    { id: '10fua9lLREs5JISPcCyyJn', artistName: 'lcone' },
    { id: '0JBdTCGs111JKKYfLqOEBa', artistName: 'Shirin David' },
    { id: '7wkPBPwF9oOZJ8lEbQjIVt', artistName: 'Mani Matter' },
    { id: '1DxUdl4z0N2hLqU7U6yqwc', artistName: 'money Boy' },
    { id: '3TVXtAsR1Inumwj472S9r4', artistName: 'Drake' },
  ];

  ArtMakers: ArtMaker[] = [];

  selectedArtMaker: ArtMaker = this.artists[0];
  artistImageUrl: string | null = null; // Add this line to store the image URL

  type: string = '';

  constructor(private route: ActivatedRoute, private trackService: TrackService) { }

  ngOnInit(): void {
    this.route.data.subscribe((data) => {
      this.type = data['type'];
      if (this.type === 'artists') {
        console.log('Component initialized as Artist');

        this.ArtMakers = this.artists;
        this.selectedArtMaker = this.artists[0];

      } else if (this.type === 'audiobooks') {
        console.log('Component initialized as Audiobook');

        this.ArtMakers = this.audiobooks;
        this.selectedArtMaker = this.audiobooks[0];
      }

      // Fetch artist details on initialization
      this.fetchArtistDetails();
    });
  }

  fetchArtistDetails(): void {
    if (this.selectedArtMaker && this.selectedArtMaker.id) {
      this.trackService.getArtist(this.selectedArtMaker.id).then((artist: Artist) => {
        this.artistImageUrl = artist.images.length > 0 ? artist.images[2].url : null;
      }).catch(error => {
        console.error('Error fetching artist details:', error);
      });
    }
  }
}