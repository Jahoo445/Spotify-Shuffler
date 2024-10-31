import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ArtMakerService {

  artistsSig = signal<ArtMaker[]>([]);
  selectedArtMakerSig = signal<ArtMaker>({ id: '', artistName: '', artistId: '' });

  addArtists(id: string, artistName: string, artistId: string): void {
    this.artistsSig.update(artists => [...artists, { id, artistName, artistId }]);
  }
}
