import { Component, OnInit } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive, ActivatedRoute } from '@angular/router';
import { TrackService } from '../services/track-service.service';
import { Artist } from '../artist/artists.type';

@Component({
  selector: 'app-player',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './player.component.html',
  styleUrl: './player.component.scss'
})
export class PlayerComponent implements OnInit {
  id: string = '';

  selectedArtist: Artist = { id: '10fua9lLREs5JISPcCyyJn', artistName: 'lcone' };


  constructor(private route: ActivatedRoute, private trackService: TrackService) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id')!;
    console.log('ID from URL:', this.id);
  }


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