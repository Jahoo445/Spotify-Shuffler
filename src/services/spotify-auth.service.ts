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
    urlencoded.append("client_id", "4f6993cd4fd54564b2f45a0d9a941742");
    urlencoded.append("client_secret", "9913877d9bdc4065ad25a69b84733471");

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
