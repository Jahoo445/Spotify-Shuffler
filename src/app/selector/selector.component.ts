import { Component, computed, HostListener, inject, OnInit } from '@angular/core';
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
import { ArtistsService } from '../../services/artists.service';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-selector',
  standalone: true,
  imports: [CommonModule, MatSelectModule, FormsModule, RouterLink, TitleComponent, FooterComponent, NavButtonComponent, NavButtonsContainerComponent],
  templateUrl: './selector.component.html',
  styleUrl: './selector.component.scss'
})
export class SelectorComponent implements OnInit {
  artistsService = inject(ArtistsService);
  firebaseArtistsService = inject(FirebaseArtistsService);

  artMakers: ArtMaker[] = [];
  selectedArtMaker: ArtMaker | null = null;
  artistImageUrl: string | null = null;

  isDropdownOpen = false;

  // audiobooks: ArtMaker[] = [
  //   { id: '3meJIgRw7YleJrmbpbJK6S', artistName: 'Die Drei ???' },
  //   { id: '0vLsqW05dyLvjuKKftAEGA', artistName: 'Die Drei ??? Kids' },
  //   { id: '2Jc4AEeBTE47KwuKgYOtcL', artistName: 'Die Drei !!!' },
  //   { id: '61qDotnjM0jnY5lkfOP7ve', artistName: 'TKKG' },
  // ];


  // artists: ArtMaker[] = [
  //   { id: '10fua9lLREs5JISPcCyyJn', artistName: 'lcone' },
  //   { id: '0JBdTCGs111JKKYfLqOEBa', artistName: 'Shirin David' },
  //   { id: '7wkPBPwF9oOZJ8lEbQjIVt', artistName: 'Mani Matter' },
  //   { id: '1DxUdl4z0N2hLqU7U6yqwc', artistName: 'money Boy' },
  //   { id: '3TVXtAsR1Inumwj472S9r4', artistName: 'Drake' },
  // ];

  type: string = '';

  constructor(private route: ActivatedRoute, private trackService: TrackService) { }

  async ngOnInit(): Promise<void> {
    try {
      const artists = await firstValueFrom(this.firebaseArtistsService.getArtists());
      this.artistsService.artistsSig.set(artists);
      this.artMakers = artists;

      this.route.data.subscribe((data) => {
        this.type = data['type'];
        if (this.type === 'artists') {
          this.artistsService.selectedArtMakerSig.set(this.artistsService.artistsSig()[0]);
          this.selectedArtMaker = this.artistsService.selectedArtMakerSig();
        }
        this.fetchArtistDetails();
      });
    } catch (error) {
      console.error('Error loading artists:', error);
    }
  }


  getArtists = computed(() => {
    return this.artistsService.artistsSig();
  })

  fetchArtistDetails(): void {
    this.trackService.getArtist(this.artistsService.selectedArtMakerSig().artistId).then((artist: Artist) => {
      this.artistImageUrl = artist.images.length > 0 ? artist.images[2].url : null;
    }).catch(error => {
      console.error('Error fetching artist details:', error);
    });
  }

  toggleDropdown(): void {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  selectArtMaker(ArtMaker: ArtMaker): void {
    this.artistsService.selectedArtMakerSig.set(ArtMaker);
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
