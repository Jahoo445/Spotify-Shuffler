import { Injectable } from '@angular/core';
import { SpotifyAuthService } from './spotify-auth.service';

@Injectable({
  providedIn: 'root',
})
export class TrackService {
  constructor(private spotifyAuthService: SpotifyAuthService) { }

  async getAudioBooksAlbums(artistId: string): Promise<SpotifyAlbum[]> {

    let albums: SpotifyAlbum[] = [];

    let offset = 0;

    const albumCount = await this.getArtMakerCreationCount(artistId);

    while (offset < albumCount) {
      const url = `https://api.spotify.com/v1/artists/${artistId}/albums?limit=50&offset=${offset}&include_groups=album`;

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

        const filteredItems = data.items.filter(item =>
          /^Folge \d+:/.test(item.name) || /^\d+\/\s*/.test(item.name)
        );

        albums = albums.concat(filteredItems);

      } catch (error) {
        console.error(error);
        throw error;
      }

      offset += 50;
    };

    // console.debug(albums);

    return albums;
  }


  private async getArtMakerCreationCount(artistId: string): Promise<number> {
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

  // async getArtistSingels(artistId: string): Promise<SpotifyAlbum[]> {
  //   let singles: SpotifyAlbum[] = [];

  //   let offset = 0;

  //   const singlesCount = this.getArtistSinglesCount(artistId);
  // }

  async getArtistSingels(artistId: string): Promise<void> {
    let singles: SpotifyAlbum[] = [];

    let offset = 0;

    const singlesCount = await this.getArtMakerCreationCount(artistId);

    while (offset < singlesCount) {
      const url = `https://api.spotify.com/v1/artists/${artistId}/albums?limit=50&offset=${offset}&include_groups=album`;

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

        const filteredItems = data.items.filter(item =>
          /^Folge \d+:/.test(item.name) || /^\d+\/\s*/.test(item.name)
        );

        singles = singles.concat(filteredItems);

        if (data.items.length <= 50) {
          break;
        }
      } catch (error) {
        console.error(error);
        throw error;
      }

      offset += 50;
    }
  }

  private async getArtistSinglesCount(artistId: string): Promise<number> {
    const url = `https://api.spotify.com/v1/artists/${artistId}/albums?&include_groups=single&limit=50&offset=50`;

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

      console.log(data);

      return data.total;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

}
