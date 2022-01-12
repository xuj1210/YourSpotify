import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
// import Authenticate from '../authentication'
import { useEffect } from 'react'
// import { useEffect } from 'react'

const clientID = process.env.NEXT_PUBLIC_CLIENT_ID;
const clientSecret = process.env.NEXT_PUBLIC_CLIENT_SECRET;

export async function getServerSideProps(context) {
  console.log(context.req.url);
  // if (typeof window !== "undefined") {
  let searchParams = new URLSearchParams(context.req.url);
  let authCode = searchParams.get('/?code');
  console.log(authCode);
  if (authCode) {
    console.log('had authcode');
    console.log(authCode);
    // if (window.history.replaceState) {
    //   window.history.replaceState(null, '', "/loggedin")
    // }
    console.log("useful: ", "http://" + context.req.headers.host + "/");
    const details = {
      code: authCode,
      redirect_uri: encodeURI("http://" + context.req.headers.host + "/"),
      grant_type: "authorization_code"
    }

    let formBody = [];
    for (const detail in details) {
      const encodedKey = encodeURIComponent(detail);
      const encodedValue = encodeURIComponent(details[detail]);
      formBody.push(encodedKey + "=" + encodedValue);
    }
    formBody = formBody.join("&");
    const items = await fetch("https://accounts.spotify.com/api/token", {
      method: "POST",
      body: formBody,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
        "Authorization": "Basic " + Buffer.from(clientID + ":" + clientSecret).toString("base64")
      },
    }).then(res => {
      if (!res.ok) {
        console.log("oopsy was made");
      }
      return res.json();
    }).then(data => {
      console.log("access token: " + data.access_token);
      const authToken = data.access_token;
      const limit = 25;
      const time_range = "short_term";
      return fetch(`https://api.spotify.com/v1/me/top/artists?limit=${limit}&time_range=${time_range}`, {
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
        // console.log(data);
        return data.items;
      })
    }).then(items => {
      return items;
    });
    // console.log("items: ", items);
    return {
      props: {
        items: items
      }
    }
  } else {
    console.log("Redirecting to Spotify login");
    const redirect_uri = 'http://localhost:3000/'
    const reqScope = "user-top-read"
    // let state = generateRandomString(16);
    const paramsObj = {
      response_type: 'code',
      client_id: clientID,
      scope: reqScope,
      redirect_uri: encodeURI(redirect_uri),
      // state: state
    };
    const searchParams = new URLSearchParams(paramsObj);
    const fullURI = 'https://accounts.spotify.com/authorize?' + searchParams.toString();
    // window.location.href = fullURI;
    return {
      redirect: {
        destination: fullURI,
        permanent: false
      }
    }
  }

}

export default function Home({ items }) {
  return (
    <div className={styles.container}>
      <Head>
        <title>YourSpotify</title>
        <meta name="description" content="See your listening habits" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <ol>
          {items && items.map((item) => {
            const imgObject = item.images[2];
            return (
              <li key={item.name}>
                {item.name}
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
        {/* <h1 className={styles.title}>
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
        <ul>{ }</ul> */}
      </main>

      <footer className={styles.footer}>
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
      </footer>
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