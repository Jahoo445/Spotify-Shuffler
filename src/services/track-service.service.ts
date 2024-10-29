import { Injectable } from '@angular/core';
import { SpotifyAuthService } from './spotify-auth.service';
import { SpotifyTrack } from '../types/spotifyModels/artistsTracks';

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

  async getAllTracksByArtist(artistId: string): Promise<SpotifyTrack[]> {
    const allTracks: SpotifyTrack[] = [];

    let albums: any[] = [];
    let albumOffset = 0;
    const albumsUrl = `https://api.spotify.com/v1/artists/${artistId}/albums`;

    while (true) {
      const albumResponse = await fetch(`${albumsUrl}?offset=${albumOffset}&limit=50`, {
        headers: {
          Authorization: 'Bearer ' + await this.spotifyAuthService.getStoredAccessToken(),
        },
      });

      const albumData = await albumResponse.json();
      albums = albums.concat(albumData.items);
      if (albumData.items.length < 50) break;
      albumOffset += 50;
    }


    for (const album of albums) {

      let trackOffset = 0;
      const tracksUrl = `https://api.spotify.com/v1/albums/${album.id}/tracks`;

      while (true) {
        const trackResponse = await fetch(`${tracksUrl}?offset=${trackOffset}&limit=50`, {
          headers: {
            Authorization: 'Bearer ' + await this.spotifyAuthService.getStoredAccessToken(),
          },
        });

        const trackData = await trackResponse.json();

        for (const track of trackData.items) {
          if (track.artists.some((artist: { id: string }) => artist.id === artistId)) {
            track.album = album;
            track.images = album.images;
            allTracks.push(track);
          }
        }
        if (trackData.items.length < 50) break;
        trackOffset += 50;
      }
    }

    return allTracks;
  }
}
