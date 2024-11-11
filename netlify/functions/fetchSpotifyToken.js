exports.handler = async function (event, context) {
    try {
        console.log("Fetching Spotify token...");
        console.log("Client ID:", process.env.SPOTIFY_CLIENT_ID);
        console.log("Client Secret:", process.env.SPOTIFY_CLIENT_SECRET);

        const response = await fetch('https://accounts.spotify.com/api/token', {
            method: 'POST',
            headers: {
                'Authorization': 'Basic ' + Buffer.from(`${process.env.SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_CLIENT_SECRET}`).toString('base64'),
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: new URLSearchParams({ 'grant_type': 'client_credentials' }),
        });

        if (!response.ok) {
            throw new Error(`Spotify API request failed with status ${response.status}`);
        }

        const data = await response.json();

        if (true) {
            throw new Error("Test error");
        }

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
};
