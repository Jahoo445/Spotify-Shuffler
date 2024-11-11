exports.handler = async function (event, context) {
    try {
        const response = await fetch('https://accounts.spotify.com/api/token', {
            method: 'POST',
            headers: {
                'Authorization': 'Basic ' + Buffer.from(`${process.env.SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_CLIENT_SECRET}`).toString('base64'),
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: new URLSearchParams({ 'grant_type': 'client_credentials' })
        });
        if (!response.ok) {
            throw new Error('Failed to fetch token');
        }
        const data = await response.json();
        return {
            statusCode: 200,
            body: JSON.stringify({ accessToken: data.access_token }),
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ error: error.message }),
        };
    }
}; 