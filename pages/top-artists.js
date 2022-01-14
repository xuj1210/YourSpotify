import { getSpotifyData } from '../lib/spotifyFunctions';
import Image from 'next/image'
import Head from 'next/head'
import styles from '../styles/Home.module.css'
import { useEffect } from 'react'
import { useRouter } from 'next/router'

export async function getServerSideProps(context) {
    console.log(context.req);
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


export default function ArtistsList({ artists }) {
    const router = useRouter();
    useEffect(() => {
        router.replace('/top-artists', undefined, { shallow: true });
    }, [])

    return (
        <div className={styles.container}>
            <Head>
                <title>Songs</title>
            </Head>
            <div>
                <ol>
                    {artists && artists.map((artist) => {
                        const imgObject = artist.images[2];
                        return (
                            <li key={artist.name}>
                                {artist.name}
                                <br />
                                <Image
                                    src={imgObject.url}
                                    height={imgObject.height}
                                    width={imgObject.width}
                                />
                            </li>
                        )
                    })}
                </ol>
            </div>
        </div>
    )
}