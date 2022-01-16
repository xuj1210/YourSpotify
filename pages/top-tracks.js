import { getSpotifyData } from '../lib/spotifyFunctions';
import Head from 'next/head'
import styles from '../styles/Home.module.css'
import { useRouter } from 'next/router'
import { useEffect } from 'react';
import TracksList from './tracks-list';
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

        const type = "tracks";
        const limit = 25;
        const time_range = "short_term";

        const tracks = await getSpotifyData(authToken, type, time_range, limit);
        // const shortTerm = await getSpotifyData(authToken, type, "short_term", limit);
        // const mediumTerm = await getSpotifyData(authToken, type, "medium_term", limit);
        // const longTerm = await getSpotifyData(authToken, type, "long_term", limit);
        // console.log(tracks);

        return {
            props: {
                tracks: tracks
            }
        }
    } else {
        return {
            props: {
                tracks: null
            }
        }
    }
}

export default function TopTracks({ tracks }) {
    const router = useRouter();
    useEffect(() => {
        router.replace('/top-tracks', undefined, { shallow: true });
    }, [])

    return (
        <div className={styles.container}>
            <Head>
                <title>Top Tracks</title>
                <meta name="viewport" content="initial-scale=1, width=device-width" />
            </Head>
            <Button variant="text" className="top-left" onClick={() => router.back()}>Back to home</Button>
            <main className={styles.main}>
                <div>
                    <TracksList tracks={tracks} />
                </div>
            </main>
        </div>
    )
}

