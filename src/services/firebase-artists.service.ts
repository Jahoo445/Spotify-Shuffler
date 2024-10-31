import { inject, Injectable } from '@angular/core';
import { collection, collectionData, Firestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class FirebaseArtistsService {

  firestore = inject(Firestore);
  artistsCollection = collection(this.firestore, 'artists');
  audioBooksCollection = collection(this.firestore, 'audiobooks');

  constructor() { }

  getArtists(): Observable<ArtMaker[]> {
    return collectionData(this.artistsCollection, { idField: 'id' }) as Observable<ArtMaker[]>;
  }

  getAudioBooks(): Observable<ArtMaker[]> {
    return collectionData(this.audioBooksCollection, { idField: 'id' }) as Observable<ArtMaker[]>;
  }
}
