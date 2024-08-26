export interface SpotifyTokenResponse {
    access_token: string;
    token_type: string;
    expires_in: number;
}

export interface SpotifyArtistSearchResponse {
    artists: {
        items: {
            id: string;
            name: string;
        }[];
    };
}

export interface SpotifyAlbum {
    id: string;
    name: string;
    release_date: string;
    total_tracks: number;
    album_type: string;
}

export interface SpotifyArtistAlbumsResponse {
    items: SpotifyAlbum[];
    total: number;
    limit: number;
    offset: number;
}
