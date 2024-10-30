import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { TrackService } from '../../services/track-service.service';
import { CommonModule } from '@angular/common';
// import { IonicModule } from '@ionic/angular';
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
  imports: [RouterLink, CommonModule, TitleComponent, FooterComponent, FooterComponent, NavButtonComponent, NavButtonsContainerComponent, ControlButtonsComponent],
  templateUrl: './shuffler.component.html',
  styleUrl: './shuffler.component.scss'
})
export class ShufflerComponent implements OnInit {
  type!: string;
  id!: string;

  artist: Artist | null = null;

  medias: (SpotifyAlbum | SpotifyTrack)[] = [];

  selectedMedia: SpotifyAlbum | SpotifyTrack | null = null;


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
        this.medias = await this.trackService.getAudioBooksAlbums(this.id);

      } else if (this.type === 'artists') {
        this.medias = await this.trackService.getAllTracksByArtist(this.id);
      }

      if (this.medias.length > 0) {
        this.randomNumber = this.getRandomInt(this.medias.length);
        this.selectedMedia = this.medias[this.randomNumber];
        this.selectedImageUrl = this.getImageUrl();
        this.randomNumberArray.push(this.randomNumber);
      } else {
        console.warn('No media found for this artist.');
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
      this.selectedMedia = this.medias[this.randomNumberArray[this.randomNumberIndex]];
      this.selectedImageUrl = this.getImageUrl();
    }
  }

  onPlay() {
    const spotifyUrl = this.selectedMedia?.external_urls.spotify;
    window.open(spotifyUrl, '_blank');
  }

  onForward() {
    if (this.randomNumberIndex < this.randomNumberArray.length - 1) {
      this.randomNumberIndex++;
      this.selectedMedia = this.medias[this.randomNumberArray[this.randomNumberIndex]];
      this.selectedImageUrl = this.getImageUrl();

    } else if (this.randomNumberIndex === this.randomNumberArray.length - 1) {
      this.randomNumber = this.getRandomInt(this.medias.length);
      this.selectedMedia = this.medias[this.randomNumber];
      this.selectedImageUrl = this.getImageUrl();

      this.randomNumberArray.push(this.randomNumber);
      this.randomNumberIndex++;
    }
  }

  private getImageUrl(): string {
    return this.selectedMedia?.images[1].url!;
  }

  private getRandomInt(max: number): number {
    return Math.floor(Math.random() * max);
  }
}
