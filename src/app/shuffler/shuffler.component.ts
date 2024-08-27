import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { TrackService } from '../../services/track-service.service';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-shuffler',
  standalone: true,
  imports: [RouterLink, CommonModule, IonicModule],
  templateUrl: './shuffler.component.html',
  styleUrl: './shuffler.component.scss'
})
export class ShufflerComponent implements OnInit {
  type!: string;
  id!: string;

  artist: Artist | null = null;
  albums: SpotifyAlbum[] = [];

  selectedAlbum!: SpotifyAlbum;
  selectedAlbumImageUrl!: string;

  loading: boolean = true;

  randomNumberArray: number[] = [];
  randomNumber: number = 0;
  randomNumberIndex: number = 0;

  constructor(private route: ActivatedRoute, private trackService: TrackService) { }

  async ngOnInit(): Promise<void> {
    try {
      const data = await firstValueFrom(this.route.data);
      this.type = data['type'];
      this.id = this.route.snapshot.paramMap.get('id')!;

      this.artist = await this.trackService.getArtist(this.id);

      if (this.type === 'audiobooks') {
        this.albums = await this.trackService.getAudioBooksAlbums(this.id);

        if (this.albums.length > 0) {
          this.randomNumber = this.getRandomInt(this.albums.length);
          this.selectedAlbum = this.albums[this.randomNumber];
          this.selectedAlbumImageUrl = this.selectedAlbum.images[1].url;
          this.randomNumberArray.push(this.randomNumber);
        } else {
          console.warn('No albums found for this artist.');
        }
      }

      this.loading = false;
    } catch (error) {
      console.error('Error loading artist or albums', error);
      this.loading = false;
    }
  }

  onBack() {
    if (this.randomNumberIndex > 0) {
      this.randomNumberIndex--;
      this.selectedAlbum = this.albums[this.randomNumberArray[this.randomNumberIndex]];
      this.selectedAlbumImageUrl = this.selectedAlbum.images[1].url;
    }
  }

  onPlay() {
    const spotifyUrl = this.selectedAlbum.external_urls.spotify;
    window.open(spotifyUrl, '_blank');
  }

  onForward() {
    if (this.randomNumberIndex < this.randomNumberArray.length - 1) {
      this.randomNumberIndex++;
      this.selectedAlbum = this.albums[this.randomNumberArray[this.randomNumberIndex]];
      this.selectedAlbumImageUrl = this.selectedAlbum.images[1].url;

    } else if (this.randomNumberIndex === this.randomNumberArray.length - 1) {
      this.randomNumber = this.getRandomInt(this.albums.length);
      this.selectedAlbum = this.albums[this.randomNumber];
      this.selectedAlbumImageUrl = this.selectedAlbum.images[1].url;

      this.randomNumberArray.push(this.randomNumber);
      this.randomNumberIndex++;
    }
  }

  getRandomInt(max: number): number {
    return Math.floor(Math.random() * max);
  }
}
