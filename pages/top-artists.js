import { getSpotifyData, getUserInfo } from '../lib/spotifyFunctions';
import Head from 'next/head'
import styles from '../styles/Home.module.css'
import { useEffect } from 'react'
import { useRouter } from 'next/router'
import Button from '@mui/material/Button'
import Image from 'next/image'
import ResponsiveAppBar from './mui/ResponsiveAppBar';

export async function getServerSideProps(context) {
    // console.log(context.req);
    const url = context.req.url;
    let i = 0;
    while (url[i] && url[i] != '?') {
        ++i;
    }
    if (!url[i]) {
        return {
            redirect: {
                destination: '/',
                permanent: false
            }
        }
    }
    console.log('sliced: ', url.slice(i));
    const searchParams = new URLSearchParams(url.slice(i + 1));
    // let i = 0;
    // for (const [key, value] of searchParams) {
    //     console.log(`${i}th value: `, param[1]);
    //     ++i;
    // }
    const authToken = searchParams.get('token');
    console.log(authToken);
    if (authToken) {
        console.log('had authtoken');

        const type = "artists";
        const limit = 25;
        const time_range = "short_term";

        const artists = await getSpotifyData(authToken, type, time_range, limit);
        const userInfo = await getUserInfo(authToken);
        // console.log(artists);

        return {
            props: {
                token: authToken,
                artists: artists,
                userInfo: userInfo
            }
        }
    } else {
        return {
            redirect: {
                destination: '/',
                permanent: false
            }
        }
    }
}

const Artist = ({ info, idx }) => {
    const imgObject = info.images[1];
    return (
        <li key={info.name} className='artist'>
            <div style={{ fontWeight: 500 }}>{idx}.</div>
            <Image
                src={imgObject.url}
                height={imgObject.height}
                width={imgObject.width}
                className="images"
            />
            <div className='name'>{info.name}</div>
        </li >
    )
}

const ArtistsList = ({ artists }) => {
    let i = 0;
    return (
        <ol>
            {artists && artists.map((artist) => {
                ++i;
                return (
                    <Artist info={artist} idx={i} key={artist.name} />
                )
            })}
        </ol>
    )
}

export default function TopArtists({ token, artists, userInfo }) {
    const router = useRouter();
    useEffect(() => {
        router.replace('/top-artists', undefined, { shallow: true });
        /*
        GET TOP ARTISTS HERE INSTEAD


        */
    }, [])

    return (
        <div className={styles.container}>
            <Head>
                <title>Top Artists</title>
                <meta name="viewport" content="initial-scale=1, width=device-width" />
                <meta charSet='UTF-8' />
            </Head>
            <ResponsiveAppBar token={token} userInfo={userInfo} />
            <br />
            <main className={styles.main}>
                <div>
                    <ArtistsList artists={artists} />
                </div>
            </main>
        </div>
    )
}

/*
{
    "external_urls": {
        "spotify": "https://open.spotify.com/artist/6hhqsQZhtp9hfaZhSd0VSD"
    },
    "followers": {
        "href": null,
        "total": 543317
    },
    "genres": [
        "k-pop",
        "k-pop girl group"
    ],
    "href": "https://api.spotify.com/v1/artists/6hhqsQZhtp9hfaZhSd0VSD",
    "id": "6hhqsQZhtp9hfaZhSd0VSD",
    "images": [
        {
            "height": 640,
            "url": "https://i.scdn.co/image/ab6761610000e5eb688110f953532d9da57225eb",
            "width": 640
        },
        {
            "height": 320,
            "url": "https://i.scdn.co/image/ab67616100005174688110f953532d9da57225eb",
            "width": 320
        },
        {
            "height": 160,
            "url": "https://i.scdn.co/image/ab6761610000f178688110f953532d9da57225eb",
            "width": 160
        }
    ],
    "name": "WJSN",
    "popularity": 58,
    "type": "artist",
    "uri": "spotify:artist:6hhqsQZhtp9hfaZhSd0VSD"
}
*/