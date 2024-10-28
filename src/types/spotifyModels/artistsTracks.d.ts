interface SpotifyArtist {
    external_urls: {
        spotify: string;
    };
    href: string;
    id: string;
    name: string;
    type: string;
    uri: string;
}

export interface SpotifyTrack {
    artists: SpotifyArtist[];
    available_markets: string[];
    disc_number: number;
    duration_ms: number;
    explicit: boolean;
    external_urls: {
        spotify: string;
    };
    href: string;
    id: string;
    name: string;
    preview_url: string | null;
    track_number: number;
    type: string;
    uri: string;
    is_local: boolean;
    album: SpotifyAlbum;
    images: Image[];
}
