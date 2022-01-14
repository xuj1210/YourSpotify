import Head from 'next/head'
// import Image from 'next/image'
import Link from 'next/link'
import styles from '../styles/Home.module.css'
// import { useEffect } from 'react'
import { getSpotifyData, getAccessToken, getAuthURI } from '../lib/spotifyFunctions'
import toUrlEncoded from '../lib/toUrlEncoded'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

export async function getServerSideProps(context) {
  // console.log(context.req.url);
  // if (typeof window !== "undefined") {
  const searchParams = new URLSearchParams(context.req.url);
  const authCode = searchParams.get('/?code');
  console.log(authCode);
  const redirectURI = "https://" + context.req.headers.host + "/";
  if (authCode) {
    console.log('had authcode');


    // clean up url

    const details = {
      code: authCode,
      redirect_uri: encodeURI(redirectURI),
      grant_type: "authorization_code"
    }

    const formBody = toUrlEncoded(details);
    const authToken = await getAccessToken(formBody);

    return {
      props: {
        authToken: authToken
      }
    }
  } else {
    console.log("Redirecting to Spotify login");

    const reqScope = "user-top-read"
    // let state = generateRandomString(16);

    const paramsObj = {
      response_type: 'code',
      client_id: process.env.NEXT_PUBLIC_CLIENT_ID,
      scope: reqScope,
      redirect_uri: encodeURI(redirectURI),
      // state: state
    };

    const fullURI = getAuthURI(paramsObj);

    return {
      redirect: {
        destination: fullURI,
        permanent: false
      }
    }
  }
}

export default function Home({ authToken }) {
  // console.log('token passed to main: ', authToken);

  const router = useRouter();

  // let authToken;

  useEffect(() => {
    // console.log('query: ', router.query.code);
    // const authCode = router.query.code;

    // const details = {
    //   code: authCode,
    //   redirect_uri: encodeURI(redirectURI),
    //   grant_type: "authorization_code"
    // }

    // const formBody = toUrlEncoded(details);
    // authToken = await getAccessToken(formBody);
    router.replace('', undefined, { shallow: true });
  }, []);
  return (
    <div className={styles.container}>
      <Head>
        <title>YourSpotify</title>
        <meta name="description" content="See your listening habits" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <div>
          <Link href={{ pathname: '/top-artists', query: { token: authToken } }}>
            <a>View your top artists</a>
          </Link>
          <br />
          <Link href={{ pathname: '/top-tracks', query: { token: authToken } }}>
            <a>View your top tracks</a>
          </Link>
        </div>

      </main>

      {/* <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer> */}
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

/* <h1 className={styles.title}>
          Welcome to <a href="https://nextjs.org">Next.js!</a>
        </h1>

        <p className={styles.description}>
          Get started by editing{' '}
          <code className={styles.code}>pages/index.js</code>
        </p>

        <div className={styles.grid}>
          <a href="https://nextjs.org/docs" className={styles.card}>
            <h2>Documentation &rarr;</h2>
            <p>Find in-depth information about Next.js features and API.</p>
          </a>

          <a href="https://nextjs.org/learn" className={styles.card}>
            <h2>Learn &rarr;</h2>
            <p>Learn about Next.js in an interactive course with quizzes!</p>
          </a>

          <a
            href="https://github.com/vercel/next.js/tree/master/examples"
            className={styles.card}
          >
            <h2>Examples &rarr;</h2>
            <p>Discover and deploy boilerplate example Next.js projects.</p>
          </a>

          <a
            href="https://vercel.com/new?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
            className={styles.card}
          >
            <h2>Deploy &rarr;</h2>
            <p>
              Instantly deploy your Next.js site to a public URL with Vercel.
            </p>
          </a>
        </div>
        <ul>{ }</ul> */