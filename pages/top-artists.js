import { getSpotifyData } from '../lib/spotifyFunctions';
import Head from 'next/head'
import styles from '../styles/Home.module.css'
import { useEffect } from 'react'
import { useRouter } from 'next/router'
import Button from '@mui/material/Button'
import Image from 'next/image'

export async function getServerSideProps(context) {
    // console.log(context.req);
    const url = context.req.url;
    let i = 0;
    while (url[i] != '?') {
        ++i;
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
        // console.log(artists);

        return {
            props: {
                artists: artists
            }
        }
    } else {
        return {
            props: {
                artists: null
            }
        }
    }
}

const Artist = ({ info, idx }) => {
    const imgObject = info.images[2];
    return (
        <li key={info.name}>
            {`${idx}. ${info.name}`}
            <br />
            <Image
                src={imgObject.url}
                height={imgObject.height}
                width={imgObject.width}
            />
        </li>
    )
}

const ArtistsList = ({ artists }) => {
    let i = 0;
    return (
        <ol>
            {artists && artists.map((artist) => {
                ++i;
                return (
                    <Artist info={artist} idx={i} />
                )
            })}
        </ol>
    )
}

export default function TopArtists({ artists }) {
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
            <Button variant="text" className="top-left" onClick={() => router.back()}>Back to home</Button>
            <div>
                <ArtistsList artists={artists} />
            </div>
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