import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { TrackService } from '../services/track-service.service';

@Component({
  selector: 'app-audiobooks',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './audiobooks.component.html',
  styleUrl: './audiobooks.component.scss'
})
export class AudiobooksComponent implements OnInit {
  id: string = '';

  constructor(private route: ActivatedRoute, private trackService: TrackService) { }

  async ngOnInit(): Promise<void> {
    this.id = this.route.snapshot.paramMap.get('id')!;
    console.log('ID from URL:', this.id);

    await this.fetchArtistsAlbum();
  }


  async fetchArtistsAlbum() {
    if (this.id) {
      try {
        const data = await this.trackService.getArtistsAlbum(this.id);
        console.log(data);
      } catch (error) {
        console.error('Failed to fetch artist albums', error);
      }
    } else {
      console.error('No artist selected');
    }
  }
}