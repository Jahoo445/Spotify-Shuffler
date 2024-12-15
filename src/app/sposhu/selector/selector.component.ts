import { Component, HostListener, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { TrackService } from '../../../services/track-service.service';
import { TitleComponent } from '../components/title/title.component';
import { FooterComponent } from '../components/footer/footer.component';
import { NavButtonComponent } from '../components/nav-button/nav-button.component';
import { NavButtonsContainerComponent } from '../components/nav-buttons-container/nav-buttons-container.component';
import { GetArtMakerService } from '../../../services/getArtMaker.service';

@Component({
  selector: 'app-selector',
  standalone: true,
  imports: [
    CommonModule,
    MatSelectModule,
    FormsModule,
    RouterLink,
    TitleComponent,
    FooterComponent,
    NavButtonComponent,
    NavButtonsContainerComponent
  ],
  templateUrl: './selector.component.html',
  styleUrls: ['./selector.component.scss']
})
export class SelectorComponent implements OnInit {

  isDropdownOpen = false;

  ArtMakers: ArtMaker[] = [];

  selectedArtMaker: ArtMaker = { "artistName": "lcone", "artistId": "10fua9lLREs5JISPcCyyJn" };
  artistImageUrl: string | null = null;

  type: string = '';

  constructor(private route: ActivatedRoute, private trackService: TrackService, private getArtMakerService: GetArtMakerService) { }

  async ngOnInit(): Promise<void> {
    this.route.data.subscribe(async (data) => {
      this.type = data['type'];
      if (this.type === 'artists') {
        this.ArtMakers = await this.getArtMakerService.getArtists();
      } else if (this.type === 'audiobooks') {
        this.ArtMakers = await this.getArtMakerService.getAudiobooks();
      }
      this.selectedArtMaker = this.ArtMakers[0];
      this.fetchArtistDetails();
    });
  }

  fetchArtistDetails(): void {
    if (this.selectedArtMaker && this.selectedArtMaker.artistId) {
      this.trackService.getArtist(this.selectedArtMaker.artistId).then((artist: Artist) => {
        this.artistImageUrl = artist.images.length > 0 ? artist.images[2].url : null;
      }).catch(error => {
        console.error('Error fetching artist details:', error);
      });
    }
  }

  toggleDropdown(): void {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  selectArtMaker(ArtMaker: ArtMaker): void {
    this.selectedArtMaker = ArtMaker;
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
