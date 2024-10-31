import { Component, computed, HostListener, inject, OnInit, PLATFORM_ID, Inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { TrackService } from '../../services/track-service.service';
import { TitleComponent } from '../components/title/title.component';
import { FooterComponent } from '../components/footer/footer.component';
import { NavButtonComponent } from '../components/nav-button/nav-button.component';
import { NavButtonsContainerComponent } from '../components/nav-buttons-container/nav-buttons-container.component';
import { FirebaseArtistsService } from '../../services/firebase-artists.service';
import { ArtMakerService } from '../../services/artists.service';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-selector',
  standalone: true,
  imports: [CommonModule, MatSelectModule, FormsModule, RouterLink, TitleComponent, FooterComponent, NavButtonComponent, NavButtonsContainerComponent],
  templateUrl: './selector.component.html',
  styleUrl: './selector.component.scss'
})
export class SelectorComponent implements OnInit {
  artMakerService = inject(ArtMakerService);
  firebaseArtistsService = inject(FirebaseArtistsService);
  artistImageUrl: string | null = null;
  isDropdownOpen = false;
  type!: 'artists' | 'audiobooks';
  isBrowser: boolean;

  constructor(
    private route: ActivatedRoute,
    private trackService: TrackService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  ngOnInit(): void {
    this.route.data.subscribe((data) => {
      this.type = data['type'];

      if (this.isBrowser) {
        // Only fetch data on the client-side to avoid SSR timeout
        this.loadArtMakerData();
      }
    });
  }

  async loadArtMakerData() {
    try {
      if (this.type === 'artists') {
        const artists = await firstValueFrom(this.firebaseArtistsService.getArtists());
        this.artMakerService.artistsSig.set(artists);
      } else if (this.type === 'audiobooks') {
        const audioBooks = await firstValueFrom(this.firebaseArtistsService.getAudioBooks());
        this.artMakerService.artistsSig.set(audioBooks);
      }

      this.artMakerService.selectedArtMakerSig.set(this.artMakerService.artistsSig()[0]);
      this.fetchArtistDetails();
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  getArtists = computed(() => {
    return this.artMakerService.artistsSig();
  });

  fetchArtistDetails(): void {
    const selected = this.artMakerService.selectedArtMakerSig();
    this.trackService.getArtist(selected.artistId).then((artist: Artist) => {
      this.artistImageUrl = artist.images.length > 0 ? artist.images[2].url : null;
    }).catch(error => {
      console.error('Error fetching artist details:', error);
    });
  }

  toggleDropdown(): void {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  selectArtMaker(artMaker: ArtMaker): void {
    this.artMakerService.selectedArtMakerSig.set(artMaker);
    this.isDropdownOpen = false;
    this.fetchArtistDetails();
  }

  @HostListener('document:click', ['$event'])
  closeDropdown(event: Event): void {
    if (!(event.target as HTMLElement).closest('.dropdown-container')) {
      this.isDropdownOpen = false;
    }
  }
}
