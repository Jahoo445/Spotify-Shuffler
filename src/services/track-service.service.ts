import { Injectable } from '@angular/core';
import { SpotifyAuthService } from './spotify-auth.service';

@Injectable({
  providedIn: 'root',
})
export class TrackService {
  constructor(private spotifyAuthService: SpotifyAuthService) { }

  async getArtistsAlbum(artistId: string): Promise<any> {

    let albums: SpotifyAlbum[] = [];

    let offset = 0;

    const albumCount = await this.getArtistsAlbumCount(artistId);

    while (offset < albumCount) {
      console.debug(`offset: ${offset}`);
      console.debug(`albumCount: ${albumCount}`);
      console.debug();

      const url = `https://api.spotify.com/v1/artists/${artistId}/albums?limit=50&offset=${offset}&include_groups=album`;

      console.debug(url);
      console.debug();

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

        const data: SpotifyArtistAlbumsResponse = await response.json();

        // Filter items to include only those with numbers in their names
        const filteredItems = data.items.filter(item => /\d/.test(item.name));

        // Concatenate the filtered items to the albums array
        albums = albums.concat(filteredItems);

      } catch (error) {
        console.error(error);
        throw error;
      }

      offset += 50;
    };

    console.debug(albums);
  }

  private async getArtistsAlbumCount(artistId: string): Promise<number> {
    const url = `https://api.spotify.com/v1/artists/${artistId}/albums?limit=1&include_groups=album`;

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

      const data: SpotifyArtistAlbumsResponse = await response.json();

      return data.total;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async getArtist(artistId: string): Promise<Artist> {
    const url = `https://api.spotify.com/v1/artists/${artistId}`;

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

      return await response.json();;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}
