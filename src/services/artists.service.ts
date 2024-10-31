import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ArtMakerService {

  artistSig = signal<ArtMaker[]>([]);
  audioBookSig = signal<ArtMaker[]>([]);
  selectedArtMakerSig = signal<ArtMaker>({ id: '', artistName: '', artistId: '' });

  addArtists(id: string, artistName: string, artistId: string): void {
    this.artistSig.update(artists => [...artists, { id, artistName, artistId }]);
  }
}
