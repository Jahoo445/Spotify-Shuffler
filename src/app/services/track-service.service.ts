import { Injectable } from '@angular/core';
import { SpotifyAuthService } from './spotify-auth.service';

@Injectable({
  providedIn: 'root',
})
export class TrackService {
  constructor(private spotifyAuthService: SpotifyAuthService) { }

  async getArtistsAlbum(artistId: string): Promise<any> {

    console.log('access token:', await this.spotifyAuthService.getStoredAccessToken());

    const url = `https://api.spotify.com/v1/artists/${artistId}/albums`;

    const options = {
      method: 'GET',
      headers: {
        Authorization: 'Bearer ' + await this.spotifyAuthService.getStoredAccessToken(),
      }
    };

    try {
      const response = await fetch(url, options);

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}
