import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { TrackService } from '../../services/track-service.service';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { firstValueFrom } from 'rxjs';
import { TitleComponent } from '../components/title/title.component';
import { FooterComponent } from '../components/footer/footer.component';
import { NavButtonComponent } from '../components/nav-button/nav-button.component';
import { NavButtonsContainerComponent } from '../components/nav-buttons-container/nav-buttons-container.component';
import { ControlButtonsComponent } from '../components/control-buttons/control-buttons.component';
import { SpotifyTrack } from '../../types/spotifyModels/artistsTracks';

@Component({
  selector: 'app-shuffler',
  standalone: true,
  imports: [RouterLink, CommonModule, IonicModule, TitleComponent, FooterComponent, FooterComponent, NavButtonComponent, NavButtonsContainerComponent, ControlButtonsComponent],
  templateUrl: './shuffler.component.html',
  styleUrl: './shuffler.component.scss'
})
export class ShufflerComponent implements OnInit {
  type!: string;
  id!: string;

  artist: Artist | null = null;
  albums: SpotifyAlbum[] = [];
  tracks: SpotifyTrack[] = [];

  selectedAlbum: SpotifyAlbum | null = null;
  selectedTrack: SpotifyTrack | null = null;

  selectedMedia!: SpotifyAlbum | SpotifyTrack;
  selectedImageUrl!: string;

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
          this.selectedImageUrl = this.selectedAlbum.images[1].url;
          this.randomNumberArray.push(this.randomNumber);
        } else {
          console.warn('No albums found for this artist.');
        }
      } else if (this.type === 'artists') {
        this.tracks = await this.trackService.getAllTracksByArtist(this.id);

        if (this.tracks.length > 0) {
          this.randomNumber = this.getRandomInt(this.tracks.length);
          this.selectedTrack = this.tracks[this.randomNumber];
          this.selectedImageUrl = this.selectedTrack.album.images[1].url;
          this.randomNumberArray.push(this.randomNumber);
        } else {
          console.warn('No tracks found for this artist.');
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
      if (this.type === 'artists') {
        this.selectedTrack = this.tracks[this.randomNumberArray[this.randomNumberIndex]];
        this.selectedImageUrl = this.selectedTrack.album.images[1].url;
      }
      else if (this.type === 'audiobooks') {
        this.selectedAlbum = this.albums[this.randomNumberArray[this.randomNumberIndex]];
        this.selectedImageUrl = this.selectedAlbum.images[1].url;
      }
    }
  }

  onPlay() {
    let spotifyUrl = '';
    if (this.type === 'artists') {
      spotifyUrl = this.selectedTrack?.external_urls.spotify!;
    } else if (this.type === 'audiobooks') {
      spotifyUrl = this.selectedAlbum?.external_urls.spotify!;
    }
    window.open(spotifyUrl, '_blank');
  }

  onForward() {
    if (this.randomNumberIndex < this.randomNumberArray.length - 1) {
      this.randomNumberIndex++;
      this.selectedAlbum = this.albums[this.randomNumberArray[this.randomNumberIndex]];
      this.selectedImageUrl = this.selectedAlbum.images[1].url;

    } else if (this.randomNumberIndex === this.randomNumberArray.length - 1) {
      this.randomNumber = this.getRandomInt(this.albums.length);
      this.selectedAlbum = this.albums[this.randomNumber];
      this.selectedImageUrl = this.selectedAlbum.images[1].url;

      this.randomNumberArray.push(this.randomNumber);
      this.randomNumberIndex++;
    }
  }

  private get ImageUrl(): string {
    return this.selectedMedia.images[1].url;
  }

  private getRandomInt(max: number): number {
    return Math.floor(Math.random() * max);
  }
}
