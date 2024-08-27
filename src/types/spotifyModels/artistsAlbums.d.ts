interface SpotifyTokenResponse {
    access_token: string;
    token_type: string;
    expires_in: number;
}

interface SpotifyArtistSearchResponse {
    artists: {
        items: {
            id: string;
            name: string;
        }[];
    };
}

interface SpotifyAlbum {
    id: string;
    name: string;
    release_date: string;
    total_tracks: number;
    album_type: string;
}

interface SpotifyArtistAlbumsResponse {
    items: SpotifyAlbum[];
    total: number;
    limit: number;
    offset: number;
}
