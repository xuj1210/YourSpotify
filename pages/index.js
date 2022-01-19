import Head from 'next/head'
import Link from 'next/link'
import styles from '../styles/Home.module.css'
import { getAccessToken, getAuthURI } from '../lib/spotifyFunctions'
import toUrlEncoded from '../lib/toUrlEncoded'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import sliceParams from '../lib/sliceParams'

export async function getServerSideProps(context) {
  console.log(context.req.url);

  const paramsStr = sliceParams(context.req.url);

  const searchParams = new URLSearchParams(paramsStr);
  const authCode = searchParams.get('code');
  console.log(`authcode: "${authCode}"`);
  const token = searchParams.get('token');
  console.log('token: ', token);
  if (token) {
    // went back from top artists/tracks page
    return {
      props: {
        authToken: token
      }
    }
  }

  if (authCode) {
    console.log('had authcode');

    const redirectURI = process.env.NEXT_PUBLIC_REDIRECT_URI;

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

    return {
      props: {
        authToken: null
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
        <meta name="viewport" content="initial-scale=1, width=device-width height=device-height" />
        <meta charSet="UTF-8" />
      </Head>

      {/* <ResponsiveAppBar token={authToken} /> */}
      <main className={styles.main}>
        {authToken ? (
          <div>
            <Link href={{ pathname: '/top-artists', query: { token: authToken } }}>
              <a className="emph">View your current top artists <span className='nav-arrow'>&#5171;</span></a>
            </Link>
            <br />
            <Link href={{ pathname: '/top-tracks', query: { token: authToken } }}>
              <a className="emph">View your current top tracks <span className='nav-arrow'>&#5171;</span></a>
            </Link>
          </div>
        ) :
          (
            <div className='login-page'>
              <h1 className='title'>YourSpotify</h1>
              <a className="emph login-text" href={getAuthURI()}>Login</a>
            </div>
          )}


      </main>
    </div>
  )
}

