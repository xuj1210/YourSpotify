function getAuthURI() {
    const reqScope = "user-top-read"
    const redirectURI = process.env.NEXT_PUBLIC_REDIRECT_URI;
    // let state = generateRandomString(16);

    const paramsObj = {
        response_type: 'code',
        client_id: process.env.NEXT_PUBLIC_CLIENT_ID,
        scope: reqScope,
        redirect_uri: encodeURI(redirectURI),
        // state: state
    };

    const usp = new URLSearchParams(paramsObj);
    const fullURI = 'https://accounts.spotify.com/authorize?' + usp.toString();
    return fullURI;
}

async function getAccessToken(formBody) {
    const clientID = process.env.NEXT_PUBLIC_CLIENT_ID;
    const clientSecret = process.env.NEXT_PUBLIC_CLIENT_SECRET;
    const token = await fetch("https://accounts.spotify.com/api/token", {
        method: "POST",
        body: formBody,
        headers: {
            "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
            "Authorization": "Basic " + Buffer.from(clientID + ":" + clientSecret).toString("base64")
        },
    }).then(res => {
        return res.json();
    }).then(data => {
        console.log(`given scope: "${data.scope}`);
        return data.access_token;
    }).catch(err => {
        console.error('Error: ', err);
    });
    return token;
}

// const refreshToken = async (oldToken) => {
//     const clientID = process.env.NEXT_PUBLIC_CLIENT_ID;
//     const clientSecret = process.env.NEXT_PUBLIC_CLIENT_SECRET;

//     const body = {
//         grant_type: "refresh_token",
//         refresh_token: oldToken
//     }
//     const newToken = await fetch("https://accounts.spotify.com/api/token", {
//         method: "POST",
//         body: toUrlEncoded(body),
//         headers: {
//             "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
//             "Authorization": "Basic " + Buffer.from(clientID + ":" + clientSecret).toString("base64")
//         },
//     }).then(res => {
//         return res.json();
//     }).then(data => {
//         console.log(data);
//     })
//     return newToken;
// }

async function getSpotifyData(authToken, type, time_range, limit) {
    // const newToken = await refreshToken(authToken);
    // console.log('newToken: ', newToken);
    return fetch(`https://api.spotify.com/v1/me/top/${type}?limit=${limit}&time_range=${time_range}`, {
        headers: {
            "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
            "Authorization": "Bearer " + authToken,
        }
    }).then(res => {
        if (!res.ok) {
            console.log("something went wrong");
        }
        return res.json();
    }).then(data => {
        return data.items;
    })
}

async function getUserInfo(authToken) {
    return fetch(`https://api.spotify.com/v1/me`, {
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + authToken
        }
    }).then(res => {
        return res.json();
    }).then(data => {
        return data;
    }).catch(err => {
        console.error('user profile error: ', err);
    })
}

export { getAuthURI, getAccessToken, getSpotifyData, getUserInfo };