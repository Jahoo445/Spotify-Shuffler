exports.handler = async function (event) {
    if (event.httpMethod === 'GET') {

        const fetch = (await import('node-fetch')).default;

        const url = `https://accounts.spotify.com/api/token`;
        const headers = new Headers();
        headers.append("Authorization", "Basic " + Buffer.from(`${process.env.SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_CLIENT_SECRET}`).toString('base64'));

        const urlencoded = new URLSearchParams();
        urlencoded.append("grant_type", "client_credentials");

        const options = {
            method: 'POST',
            headers: headers,
            body: urlencoded,
        };

        try {
            const response = await fetch(url, options);
            const data = await response.json();

            return {
                statusCode: 200,
                body: JSON.stringify({ accessToken: data.access_token }),
            };
        } catch (error) {
            console.error("Error fetching Spotify token:", error);
            return {
                statusCode: 500,
                body: JSON.stringify({ error: "Failed to fetch token" }),
            };
        }
    }
};
