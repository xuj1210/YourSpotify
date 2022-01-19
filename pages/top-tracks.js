import { getSpotifyData, getUserInfo } from '../lib/spotifyFunctions';
import Head from 'next/head'
import styles from '../styles/Home.module.css'
import { useRouter } from 'next/router'
import { useEffect } from 'react';
// import Button from '@mui/material/Button'
import Image from 'next/image'
import ResponsiveAppBar from './mui/ResponsiveAppBar';
// import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import sliceParams from '../lib/sliceParams';

export async function getServerSideProps(context) {
    // console.log(context.req);
    const url = context.req.url;

    if (!url) {
        return {
            redirect: {
                destination: '/',
                permanent: false
            }
        }
    }

    const paramsStr = sliceParams(url);
    if (paramsStr === "") {
        return {
            redirect: {
                destination: '/',
                permanent: false
            }
        }
    }
    const searchParams = new URLSearchParams(paramsStr);

    const authToken = searchParams.get('token');
    console.log(authToken);
    if (authToken) {
        console.log('had authtoken');

        const type = "tracks";
        const limit = 50;
        const time_range = "short_term";

        const tracks = await getSpotifyData(authToken, type, time_range, limit);
        // const shortTerm = await getSpotifyData(authToken, type, "short_term", limit);
        // const mediumTerm = await getSpotifyData(authToken, type, "medium_term", limit);
        // const longTerm = await getSpotifyData(authToken, type, "long_term", limit);
        // console.log(tracks);

        const userInfo = await getUserInfo(authToken);

        return {
            props: {
                token: authToken,
                tracks: tracks,
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

const Track = ({ info, idx }) => {
    const imgObject = info.album.images[2];
    return (
        <li key={info.name} className='track'>
            <span className='track-info-spacing ranking-idx'>{idx}</span>
            {/* <a target="_blank" href={info.external_urls.spotify}> */}
            <Image
                src={imgObject.url}
                height={imgObject.height}
                width={imgObject.width}
                className='track-image'
            />
            {/* </a> */}
            <span className='track-info-spacing track-name'>
                {info.name}
                <div className='artist-name'>{info.artists[0].name}</div>
            </span>
            {/* <button type="button">
                <PlayCircleOutlineIcon />
            </button> */}
        </li>
    )
}

const TracksList = ({ tracks }) => {
    let idx = 0;
    return (
        <div className="tracks-list">
            {tracks && tracks.map(track => {
                ++idx;
                return (<a href={track.uri} target="_blank">
                    <Track info={track} idx={idx} key={track.name} />
                </a>)
            })}
        </div>
    )
}

export default function TopTracks({ token, tracks, userInfo }) {
    const router = useRouter();
    useEffect(() => {
        router.replace('/top-tracks', undefined, { shallow: true });
    }, [])

    return (
        <div className={styles.container}>
            <Head>
                <title>Top Tracks</title>
                <meta name="viewport" content="initial-scale=1, width=device-width" />
                <meta charSet='UTF-8' />
            </Head>
            <ResponsiveAppBar token={token} userInfo={userInfo} />
            <br />
            <main className={styles.main}>
                <div>
                    <TracksList tracks={tracks} />
                </div>
            </main>
        </div>
    )
}

/* 
{
    album: {
      album_type: 'SINGLE',
      artists: [Array],
      available_markets: [Array],
      external_urls: [Object],
      href: 'https://api.spotify.com/v1/albums/1hwykI4yYe3FTcAhl1gadk',
      id: '1hwykI4yYe3FTcAhl1gadk',
      images: [Array],
      name: 'Catch the Stars',
      release_date: '2022-01-04',
      release_date_precision: 'day',
      total_tracks: 1,
      type: 'album',
      uri: 'spotify:album:1hwykI4yYe3FTcAhl1gadk'
    },
    artists: [ [Object] ],
    available_markets: [
      'AD', 'AE', 'AR', 'AT', 'AU', 'BE', 'BG', 'BH',
      'BO', 'BR', 'CA', 'CH', 'CL', 'CO', 'CR', 'CY',
      'CZ', 'DE', 'DK', 'DO', 'DZ', 'EC', 'EE', 'EG',
      'ES', 'FI', 'FR', 'GB', 'GR', 'GT', 'HK', 'HN',
      'HU', 'ID', 'IE', 'IL', 'IN', 'IS', 'IT', 'JO',
      'KW', 'LB', 'LI', 'LT', 'LU', 'LV', 'MA', 'MC',
      'MT', 'MX', 'MY', 'NI', 'NL', 'NO', 'NZ', 'OM',
      'PA', 'PE', 'PH', 'PL', 'PS', 'PT', 'PY', 'QA',
      'RO', 'SA', 'SE', 'SG', 'SK', 'SV', 'TH', 'TN',
      'TR', 'TW', 'US', 'UY', 'ZA'
    ],
    disc_number: 1,
    duration_ms: 200106,
    explicit: false,
    external_ids: { isrc: 'KRA382164531' },
    external_urls: {
      spotify: 'https://open.spotify.com/track/2yMIYu0O3TanoqmqpTcoEs'
    },
    href: 'https://api.spotify.com/v1/tracks/2yMIYu0O3TanoqmqpTcoEs',
    id: '2yMIYu0O3TanoqmqpTcoEs',
    is_local: false,
    name: 'Catch the Stars',
    popularity: 54,
    preview_url: 'https://p.scdn.co/mp3-preview/f6e9d5c2934f88caf9178ed1665983dc0dd81a2f?cid=c5b8c394e2934a82b5489b536dac28fb',
    track_number: 1,
    type: 'track',
    uri: 'spotify:track:2yMIYu0O3TanoqmqpTcoEs'
}
*/