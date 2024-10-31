import { inject, Injectable } from '@angular/core';
import { collection, collectionData, Firestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class FirebaseArtistsService {

  firestore = inject(Firestore);
  artistsCollection = collection(this.firestore, 'artists');

  constructor() { }

  getArtists(): Observable<ArtMaker[]> {
    return collectionData(this.artistsCollection, { idField: 'id', artistName: 'artistName' }) as Observable<ArtMaker[]>;
  }
}
