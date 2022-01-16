import Head from 'next/head'
import Link from 'next/link'
import styles from '../styles/Home.module.css'
import { getAccessToken, getAuthURI } from '../lib/spotifyFunctions'
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
        <meta name="viewport" content="initial-scale=1, width=device-width" />
        <meta charSet="UTF-8" />
      </Head>
      <main className={styles.main}>
        {/* <ResponsiveAppBar code={authToken} /> */}
        <div>
          <Link href={{ pathname: '/top-artists', query: { token: authToken } }}>
            <a className="emph">View your current top artists <span className='nav-arrow'>&#5171;</span></a>
          </Link>
          <br />
          <Link href={{ pathname: '/top-tracks', query: { token: authToken } }}>
            <a className="emph">View your current top tracks <span className='nav-arrow'>&#5171;</span></a>
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