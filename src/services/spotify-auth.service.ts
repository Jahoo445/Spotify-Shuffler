import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class SpotifyAuthService {
  private accessToken: string = '';

  constructor(@Inject(PLATFORM_ID) private platformId: any) {
    if (isPlatformBrowser(this.platformId)) {
      this.fetchAndStoreAccessToken();
    }
  }

  public async getAccessToken(): Promise<string> {
    try {
      const response = await fetch('/.netlify/functions/fetchSpotifyToken');
      if (!response.ok) {
        throw new Error(`Failed to fetch access token: ${response.statusText}`);
      }
      const data = await response.json();
      return data.accessToken;
    } catch (error) {
      console.error("Error getting access token:", error);
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
