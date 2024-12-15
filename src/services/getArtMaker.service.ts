import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root',
})
export class GetArtMakerService {
    private baseUrl = 'https://api.janishofstetter.com/sposhu/';
    constructor() { }

    private async fetchData(endpoint: string): Promise<ArtMaker[]> {
        const response = await fetch(`${this.baseUrl}${endpoint}`);
        if (!response.ok) {
            throw new Error(`Failed to fetchhhhhh ${endpoint}`);
        }
        return response.json() as Promise<ArtMaker[]>;
    }

    public getArtists(): Promise<ArtMaker[]> {
        return this.fetchData('artists');
    }

    public getAudiobooks(): Promise<ArtMaker[]> {
        return this.fetchData('audiobooks');
    }
}
