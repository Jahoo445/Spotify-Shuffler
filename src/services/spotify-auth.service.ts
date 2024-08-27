import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SpotifyAuthService {
  private accessToken: string = '';

  constructor() {
    this.fetchAndStoreAccessToken();
  }

  public async getAccessToken(): Promise<string> {
    const url = `https://accounts.spotify.com/api/token`;

    const urlencoded = new URLSearchParams();
    urlencoded.append("grant_type", "client_credentials");
    urlencoded.append("client_id", "7ea35e1941b142bbbb4680e5b28fe95d");
    urlencoded.append("client_secret", "6327313494c049b2a1e38e39e3dd3484");

    const options = {
      method: 'POST',
      body: urlencoded,
    };

    try {
      const response = await fetch(url, options);

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data: AuthToken = await response.json();

      return data.access_token;
    }
    catch (error) {
      console.error(error);
      return '';
    }
  }

  private async fetchAndStoreAccessToken(): Promise<void> {
    this.accessToken = await this.getAccessToken();
  }

  public async getStoredAccessToken(): Promise<string> {
    if (!this.accessToken) {
      await this.fetchAndStoreAccessToken();
    }
    return this.accessToken;
  }
}
