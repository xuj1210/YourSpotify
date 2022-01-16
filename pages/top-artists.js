import { getSpotifyData } from '../lib/spotifyFunctions';
import Head from 'next/head'
import styles from '../styles/Home.module.css'
import { useEffect } from 'react'
import { useRouter } from 'next/router'
import ArtistsList from './artists-list';
import Button from '@mui/material/Button'

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

        // clean up url

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
            </Head>
            <Button variant="text" className="top-left" onClick={() => router.back()}>Back to home</Button>
            <div>
                <ArtistsList artists={artists} />
            </div>
        </div>
    )
}