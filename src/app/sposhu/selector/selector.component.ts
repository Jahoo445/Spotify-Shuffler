import { Component, computed, HostListener, inject, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { TrackService } from '../../../services/track-service.service';
import { TitleComponent } from '../components/title/title.component';
import { FooterComponent } from '../components/footer/footer.component';
import { NavButtonComponent } from '../components/nav-button/nav-button.component';
import { NavButtonsContainerComponent } from '../components/nav-buttons-container/nav-buttons-container.component';
import { FirebaseArtistsService } from '../../../services/firebase-artists.service';
import { ArtMakerService } from '../../../services/artists.service';
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

  constructor(private route: ActivatedRoute, private trackService: TrackService) { }

  ngOnInit(): void {
    this.firebaseArtistsService.getArtists().subscribe((artists) => {
      this.artMakerService.artistSig.set(artists);
    });

    this.firebaseArtistsService.getAudioBooks().subscribe((audioBooks) => {
      this.artMakerService.audioBookSig.set(audioBooks);
    });

    this.route.data.subscribe((data) => {
      this.type = data['type'];
      if (this.type === 'artists') {
        this.artMakerService.selectedArtMakerSig.set(this.artMakerService.artistSig()[0]);
      }
      if (this.type === 'audiobooks') {
        this.artMakerService.selectedArtMakerSig.set(this.artMakerService.audioBookSig()[0]);
      }
      this.fetchArtistDetails();
    });
  }


  getArtists = computed(() => {
    return this.artMakerService.artistSig();
  })

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
