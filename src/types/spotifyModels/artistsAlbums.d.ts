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


interface SpotifyArtistAlbumsResponse {
    items: SpotifyAlbum[];
    total: number;
    limit: number;
    offset: number;
}

interface ExternalUrls {
    spotify: string;
}

interface Image {
    url: string;
    height: number;
    width: number;
}

interface Artist {
    external_urls: ExternalUrls;
    href: string;
    id: string;
    name: string;
    type: string;
    uri: string;
}

interface SpotifyAlbum {
    album_type: string;
    total_tracks: number;
    available_markets: string[];
    external_urls: ExternalUrls;
    href: string;
    id: string;
    images: Image[];
    name: string;
    release_date: string;
    release_date_precision: string;
    type: string;
    uri: string;
    artists: Artist[];
    album_group: string;
}

